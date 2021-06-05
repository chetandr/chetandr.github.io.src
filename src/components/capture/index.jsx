import * as CamerHelper from './cameraAccess';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDrag, useDragDropManager, useDrop } from 'react-dnd';

import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import SettingsOverscanIcon from '@material-ui/icons/SettingsOverscan';
import { getMedia } from './utils';
import { usePreview } from 'react-dnd-preview';

const ItemTypes = {
	BOUNDARY: 'boundry',
};

const Capture = () => {
	const debug = true;
	const allowedBBoxes = 2;
	const video = useRef();
	const container = useRef();
	const canvas = useRef();
	const downloadAnchor = useRef();
	const photo = useRef();
	const snap = useRef();
	const bboxWrapper0 = useRef();
	const bboxWrapper1 = useRef();
	const bboxWrapper2 = useRef();
	const bboxWrapper3 = useRef();
	const bboxWrapper4 = useRef();
	const bboxWrapper5 = useRef();
	const [bboxProperties, setBboxProperties] = useState();
	const [displayBox, setDisplayBox] = useState({
		disp0: false,
		disp1: false,
		disp2: false,
		disp3: false,
		disp4: false,
		disp5: false,
	});
	const [currentPosition, setCurrentPosition] = useState({ x: 0, y: 0 });
	const [dragInitPositionDiff, setDragInitPositionDiff] = useState({ x: 0, y: 0 });
	const [debugData, setDebugData] = useState([]);
	const dragDropManager = useDragDropManager();
	const monitor = dragDropManager.getMonitor();
	const [bboxCount, setBBoxCount] = useState(0);
	const [currentBBox, setCurrentBBox] = useState();
	const [mediaSettings, setMediaSettings] = useState({});
	const [{ isDragging0 }, bbox0] = useDrag(() => ({
		type: ItemTypes.BOUNDARY,
		collect: (monitor) => ({
			isDragging0: !!monitor.isDragging(),
		}),
	}));
	const [{ isDragging1 }, bbox1] = useDrag(() => ({
		type: ItemTypes.BOUNDARY,
		collect: (monitor) => ({
			isDragging1: !!monitor.isDragging(),
		}),
	}));
	const [{ isDragging2 }, bbox2] = useDrag(() => ({
		type: ItemTypes.BOUNDARY,
		collect: (monitor) => ({
			isDragging2: !!monitor.isDragging(),
		}),
	}));
	const [{ isDragging3 }, bbox3] = useDrag(() => ({
		type: ItemTypes.BOUNDARY,
		collect: (monitor) => ({
			isDragging3: !!monitor.isDragging(),
		}),
	}));
	const [{ isDragging4 }, bbox4] = useDrag(() => ({
		type: ItemTypes.BOUNDARY,
		collect: (monitor) => ({
			isDragging4: !!monitor.isDragging(),
		}),
	}));
	const [{ isDragging5 }, bbox5] = useDrag(() => ({
		type: ItemTypes.BOUNDARY,
		collect: (monitor) => ({
			isDragging5: !!monitor.isDragging(),
		}),
	}));

	const MyPreview = () => {
		const { display, style } = usePreview();
		if (!display) {
			return null;
		}
		return (
			<div className='boundingBoxWrapper1' style={style}>
				<div className='boundingBox'></div>
			</div>
		);
	};
	React.useEffect(() => {
		monitor.subscribeToOffsetChange(() => {
			const offset = monitor.getClientOffset();
			const initialClientOffset = monitor.getInitialClientOffset();
			const initialSourceClientOffset = monitor.getInitialSourceClientOffset();
			if (initialClientOffset && initialSourceClientOffset) {
				setDragInitPositionDiff({
					x: initialClientOffset.x - initialSourceClientOffset.x,
					y: initialClientOffset.y - initialSourceClientOffset.y,
				});
				setCurrentPosition(offset);
			}

			// do stuff like setState, though consider directly updating style through refs for performance
		});
	}, [monitor]);

	const [{ isOver }, drop] = useDrop(
		() => ({
			accept: ItemTypes.BOUNDARY,
			drop: () => moveBox(currentBBox, currentPosition, dragInitPositionDiff),
			collect: (monitor) => ({
				isOver: !!monitor.isOver(),
			}),
		}),
		[currentPosition, dragInitPositionDiff, currentBBox],
	);
	const moveBox = (cbbox, cp, diff) => {
		const x = cp.x - diff.x;
		const y = cp.y - diff.y;

		const rbox = cbbox.current.getClientRects();
		const x1 = x + rbox[0].width;
		const y1 = y + rbox[0].height;
		cbbox.current.style.left = `${x}px`;
		cbbox.current.style.top = `${y}px`;
		const newBboxProperties = {
			...bboxProperties,
			[cbbox.current.id]: [
				{ x, y },
				{ x: x1, y: y1 },
			],
		};
		setBboxProperties(newBboxProperties);
	};

	useEffect(async () => {
		const media = await getMedia();
		setMediaSettings(media.settings);
		if (video.current) {
			if ('srcObject' in video.current) {
				video.current.srcObject = media.stream;
			} else {
				video.src = window.URL.createObjectURL(media.stream);
			}
			video.current.style.display = 'none'
			video.current.width = media.settings.width;
			video.current.height = media.settings.height;
			canvas.current.width = media.settings.width;
			canvas.current.height = media.settings.height;
			// canvas.current.style.width = window.innerWidth;
			// canvas.current.style.height = window.innerHeight;
			const heightRatio = window.innerHeight / media.settings.height;
			const widthRatio = window.innerWidth / media.settings.width;
			const ctx = canvas.current.getContext('2d');
			ctx.scale(widthRatio, heightRatio);
		}
	}, [debug, video, canvas, downloadAnchor, container]);

	const addBBox = () => {
		const newDisplayBox = { ...displayBox, [`disp${bboxCount}`]: true };
		const newCount = bboxCount + 1;
		setBBoxCount(newCount);
		setDisplayBox(newDisplayBox);
	};
	const captureImage = () => {
		const url = canvas.current.toDataURL('image/png');
		// photo.current.setAttribute('src', url);
		downloadAnchor.current.href = url;
		downloadAnchor.current.download = 'MyPhoto.png';
		downloadAnchor.current.click();
		//
		window.URL.revokeObjectURL(url);
	};

	const getDebugData = () => {
		const components = [];
		for (let key in debugData) {
			components.push(
				<div className='debugRow'>
					<span className='debugLabel'>{key} : </span>
					<span className='debugValue'>{debugData[key]}</span>
				</div>,
			);
		}
		return components;
	};

	const metaDataLoadHandle = (e) => {
		console.log('loaded', video.current);
		const ctx = canvas.current.getContext('2d');
		setInterval(() => {
			ctx.drawImage(video.current, 0, 0, mediaSettings.width, mediaSettings.height);
		}, 30);
	};

	return (
		<div className='container' ref={container}>
			{debug && <div id='debug'>Debug {getDebugData()}</div>}
			<div className='container' ref={drop}>
				<canvas id='canvas' ref={canvas} />
				<div id='changeVideo'>
					<IconButton
						color='primary'
						aria-label='upload picture'
						component='span'
						variant='contained'
						ref={snap}
						onClick={captureImage}
					>
						<PhotoCamera style={{ fontSize: 100 }} />
					</IconButton>
				</div>
				<div id='additionalButtons'>
					<IconButton
						color='secondary'
						aria-label='upload picture'
						component='span'
						variant='contained'
						ref={snap}
						onClick={addBBox}
						disabled={bboxCount >= allowedBBoxes}
					>
						<SettingsOverscanIcon style={{ fontSize: 100 }} />
					</IconButton>
				</div>
				<div id='handlers'>
					<video
						ref={video}
						id='video'
						autoPlay
						muted
						playsInline
						onLoadedMetadata={metaDataLoadHandle}
						style={{ display: 'none' }}
					></video>

					<a id='downloadAnchor' href='http://chetandr.github.com' ref={downloadAnchor}>
						image
					</a>
					<img id='photo' ref={photo} src='/logo.svg' alt='Donwload placeholder' />
				</div>
				<div
					className='boundingBoxWrapper0'
					id='bbox0'
					ref={bboxWrapper0}
					onTouchStart={() => setCurrentBBox(bboxWrapper0)}
					onMouseDown={() => setCurrentBBox(bboxWrapper0)}
				>
					<div
						className='boundingBox'
						ref={bbox0}
						style={{
							opacity: isDragging0 ? 0 : 1,
							cursor: 'move',
							display: displayBox.disp0 ? 'inline-block' : 'none',
						}}
					></div>
				</div>
				<div
					className='boundingBoxWrapper1'
					id='bbox1'
					ref={bboxWrapper1}
					onTouchStart={() => setCurrentBBox(bboxWrapper1)}
					onMouseDown={() => setCurrentBBox(bboxWrapper1)}
				>
					<div
						className='boundingBox'
						ref={bbox1}
						style={{
							opacity: isDragging1 ? 0 : 1,
							cursor: 'move',
							display: displayBox.disp1 ? 'inline-block' : 'none',
						}}
					></div>
				</div>
				<div
					className='boundingBoxWrapper2'
					id='bbox2'
					ref={bboxWrapper2}
					onTouchStart={() => setCurrentBBox(bboxWrapper2)}
					onMouseDown={() => setCurrentBBox(bboxWrapper2)}
				>
					<div
						className='boundingBox'
						ref={bbox2}
						style={{
							opacity: isDragging2 ? 0 : 1,
							cursor: 'move',
							display: displayBox.disp2 ? 'inline-block' : 'none',
						}}
					></div>
				</div>
				<div
					className='boundingBoxWrapper3'
					id='bbox3'
					ref={bboxWrapper3}
					onTouchStart={() => setCurrentBBox(bboxWrapper3)}
					onMouseDown={() => setCurrentBBox(bboxWrapper3)}
				>
					<div
						className='boundingBox'
						ref={bbox3}
						style={{
							opacity: isDragging3 ? 0 : 1,
							cursor: 'move',
							display: displayBox.disp3 ? 'inline-block' : 'none',
						}}
					></div>
				</div>
				<div
					className='boundingBoxWrapper4'
					id='bbox4'
					ref={bboxWrapper4}
					onTouchStart={() => setCurrentBBox(bboxWrapper4)}
					onMouseDown={() => setCurrentBBox(bboxWrapper4)}
				>
					<div
						className='boundingBox'
						ref={bbox4}
						style={{
							opacity: isDragging4 ? 0 : 1,
							cursor: 'move',
							display: displayBox.disp4 ? 'inline-block' : 'none',
						}}
					></div>
				</div>
				<div
					className='boundingBoxWrapper5'
					id='bbox5'
					ref={bboxWrapper5}
					onTouchStart={() => setCurrentBBox(bboxWrapper5)}
					onMouseDown={() => setCurrentBBox(bboxWrapper5)}
				>
					<div
						className='boundingBox'
						ref={bbox5}
						style={{
							opacity: isDragging5 ? 0 : 1,
							cursor: 'move',
							display: displayBox.disp5 ? 'inline-block' : 'none',
						}}
					></div>
				</div>
			</div>
			<MyPreview />
		</div>
	);
};

export default Capture;
