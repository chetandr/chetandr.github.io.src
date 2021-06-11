import React, { useCallback, useEffect } from 'react';
import { getMedia, getReso } from './helper';
import { useDrag, useDragDropManager, useDrop } from 'react-dnd';

import ArrowForwardRounded from '@material-ui/icons/ArrowForwardRounded';
import CircularProgress from '@material-ui/core/CircularProgress';
import DebugData from '../DebugData';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { usePreview } from 'react-dnd-preview';

const ItemTypes = {
	BOUNDARY: 'boundry',
};

const MediaStream = () => {
	const debug = false;
	const videoRef = React.useRef();
	const videoWrapper = React.useRef();
	const container = React.useRef();

	const imageRef = React.useRef();
	const bboxWrapper = React.useRef();
	const canvasRef = React.useRef();
	const imageCanvasRef = React.useRef();
	const [currentBBox, setCurrentBBox] = React.useState();
	const downloadAnchor = React.useRef();
	const [mediaSettings, setMediaSettings] = React.useState({});
	const [debugData, setDebugData] = React.useState({});
	const [capturing, setCapturing] = React.useState(false);
	const [bboxProperties, setBboxProperties] = React.useState();
	const [stage, setStage] = React.useState('INIT');
	const dragDropManager = useDragDropManager();
	const monitor = dragDropManager.getMonitor();
	const imageBboxRef = React.useRef();
	const [currentPosition, setCurrentPosition] = React.useState({ x: 0, y: 0 });
	const [dragInitPositionDiff, setDragInitPositionDiff] = React.useState({ x: 0, y: 0 });
	const [{ isDragging }, bbox] = useDrag(() => ({
		type: ItemTypes.BOUNDARY,
		collect: (monitor) => ({
			isDragging: !!monitor.isDragging(),
		}),
	}));
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
		console.log(cbbox, cp, diff);
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
	const MyPreview = () => {
		const { display, itemType, item, style } = usePreview();
		if (!display) {
			return null;
		}
		return (
			<div className='boundingBoxWrapper' style={style}>
				<div className='boundingBox'></div>
			</div>
		);
	};
	const renderMedia = React.useCallback(async () => {
		const media = await getMedia();
		if (videoRef.current) {
			if ('srcObject' in videoRef.current) {
				videoRef.current.srcObject = media.stream;
			} else {
				videoRef.src = window.URL.createObjectURL(media.stream);
			}
			setMediaSettings(media.settings);
			const video_width = media.settings.width;
			const video_height = media.settings.height;
			const to_width = videoWrapper.current.offsetWidth; //document.documentElement.clientWidth; //window.innerWidth;
			const to_height = Math.floor((to_width * video_height) / video_width); //window.innerHeight;
			const ratio = media.settings.aspectRatio;
			const scaleRatioY = to_height / video_height;
			const scaleRatioX = to_width / video_width;
			let to_x = 0;
			let to_y = 0;
			if (video_width > to_width) {
				to_x = -Math.ceil(scaleRatioX * 100);
				to_y = -Math.ceil(scaleRatioY * 100);
			} else {
				to_x = -Math.ceil((video_width / to_width) * 100);
				to_y = -Math.ceil((video_height / to_height) * 100);
			}

			// if (to_width > video_width) {
			// 	to_x = (video_width - to_width) * scaleRatioX;
			// 	// to_y = to_x / (scaleRatioY * ratio);
			// } else {
			// 	to_x = (to_width - video_width) * (video_width/(to_width * 100));
			// 	to_y = (to_height - video_height) * (video_height/(to_height * 100));

			// }
			// if (to_width < video_width) {
			// 	to_x = (to_width - video_width) / 2;
			// 	to_y = to_x / (scaleRatioY * ratio);
			// }
			// videoWrapper.current.style.width = `${to_width}px`;
			// videoWrapper.current.style.height = `${to_height}px`;
			videoRef.current.width = video_width;
			videoRef.current.height = video_height;
			imageRef.current.width = video_width;
			imageRef.current.height = video_height;

			videoRef.current.style.transform = `translate(${-videoRef.current.offsetLeft}px, ${-videoRef.current
				.offsetTop}px) scale(${scaleRatioX}, ${scaleRatioY})`;
			videoRef.current.style.transformOrigin = 'top left';
			imageCanvasRef.current.width = video_width; //media.settings.width; //window.innerWidth;
			imageCanvasRef.current.height = video_height; //media.settings.height; //window.innerHeight;
			imageCanvasRef.current.style.width = `${to_width}px`;
			imageCanvasRef.current.style.height = `${to_height}px`;
			const newDebugData = {
				video: `${video_width} x ${video_height} (${getReso(video_width, video_height)})`,
				scale: `${scaleRatioX} x ${scaleRatioY}`,
				media: `${media.settings.width} x ${media.settings.height}`,
				target: `${to_width} x ${to_height}`,
				targetXY: `${to_x} x ${to_y}`,
			};
			setDebugData(newDebugData);
		}
	}, [videoRef, videoWrapper, canvasRef, imageCanvasRef]);
	window.addEventListener('orientationchange', function (event) {
		renderMedia();
	});
	useEffect(async () => {
		renderMedia();
	}, [videoRef, videoWrapper, canvasRef, imageCanvasRef]);

	const captureImage = () => {
		const video_width = mediaSettings.width;
		const video_height = mediaSettings.height;
		const to_width = videoWrapper.current.offsetWidth; //document.documentElement.clientWidth; //window.innerWidth;
		const to_height = Math.floor((to_width * video_height) / video_width); //window.innerHeight;
		// const ratio = media.settings.aspectRatio;
		const scaleRatioY = to_height / video_height;
		const scaleRatioX = to_width / video_width;
		const ctx = imageCanvasRef.current.getContext('2d');
		setCapturing(true);
		videoRef.current.pause();
		// videoRef.current.currentTime = 0;
		// ctx.scale(scaleRatioX, scaleRatioY);
		ctx.drawImage(videoRef.current, 0, 0);

		const url = imageCanvasRef.current.toDataURL('image/png');
		imageRef.current.src = url;
		videoRef.current.style.display = 'none';
		imageRef.current.style.display = 'block';
		imageRef.current.style.transform = `translate(${-videoRef.current.offsetLeft}px, ${-videoRef.current
			.offsetTop}px) scale(${scaleRatioX}, ${scaleRatioY})`;
		imageRef.current.style.transformOrigin = 'top left';
		videoRef.current.style.display = 'none';
		imageRef.current.style.display = 'block';
		// photo.current.setAttribute('src', url);
		// downloadAnchor.current.href = url;
		// downloadAnchor.current.download = 'MyPhoto.png';
		// downloadAnchor.current.click();
		// //
		// window.URL.revokeObjectURL(url);
		setTimeout(() => setCapturing(false), 3000);
		setStage('BBOX');
	};

	const captureBox = () => {
		const video_width = mediaSettings.width;
		const video_height = mediaSettings.height;
		const to_width = videoWrapper.current.offsetWidth; //document.documentElement.clientWidth; //window.innerWidth;
		const to_height = Math.floor((to_width * video_height) / video_width); //window.innerHeight;
		// const ratio = media.settings.aspectRatio;
		const scaleRatioY = to_height / video_height;
		const scaleRatioX = to_width / video_width;
		const ctx = imageCanvasRef.current.getContext('2d');
		ctx.lineWidth = '2';
	
		ctx.globalAlpha = 0.2;
		ctx.fillStyle = '#FFD600';

		ctx.fillRect(
			bboxWrapper.current.offsetLeft / scaleRatioX,
			bboxWrapper.current.offsetTop / scaleRatioY,
			bboxWrapper.current.offsetWidth / scaleRatioX,
			bboxWrapper.current.offsetHeight / scaleRatioY,
		);
		ctx.globalAlpha = 0.2;
		ctx.strokeStyle = '#ff7300';
		ctx.stroke();
		setCapturing(true);
		// videoRef.current.pause();
		// videoRef.current.currentTime = 0;
		// // ctx.scale(scaleRatioX, scaleRatioY);
		// ctx.drawImage(videoRef.current, 0, 0);

		const url = imageCanvasRef.current.toDataURL('image/png');
		imageBboxRef.current.src = url;
		videoRef.current.style.display = 'none';
		imageBboxRef.current.style.display = 'block';
		imageRef.current.style.display = 'none';
		// imageRef.current.style.transform = `translate(${-videoRef.current.offsetLeft}px, ${-videoRef.current
		// .offsetTop}px) scale(${scaleRatioX}, ${scaleRatioY})`;
		imageBboxRef.current.style.transformOrigin = 'top left';
		videoRef.current.style.display = 'none';
		imageBboxRef.current.style.display = 'block';
		// photo.current.setAttribute('src', url);
		// downloadAnchor.current.href = url;
		// downloadAnchor.current.download = 'MyPhoto.png';
		// downloadAnchor.current.click();
		// //
		// window.URL.revokeObjectURL(url);
		setTimeout(() => setCapturing(false), 3000);
		setStage('CAPTURED');
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

	console.log('DRAGGING', isDragging);
	return (
		<div ref={drop}>
			{debug && (
				<div id='debug'>
					<DebugData debugData={debugData} />
				</div>
			)}
			<div ref={videoWrapper} className='videoWrapper'>
				{/* <div ref={videoWrapper}> */}
				<video
					ref={videoRef}
					id='camvideo'
					autoPlay
					playsInline
					// onLoadedMetadata={metaDataLoadHandle}
					// style={{ display: 'none' }}
					// className="videosize"
				></video>
				<img ref={imageRef} style={{ border: 'solid 2px red', display: 'none' }}></img>
				<img ref={imageBboxRef} style={{ border: 'solid 2px red', display: 'none' }}></img>
			</div>

			<div>
				<canvas ref={canvasRef} style={{ border: 'solid 2px red', display: 'none' }}></canvas>
				<canvas ref={imageCanvasRef} style={{ border: 'solid 2px red', display: 'none' }}></canvas>
			</div>
			<a id='downloadAnchor' href='http://chetandr.github.com' ref={downloadAnchor} style={{ display: 'none' }}>
				image
			</a>
			{stage === 'BBOX' && (
				<div
					className='boundingBoxWrapper'
					id='bbox'
					ref={bboxWrapper}
					onTouchStart={() => setCurrentBBox(bboxWrapper)}
					onMouseDown={() => setCurrentBBox(bboxWrapper)}
					style={{ opacity: isDragging ? 0 : 1 }}
				>
					<div
						className='boundingBox'
						ref={bbox}
						style={{
							cursor: 'move',
							display: 'inline-block',
						}}
					></div>
				</div>
			)}
			<div id='changeVideo'>
				{stage === 'INIT' && (
					<IconButton
						color='primary'
						aria-label='upload picture'
						component='span'
						variant='contained'
						// ref={snap}
						onClick={captureImage}
					>
						<PhotoCamera style={{ fontSize: 64 }} />
					</IconButton>
				)}
				{stage === 'BBOX' && (
					<IconButton
						color='primary'
						aria-label='upload picture'
						component='span'
						variant='contained'
						// ref={snap}
						onClick={captureBox}
					>
						<ArrowForwardRounded style={{ fontSize: 64 }} />
					</IconButton>
				)}
			</div>

			<a id='downloadAnchor' href='http://chetandr.github.com' ref={downloadAnchor} style={{ display: 'none' }}>
				image
			</a>
			<MyPreview />
		</div>
	);
};

export default MediaStream;
