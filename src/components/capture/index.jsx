import * as CamerHelper from './cameraAccess';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDrag, useDragDropManager, useDrop } from 'react-dnd';

import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import SettingsOverscanIcon from '@material-ui/icons/SettingsOverscan';
import { usePreview } from 'react-dnd-preview';

const ItemTypes = {
	BOUNDARY: 'boundry',
};

const Capture = () => {
	const debug = true;
	const allowedBBoxes = 2;
	const video = useRef();
	const container = useRef();
	const fileInput = useRef();
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
	const [imageHeight, setImageHieght] = useState(0);
	const [imageWidth, setImageWidth] = useState(0);
	const [streamSettings, setStreamSettings] = useState(0);
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
	const { display, itemType, item, style } = usePreview();
	const MyPreview = () => {
		const { display, itemType, item, style } = usePreview();
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

	// const _onMouseMove = (e) => {
	// 	setCurrentPosition({ x: e.screenX, y: e.screenY });
	// };

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

	const getVideo = useCallback(
		async (device, devices) => {
			let cameraStream;
			let res = 0;
			let mediaStream;
			let newDebugData = {};

			// try {
			// 	res = -1;
			// 	mediaStream = await CamerHelper.CameraAccess.accessCameraStream(-1, device);
			// } catch {
			try {
				res = 0;
				cameraStream = await CamerHelper.CameraAccess.accessCameraStream(0, device);
				mediaStream = await cameraStream.mediaStreamPromise;
			} catch (e) {
				try {
					res = 1;
					cameraStream = await CamerHelper.CameraAccess.accessCameraStream(1, device);
					mediaStream = await cameraStream.mediaStreamPromise;
				} catch (e) {
					try {
						res = 2;
						cameraStream = await CamerHelper.CameraAccess.accessCameraStream(2, device);
						mediaStream = await cameraStream.mediaStreamPromise;
					} catch (e) {
						try {
							res = 3;
							cameraStream = await CamerHelper.CameraAccess.accessCameraStream(3, device);
							mediaStream = await cameraStream.mediaStreamPromise;
						} catch (e) {
							try {
								res = 4;
								cameraStream = await CamerHelper.CameraAccess.accessCameraStream(4, device);
								mediaStream = await cameraStream.mediaStreamPromise;
							} catch (e) {
								try {
									res = 5;
									cameraStream = await CamerHelper.CameraAccess.accessCameraStream(5, device);
									mediaStream = await cameraStream.mediaStreamPromise;
								} catch (e) {
									try {
										res = 6;
										cameraStream = await CamerHelper.CameraAccess.accessCameraStream(6, device);
										mediaStream = await cameraStream.mediaStreamPromise;
									} catch (e) {
										try {
											res = 7;
											cameraStream = await CamerHelper.CameraAccess.accessCameraStream(7, device);
											mediaStream = await cameraStream.mediaStreamPromise;
										} catch (e) {
											try {
												res = 8;
												cameraStream = await CamerHelper.CameraAccess.accessCameraStream(
													8,
													device,
												);
												mediaStream = await cameraStream.mediaStreamPromise;
											} catch (e) {
												console.log(e);
												newDebugData.error = JSON.stringify(e);
											}
										}
									}
								}
							}
						}
					}
				}
			}
			// }
			// const newCamera = await CamerHelper.CameraAccess.adjustCamerasFromMainCameraStream(mediaStream, devices)
			// console.log(newCamera);
			const isSafari = navigator.userAgent.indexOf('Safari') != -1;
			const reso = CamerHelper.CameraAccess.getUserMediaVideoParams(res, isSafari);

			// newDebugData.mediaParams = JSON.stringify(cameraStream.mediaParams);
			// newDebugData.mediaStream = JSON.stringify(mediaStream);

			const streamSettings = mediaStream.getVideoTracks()[0].getSettings();
			// const width = streamSettings.width;
			// const height = streamSettings.height;
			const width = window.innerWidth;
			const height = window.innerHeight;

			video.current.width = width;
			video.current.height = height;
			let captureSupport = false;
			if ('capture' in fileInput.current) {
				captureSupport = true;
			}
			// newDebugData.captureSupport = `${captureSupport}`;
			// newDebugData.stream = JSON.stringify(streamSettings);
			video.current.width = streamSettings.width;
			video.current.height = streamSettings.height;
			newDebugData.streamWidth = width;
			newDebugData.streamHeight = height;
			newDebugData.streamdpr = streamSettings.aspectRatio;
			newDebugData.innerWidth = window.innerWidth;
			newDebugData.innerHeight = window.innerHeight;
			newDebugData.wndowdpr = window.innerWidth / window.innerHeight;
			setStreamSettings(streamSettings);
			setImageHieght(height);
			setImageWidth(width);
			// canvas.current.width = `${width}px`;
			// canvas.current.height = `${height}px`;
			try {
				if ('srcObject' in video.current) {
					video.current.srcObject = mediaStream;
				} else {
					// Avoid using this in new browsers
					video.src = window.URL.createObjectURL(mediaStream);
				}
			} catch (e) {
				console.log(e);
				newDebugData.videoError = `${e}`;
			}
			setDebugData(newDebugData);
		},
		[video, canvas, downloadAnchor, photo, setImageHieght, setImageWidth],
	);

	const getCamera = useCallback(async () => {
		const enumDevices = await navigator.mediaDevices.getSupportedConstraints();

		if (container.current.requestFullscreen) {
			console.log('FULLSCREEN');
			try {
				const fullscreen = await container.current.requestFullscreen();
			} catch (e) {
				console.log(e);
			}
		}
		// const videoDevices = enumDevices.filter((device) => (device.kind === 'videoinput'))
		const devices = await CamerHelper.CameraAccess.getCameras();
		const debugData = {};
		devices.map((d, i) => (debugData[`Devices Info ${i}`] = JSON.stringify(d)));

		let backDevice = devices.filter((device) => device.cameraType === 'back');

		debugData['Has Back Camera'] = backDevice.length ? 'true' : 'false';
		debugData['Back Camera'] = JSON.stringify(backDevice[0]);
		debugData['Back Camera length'] = JSON.stringify(backDevice.length);
		const dpr = window.devicePixelRatio || 1;
		const width = window.outerWidth * dpr;
		const height = window.outerHeight * dpr;
		// video.current.width = width;
		// video.current.height = height;
		setDebugData(debugData);
		// debug.append(div);
		if (backDevice.length) {
			getVideo(backDevice[0], devices);
		} else {
			getVideo(devices[0], devices);
		}
	}, [getVideo]);

	useEffect(() => {
		getCamera();
	}, [debug, video, canvas, downloadAnchor, getCamera, getVideo, container]);
	const addBBox = () => {
		const newDisplayBox = { ...displayBox, [`disp${bboxCount}`]: true };
		const newCount = bboxCount + 1;
		setBBoxCount(newCount);
		setDisplayBox(newDisplayBox);
	};
	const captureImage = () => {
		console.log(streamSettings);
		const context = canvas.current.getContext('2d');
		const dpr =  streamSettings.aspectRatio || 1; // window.devicePixelRatio || 1;
		const width = window.innerWidth;
		let height = 0;
		let war = 1;
		if (window.matchMedia("(orientation: portrait)").matches) {
			height = width * streamSettings.aspectRatio;
			war = window.innerHeight / window.innerWidth
		} else {
			height = width / streamSettings.aspectRatio;
			war = window.innerWidth / window.innerHeight

		}
		const debugData = {};
		debugData.width = width;
		debugData.height = height;
		debugData.orientation = window.matchMedia("(orientation: portrait)").matches ? "Portrait" : "Landscape";
		debugData.aspectRatio = dpr;
		debugData.windowAspectRatio = war;

		setDebugData(debugData);


		// const height = streamSettings.height;
		// const width = window.innerWidth;
		// const height = window.innerHeight;
		let rect = canvas.current.getBoundingClientRect();
		console.log('RECT', rect);
		canvas.current.width = width * dpr;
		canvas.current.height = height * dpr;
		canvas.current.style.width = width + 'px';
		canvas.current.style.height = height + 'px';
		context.scale(dpr, dpr);
		context.drawImage(video.current, 0, 0, width, height);
		// context.transform(streamSettings.width, 0, 0, streamSettings.height, 0, 0);
		context.font = '20px Roboto';
		let cnt = 0;
		for (let key in bboxProperties) {
			const contentText = `${key} : ${JSON.stringify(bboxProperties[key])}`;
			context.strokeText(contentText, 10, 20 + 20 * cnt, 1000);
			cnt++;
		}
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
	return (
		<div className='container' ref={container}>
			{debug && <div id='debug'>Debug {getDebugData()}</div>}
			<div className='container' ref={drop}>
				<video ref={video} id='video' autoPlay muted playsInline></video>
				<input ref={fileInput} id='myFileInput' type='file' accept='image/*' capture='camera'></input>
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
					>
					</div>
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
