import React, { useCallback, useEffect } from 'react';

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
	const debug = false;
	const videoRef = React.useRef();
	const canvasRef = React.useRef();
	const imageCanvasRef = React.useRef();

	const downloadAnchor = React.useRef();
	const [mediaSettings, setMediaSettings] = React.useState({});
	const [debugData, setDebugData] = React.useState({});

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
			console.log(capabilities, settings);
			const constraints = {
				width: { ideal: capabilities.width.max },
				height: { ideal: capabilities.height.max },
			};
			try {
				await videoTrack.applyConstraints(constraints);
			} catch (e) {
				alert(e);
			}
			const updatedSettings = videoTrack.getSettings();
			setMediaSettings(updatedSettings);
			return { stream, settings: updatedSettings };
			/* use the stream */
		} catch (err) {
			console.error(err);
			/* handle the error */
		}
	}

	useEffect(async () => {
		const media = await getMedia();
		if (videoRef.current) {
			if ('srcObject' in videoRef.current) {
				videoRef.current.srcObject = media.stream;

				// ctx.scale(widthRatio, heightRatio);
			} else {
				videoRef.src = window.URL.createObjectURL(media.stream);
			}
			// videoRef.current.width = media.settings.width;
			// videoRef.current.height = media.settings.height;
			
			canvasRef.current.width = window.innerWidth; //media.settings.width; //window.innerWidth;
			canvasRef.current.height = window.innerHeight; //media.settings.height; //window.innerHeight;
			canvasRef.current.style.width = `${window.innerWidth}px`;
			canvasRef.current.style.height = `${window.innerHeight}px`; //window.innerHeight;
			imageCanvasRef.current.width = window.innerWidth; //media.settings.width; //window.innerWidth;
			imageCanvasRef.current.height = window.innerHeight; //media.settings.height; //window.innerHeight;
			imageCanvasRef.current.style.width = `${window.innerWidth}px`;
			imageCanvasRef.current.style.height = `${window.innerHeight}px`;
			// const heightRatio = window.innerHeight / media.settings.height;
			// const widthRatio = window.innerWidth / media.settings.width;
			// const ctx = canvasRef.current.getContext('2d');
		}
	}, [videoRef, canvasRef, imageCanvasRef]);

	const paint = () => {
		requestAnimationFrame(paint);
		const ctx = canvasRef.current.getContext('2d');
		var video_width = mediaSettings.width;
		var video_height = mediaSettings.height;
		var ratio = video_width / video_height;
		var target_width;
		var target_height;
		var y_of_video = 0;
		var x_of_video = 0;
		if (video_width > video_height) {
			target_width = canvasRef.current.width;
			target_height = canvasRef.current.width / ratio;
			y_of_video = (canvasRef.current.height - target_height) / 2;
		} else {
			target_width = canvasRef.current.height;
			target_height = canvasRef.current.height * ratio;
			x_of_video = (canvasRef.current.width - target_width) / 2;
		}
		ctx.drawImage(videoRef.current, x_of_video, y_of_video, target_width, target_height);
	};
	const metaDataLoadHandle = (e) => {
		// alert(`${mediaSettings.width}x${mediaSettings.height}`);
		const newDebugData = {
			media: `${mediaSettings.width}x${mediaSettings.height}`,
			video: `${videoRef.current.videoWidth}x${videoRef.current.videoWidth}`,
			avail: `${window.availWidth}x${window.availHeight}`,
			window: `${window.innerWidth}x${window.innerHeight}`,
		};
		paint();
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
		var video_width = mediaSettings.width;
		var video_height = mediaSettings.height;
		var ratio = video_width / video_height;
		var target_width;
		var target_height;
		var y_of_video = 0;
		var x_of_video = 0;
		if (video_width > video_height) {
			target_width = canvasRef.current.width;
			target_height = canvasRef.current.width / ratio;
			y_of_video = (canvasRef.current.height - target_height) / 2;
		} else {
			target_width = canvasRef.current.height;
			target_height = canvasRef.current.height * ratio;
			x_of_video = (canvasRef.current.width - target_width) / 2;
		}
		ctx.drawImage(videoRef.current, x_of_video, y_of_video, target_width, target_height);
		const url = imageCanvasRef.current.toDataURL('image/png');
		// photo.current.setAttribute('src', url);
		downloadAnchor.current.href = url;
		downloadAnchor.current.download = 'MyPhoto.png';
		downloadAnchor.current.click();
		//
		window.URL.revokeObjectURL(url);
	};

	return (
		<div>
			{debug && (
				<div id='debug'>
					<DebugData debugData={debugData} />
				</div>
			)}
			<div style={{ marginBottom: '16px', display: 'none' }}>
				<video
					ref={videoRef}
					autoPlay
					playsInline
					onLoadedMetadata={metaDataLoadHandle}
					// style={{ display: 'none' }}
				></video>
			</div>
			<div>
				<canvas ref={canvasRef} style={{ border: 'solid 2px red' }}></canvas>
				<canvas ref={imageCanvasRef} style={{ border: 'solid 2px red' }}></canvas>
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
					<PhotoCamera style={{ fontSize: 100 }} />
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
