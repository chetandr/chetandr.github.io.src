import React, { useCallback, useEffect } from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import SettingsOverscanIcon from '@material-ui/icons/SettingsOverscan';

const DebugData = (props) => {
	const components = [];
	if (props.debugData) {
		for (let key in props.debugData) {
			components.push(
				<div className='debugRow'>
					<span className='debugLabel'>{key} : </span>
					<span className='debugValue'>{props.debugData[key]}</span>
				</div>,
			);
		}
	}

	return components;
};

const MediaStream = () => {
	const debug = true;
	const videoRef = React.useRef();
	const videoWrapper = React.useRef();

	const canvasRef = React.useRef();
	const imageCanvasRef = React.useRef();

	const downloadAnchor = React.useRef();
	const [mediaSettings, setMediaSettings] = React.useState({});
	const [debugData, setDebugData] = React.useState({});
	const [capturing, setCapturing] = React.useState(false);
	async function getMedia() {
		let stream = null;

		try {
			try {
				stream = await navigator.mediaDevices.getUserMedia({
					audio: false,
					video: { facingMode: { exact: 'environment' } },
				});
			} catch (err) {
				stream = await navigator.mediaDevices.getUserMedia({
					audio: false,
					video: { facingMode: { exact: 'user' } },
				});
			}

			const videoTracks = await stream.getVideoTracks();
			const videoTrack = videoTracks[0];
			const capabilities = videoTracks[0].getCapabilities();
			const settings = videoTrack.getSettings();
			let reso = '';
			console.log(capabilities, settings);
			if (navigator.platform.indexOf('Mac') > -1) {
				try {
					// DCI 4K - iCam 12 MP
					reso = 'DCI 4K';
					const constraints = {
						width: { ideal: 4032 },
						height: { ideal: 3024 },
					};
					await videoTrack.applyConstraints(constraints);
				} catch (e) {
					try {
						// UHD - iCam 8 MP
						reso = 'DCI 4K';
						const constraints = {
							width: { ideal: 3840 },
							height: { ideal: 2160 },
						};
						await videoTrack.applyConstraints(constraints);
					} catch (e) {
						try {
							// UHD - iCam 8 MP
							reso = 'DCI 4K';
							const constraints = {
								width: { ideal: 3840 },
								height: { ideal: 2160 },
							};
							await videoTrack.applyConstraints(constraints);
						} catch (e) {
							try {
								// Full HD
								reso = 'Full HD';
								const constraints = {
									width: { ideal: 1920 },
									height: { ideal: 1080 },
								};
								await videoTrack.applyConstraints(constraints);
							} catch (e) {
								try {
									// HD
									reso = 'HD';

									const constraints = {
										width: { ideal: 1280 },
										height: { ideal: 720 },
									};
									await videoTrack.applyConstraints(constraints);
								} catch (e) {
									try {
										// HD
										reso = 'SD';
										const constraints = {
											width: { ideal: 640 },
											height: { ideal: 480 },
										};
										await videoTrack.applyConstraints(constraints);
									} catch (e) {
										alert(e);
									}
								}
							}
						}
					}
				}
			} else {
				try {
					// DCI 4K
					reso = 'DCI 4K';
					const constraints = {
						width: { ideal: 4096 },
						height: { ideal: 2160 },
					};
					await videoTrack.applyConstraints(constraints);
				} catch (e) {
					try {
						// UHD
						reso = 'UHD';
						const constraints = {
							width: { ideal: 3840 },
							height: { ideal: 2160 },
						};
						await videoTrack.applyConstraints(constraints);
					} catch (e) {
						try {
							// 2K
							reso = '2K';
							const constraints = {
								width: { ideal: 2048 },
								height: { ideal: 1152 },
							};
							await videoTrack.applyConstraints(constraints);
						} catch (e) {
							try {
								// Full HD
								reso = 'Full HD';
								const constraints = {
									width: { ideal: 1920 },
									height: { ideal: 1080 },
								};
								await videoTrack.applyConstraints(constraints);
							} catch (e) {
								try {
									// HD
									reso = 'HD';

									const constraints = {
										width: { ideal: 1280 },
										height: { ideal: 720 },
									};
									await videoTrack.applyConstraints(constraints);
								} catch (e) {
									try {
										// HD
										reso = 'SD';
										const constraints = {
											width: { ideal: 640 },
											height: { ideal: 480 },
										};
										await videoTrack.applyConstraints(constraints);
									} catch (e) {
										alert(e);
									}
								}
							}
						}
					}
				}
			}
			const updatedSettings = videoTrack.getSettings();
			updatedSettings.reso = reso;
			setMediaSettings(updatedSettings);
			return { stream, settings: updatedSettings, reso: reso };
			/* use the stream */
		} catch (err) {
			console.error(err);
			/* handle the error */
		}
	}
	const getReso = (width, height) => {
		switch (`${width}x${height}`) {
			case '4032x3024':
				return 'DCI 4K (iCAM 12MP)';
			case '3840x2160':
				return '4K (iCAM 12MP)';
			case '4096x2160':
				return 'DCI 4K';
			case '3840x2160':
				return '4K';
			case '2048x1152':
				return '2K';
			case '1920x1080':
				return 'Full HD';
			case '1280x720':
				return 'HD';
			case '640x480':
				return 'SD';
			default:
				switch (width) {
					case 4032:
						return 'DCI 4K';
					case 3840:
						return '4K';
					case 2048:
						return '2K';
					case 1920:
						return 'Full HD';
					case 1280:
						return 'HD';
					case 640:
						return 'HD';
					default:
						return 'Non SD';
				}
		}
	};
	useEffect(async () => {
		const media = await getMedia();
		if (videoRef.current) {
			if ('srcObject' in videoRef.current) {
				videoRef.current.srcObject = media.stream;

				// ctx.scale(widthRatio, heightRatio);
			} else {
				videoRef.src = window.URL.createObjectURL(media.stream);
			}

			// console.log
			const video_width = 4032; //media.settings.width;
			const video_height = 2160; //media.settings.height;
			const to_width = window.innerWidth;
			const to_height = Math.floor((to_width * video_height) / video_width); //window.innerHeight;
			const ratio = media.settings.aspectRatio;
			const scaleRatioY = to_height / video_height;
			const scaleRatioX = to_width / video_width;
			let to_x = 0;
			let to_y = 0;
			if (to_width > video_width) {
				to_x = -(to_width - video_width) / 2;
				to_y = to_x / (scaleRatioY * ratio);
			}
			console.log('videoWrapper', videoWrapper.current);
			videoWrapper.current.style.width = `${to_width}px`;
			videoWrapper.current.style.height = `${to_height}px`;
			videoRef.current.width = video_width;
			videoRef.current.height = video_height;
			videoRef.current.style.transform = `translate(${to_x}px, ${to_y}px) scale(${scaleRatioX}, ${scaleRatioY})`;
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
			};
			setDebugData(newDebugData);
			// canvasRef.current.width = video_width; //media.settings.width; //window.innerWidth;
			// canvasRef.current.height = video_height; //media.settings.height; //window.innerHeight;
			// // canvasRef.current.style.width = `${480 * media.settings.aspectRatio}px`;
			// // canvasRef.current.style.height = `${'480'}px`; //window.innerHeight;
			// // canvasRef.current.style.transform = `scale(${scaleRatioX}, ${scaleRatioY})`; //window.innerHeight;

			// const ctx = canvasRef.current.getContext('2d');
			// ctx.transform(scaleRatioX, 0, 0, scaleRatioY, 0, 0)
			// // ctx.scale(scaleRatioX, scaleRatioY);
			// const ctxi = imageCanvasRef.current.getContext('2d');
			// ctxi.transform(scaleRatioX, 0, 0, scaleRatioY, 0, 0);
			// // ctxi.scale(scaleRatioX, scaleRatioY);
			// const newDebugData = {
			// 	media: `${media.settings.width}x${media.settings.height}`,
			// 	video: `${media.settings.width}x${media.settings.height}`,
			// 	window: `${window.innerWidth}x${window.innerHeight}`,
			// 	target: `${to_width}x${to_height}`,
			// 	// coords: `${x_of_video}x${y_of_video}`,
			// 	scale: `${scaleRatioX}:${scaleRatioY}`,
			// };
			// setDebugData(newDebugData);

			// const heightRatio = window.innerHeight / media.settings.height;
			// const widthRatio = window.innerWidth / media.settings.width;
			// const ctx = canvasRef.current.getContext('2d');
		}
	}, [videoRef, videoWrapper, canvasRef, imageCanvasRef]);

	const paint = () => {
		// requestAnimationFrame(paint);
		// const ctx = canvasRef.current.getContext('2d');
		// // ctx.restore();
		// // const video_width = mediaSettings.width;
		// // const video_height = mediaSettings.height;
		// // const to_height = document.documentElement.clientHeight; //window.innerHeight;
		// // const to_wdth = to_height * mediaSettings.aspectRatio; //document.documentElement.clientWidth; //window.innerWidth;
		// // const ratio = mediaSettings.aspectRatio;
		// // const scaleRatioX = to_wdth / video_width;
		// // const scaleRatioY = to_height / video_height;
		// // let target_width;
		// // let target_height;
		// // let y_of_video = 0;
		// // let x_of_video = 0;
		// // if (video_width > video_height) {
		// // 	target_width = to_wdth;
		// // 	target_height = to_wdth / ratio;
		// // 	y_of_video = (video_height - target_height) / 2;
		// // 	x_of_video = (video_width - target_width) / 2;
		// // } else {
		// // 	target_width = to_height;
		// // 	target_height = to_height * ratio;
		// // 	x_of_video = (video_height - target_height) / 2;
		// // 	y_of_video = (video_width - target_width) / 2;
		// // }
		// // ctx.scale(scaleRatioX, scaleRatioY);
		// requestAnimationFrame(() => ctx.drawImage(videoRef.current, 0, 0));
		// const newDebugData = {
		// 	media: `${mediaSettings.width}x${mediaSettings.height}`,
		// 	video: `${mediaSettings.width}x${mediaSettings.height}`,
		// 	window: `${window.innerWidth}x${window.innerHeight}`,
		// 	target: `${to_wdth}x${to_height}`,
		// 	// coords: `${x_of_video}x${y_of_video}`,
		// 	scale: `${scaleRatioX}:${scaleRatioY}`,
		// };
		// setDebugData(newDebugData);
		// requestAnimationFrame(() => ctx.scale(scaleRatioX, scaleRatioY));
		// requestAnimationFrame(() => ctx.restore());
		// ctx.scale(scaleRatioX, scaleRatioY);
	};
	const metaDataLoadHandle = (e) => {
		// alert(`${mediaSettings.width}x${mediaSettings.height}`);
		// paint();
		// setDebugData(newDebugData);
		// setInterval(() => {
		// 	// console.log(videoRef.current.videoWidth, videoRef.current.videoWidth, window.innerWidth, window.innerHeight);
		// 	// requestAnimationFrame(() => ctx.drawImage(videoRef.current, x_of_video, y_of_video));
		// 	// ctx.drawImage(
		// 	// 	videoRef.current,
		// 	// 	0,
		// 	// 	0,
		// 	// 	videoRef.current.videoWidth,
		// 	// 	videoRef.current.videoWidth,
		// 	// 	0,
		// 	// 	0,
		// 	// 	window.innerWidth,
		// 	// 	window.innerHeight,
		// 	// );
		// }, 30);
		// ctx.drawImage(videoRef.current, 0, 0, mediaSettings.width, mediaSettings.height);
	};

	const captureImage = () => {
		const ctx = imageCanvasRef.current.getContext('2d');
		setCapturing(true);
		// ctx.scale(scaleRatioX, scaleRatioY);
		ctx.drawImage(videoRef.current, 0, 0);

		const url = imageCanvasRef.current.toDataURL('image/png');
		// photo.current.setAttribute('src', url);
		downloadAnchor.current.href = url;
		downloadAnchor.current.download = 'MyPhoto.png';
		downloadAnchor.current.click();
		//
		window.URL.revokeObjectURL(url);
		setTimeout(() => setCapturing(false), 3000);
	};

	return (
		<div>
			{debug && (
				<div id='debug'>
					<DebugData debugData={debugData} />
				</div>
			)}
			<div ref={videoWrapper} style={{ marginBottom: '16px' }}>
				<video
					ref={videoRef}
					autoPlay
					playsInline
					onLoadedMetadata={metaDataLoadHandle}
					// style={{ display: 'none' }}
				></video>
			</div>
			<div>
				<canvas ref={canvasRef} style={{ border: 'solid 2px red', display: 'none' }}></canvas>
				<canvas ref={imageCanvasRef} style={{ border: 'solid 2px red', display: 'none' }}></canvas>
			</div>
			<a id='downloadAnchor' href='http://chetandr.github.com' ref={downloadAnchor} style={{ display: 'none' }}>
				image
			</a>
			<div id='changeVideo'>
				<IconButton
					color='primary'
					aria-label='upload picture'
					component='span'
					variant='contained'
					// ref={snap}
					onClick={captureImage}
				>
					{capturing ? (
						<CircularProgress color='secondary' thinkness={7} size={100} />
					) : (
						<PhotoCamera style={{ fontSize: 100 }} />
					)}
				</IconButton>
			</div>
			{/* <div id='additionalButtons'>
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
			</div> */}
			<a id='downloadAnchor' href='http://chetandr.github.com' ref={downloadAnchor} style={{ display: 'none' }}>
				image
			</a>
		</div>
	);
};

export default MediaStream;
