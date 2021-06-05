import React, { useEffect, useState } from 'react';

import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import SettingsOverscanIcon from '@material-ui/icons/SettingsOverscan';

const getDebugData = (debugData) => {
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

const MediaStream = () => {
	const debug = true;
	const videoRef = React.useRef();
	const canvasRef = React.useRef();
	const downloadAnchor = React.useRef();
	const [mediaSettings, setMediaSettings] = React.useState({});
	const [debugData, setDebugData] = useState({});
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
				width: { exact: capabilities.width.max },
				height: { exact: capabilities.height.max },
			};
			await videoTrack.applyConstraints(constraints);
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
		console.log(media.settings);
		if (videoRef.current) {
			if ('srcObject' in videoRef.current) {
				videoRef.current.srcObject = media.stream;

				// ctx.scale(widthRatio, heightRatio);
			} else {
				videoRef.src = window.URL.createObjectURL(media.stream);
			}
			videoRef.current.width = media.settings.width;
			videoRef.current.height = media.settings.height;
			//window.visualViewport.height;//media.settings.height;//window.innerHeight;
		}
	}, [videoRef, canvasRef]);
	const metaDataLoadHandle = (e) => {
		console.log('loaded', mediaSettings);
		const ctx = canvasRef.current.getContext('2d');
		canvasRef.current.width = videoRef.current.videoWidth; //window.visualViewport.width; //media.settings.width;//window.innerWidth;
		canvasRef.current.height = videoRef.current.videoHeight;
		// setDebugData({
		// 	mw: mediaSettings.width,
		// 	mh: mediaSettings.height,
		// 	vw: videoRef.current.width,
		// 	vh: videoRef.current.height,
		// });
        alert(`${mediaSettings.width} x ${mediaSettings.height}`)
        alert(`${videoRef.current.width} x ${videoRef.current.height}`)
		// console.log(
		// 	'WIDTHHEIGHT',
		// 	mediaSettings.width,
		// 	mediaSettings.height,
		// 	videoRef.current.videoWidth,
		// 	videoRef.current.videoHeight,
		// );

		setInterval(() => {
			// if ( window. matchMedia("(orientation: portrait)")) {
			//     var vRatio = (canvasRef.current.height / videoRef.current.videoHeight) * videoRef.current.videoWidth;
			//     ctx.drawImage(videoRef.current, 0,0, vRatio, canvasRef.current.height);

			// } else {
			//      // fill horizontally
			//      var hRatio = (canvasRef.current.width / videoRef.current.videoWidth) * videoRef.current.videoHeight;
			//      ctx.drawImage(videoRef.current, 0,0, canvasRef.current.width, hRatio);
			// }
			ctx.drawImage(videoRef.current, 0, 0, mediaSettings.width, mediaSettings.height);
		}, 30);
	};

	const captureImage = () => {
		const url = canvasRef.current.toDataURL('image/png');
		// photo.current.setAttribute('src', url);
		downloadAnchor.current.href = url;
		downloadAnchor.current.download = 'MyPhoto.png';
		downloadAnchor.current.click();
		//
		window.URL.revokeObjectURL(url);
	};

	return (
		<div>
			{debug && <div id='debug'>{getDebugData(debugData)}</div>}
			<video
				ref={videoRef}
				autoPlay
				playsInline
				onLoadedMetadata={metaDataLoadHandle}
				style={{ display: 'none' }}
			></video>
			<canvas ref={canvasRef}></canvas>
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
