import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDrag, useDragDropManager, useDrop } from 'react-dnd';

import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import SettingsOverscanIcon from '@material-ui/icons/SettingsOverscan';

const ItemTypes = {
	BOUNDARY: 'boundry',
};

const Capture = () => {
	const debug = false;
	const allowedBBoxes = 2;
	const video = useRef();
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

	const [{ isDragging0 }, bbox0] = useDrag(() => ({
		type: ItemTypes.BOUNDARY,
		collect: (monitor) => ({
			isDragging: !!monitor.isDragging(),
		}),
	}));
	const [{ isDragging1 }, bbox1] = useDrag(() => ({
		type: ItemTypes.BOUNDARY,
		collect: (monitor) => ({
			isDragging: !!monitor.isDragging(),
		}),
	}));
	const [{ isDragging2 }, bbox2] = useDrag(() => ({
		type: ItemTypes.BOUNDARY,
		collect: (monitor) => ({
			isDragging: !!monitor.isDragging(),
		}),
	}));
	const [{ isDragging3 }, bbox3] = useDrag(() => ({
		type: ItemTypes.BOUNDARY,
		collect: (monitor) => ({
			isDragging: !!monitor.isDragging(),
		}),
	}));
	const [{ isDragging4 }, bbox4] = useDrag(() => ({
		type: ItemTypes.BOUNDARY,
		collect: (monitor) => ({
			isDragging: !!monitor.isDragging(),
		}),
	}));
	const [{ isDragging5 }, bbox5] = useDrag(() => ({
		type: ItemTypes.BOUNDARY,
		collect: (monitor) => ({
			isDragging: !!monitor.isDragging(),
		}),
	}));

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

	const _onMouseMove = (e) => {
		setCurrentPosition({ x: e.screenX, y: e.screenY });
	};

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
		// drag.current.left = `${currentPosition.x}px`;
		// drag.current.top = `${currentPosition.y}px`;
	};
	const getDragRef = (count) => {
		switch (count) {
			case 0:
				return bbox0;
				break;
			case 1:
				return bbox1;
				break;
			case 2:
				return bbox2;
				break;
			case 3:
				return bbox3;
				break;
			case 4:
				return bbox3;
				break;
			case 5:
				return bbox3;
				break;
		}
	};
	const getDragWrapperRef = (count) => {
		switch (count) {
			case 0:
				return bboxWrapper0;
				break;
			case 1:
				return bboxWrapper1;
				break;
			case 2:
				return bboxWrapper2;
				break;
			case 3:
				return bboxWrapper3;
				break;
			case 4:
				return bboxWrapper4;
				break;
			case 5:
				return bboxWrapper5;
				break;
		}
	};
	const getBoundingBox = (count) => {
		const retBoundingBox = (
			<div className='boundingBoxWrapper' ref={getDragWrapperRef[count]}>
				<div
					className='boundingBox'
					ref={getDragRef(count)}
					style={{
						opacity: isDragging0 ? 0.5 : 1,
						cursor: 'move',
					}}
				></div>
			</div>
		);
		return retBoundingBox;
	};
	const getVideo = useCallback(
		async (constraint) => {
			const mediaStream = await navigator.mediaDevices.getUserMedia(constraint);
			video.current.srcObject = mediaStream;
		},
		[video, canvas, downloadAnchor, photo],
	);

	const getCamera = useCallback(async () => {
		const devices = await navigator.mediaDevices.enumerateDevices();
		devices.map((device, index) => debugData[`Devices Info ${index}`] = device.label)
		const videoDevices = devices.filter(
			(device) => device.kind === 'videoinput',
		);
		// const debugData = { 'Devices Info': device };
		let backDevice = videoDevices.filter(
			(device) => device.label.indexOf('back') >= 0,
		);

		if(backDevice.length === 0 && videoDevices.length > 1) {
			backDevice = videoDevices[1];
		}
		
		debugData['Has Back Camera'] = backDevice.length ? 'true' : 'false';
		setDebugData(debugData);
		// debug.append(div);
		if (backDevice.length) {
			let constraint = {
				video: {
					width: {
						min: 1280,
						ideal: 1920,
						max: 2560,
					},
					height: {
						min: 720,
						ideal: 1080,
						max: 1440,
					},
					deviceId: backDevice[0].deviceId,
				},
			};
			getVideo(constraint);
		} else {
			let constraint = {
				video: {
					width: {
						min: 1280,
						ideal: 1920,
						max: 2560,
					},
					height: {
						min: 720,
						ideal: 1080,
						max: 1440,
					},
				},
			};
			getVideo(constraint);
		}
	}, [getVideo]);

	useEffect(() => {
		getCamera();
	}, [debug, video, canvas, downloadAnchor, photo, getCamera, getVideo]);
	const addBBox = () => {
		const newDisplayBox = { ...displayBox, [`disp${bboxCount}`]: true };
		const newCount = bboxCount + 1;
		setBBoxCount(newCount);
		setDisplayBox(newDisplayBox);
	};
	const captureImage = () => {
		const context = canvas.current.getContext('2d');
		canvas.current.width = window.innerWidth;
		canvas.current.height = window.innerHeight;
		context.drawImage(video.current, 0, 0, window.innerWidth, window.innerHeight);
		context.font = "20px Roboto";
		let cnt  = 0;
		for(let key in bboxProperties) {
			const contentText = `${key} : ${JSON.stringify(bboxProperties[key])}`;
			context.strokeText(contentText, 10, 20 + (20*cnt), 1000);
			cnt ++;
		}
		const url = canvas.current.toDataURL('image/png');
		photo.current.setAttribute('src', url);
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

	return (
		<>
			{debug && <div id='debug'>Debug {getDebugData()}</div>}
			<div className='container' ref={drop} onMouseMove={_onMouseMove}>
				<video ref={video} id='video' playsInline autoPlay></video>
				<div id='changeVideo'>
					<IconButton
						color='secondary'
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
						color='primary'
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
					<canvas id='canvas' ref={canvas}>
						{' '}
					</canvas>
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
				>
					<div
						className='boundingBox'
						ref={bbox0}
						style={{
							opacity: isDragging0 ? 1 : 1,
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
							opacity: isDragging1 ? 1 : 1,
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
					onMouseDown={() => setCurrentBBox(bboxWrapper1)}

				>
					<div
						className='boundingBox'
						ref={bbox2}
						style={{
							opacity: isDragging2 ? 1 : 1,
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
					onMouseDown={() => setCurrentBBox(bboxWrapper1)}

				>
					<div
						className='boundingBox'
						ref={bbox3}
						style={{
							opacity: isDragging3 ? 1 : 1,
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
					onMouseDown={() => setCurrentBBox(bboxWrapper1)}

				>
					<div
						className='boundingBox'
						ref={bbox4}
						style={{
							opacity: isDragging4 ? 1 : 1,
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
					onMouseDown={() => setCurrentBBox(bboxWrapper1)}

				>
					<div
						className='boundingBox'
						ref={bbox5}
						style={{
							opacity: isDragging5 ? 1 : 1,
							cursor: 'move',
							display: displayBox.disp5 ? 'inline-block' : 'none',
						}}
					></div>
				</div>
			</div>
		</>
	);
};

export default Capture;
