import React, { useCallback, useEffect } from 'react';
import { getMedia, getReso } from './helper';

import CircularProgress from '@material-ui/core/CircularProgress';
import DebugData from '../DebugData';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import SettingsOverscanIcon from '@material-ui/icons/SettingsOverscan';

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

	useEffect(async () => {
		const media = await getMedia();
		if (videoRef.current) {
			if ('srcObject' in videoRef.current) {
				videoRef.current.srcObject = media.stream;
			} else {
				videoRef.src = window.URL.createObjectURL(media.stream);
			}
			const video_width = 4096;//media.settings.width;
			const video_height = 2160;//media.settings.height;
			const to_width = 360;//window.innerWidth;
			const to_height = 189;//Math.floor((to_width * video_height) / video_width); //window.innerHeight;
			const ratio = media.settings.aspectRatio;
			const scaleRatioY = to_height / video_height;
			const scaleRatioX = to_width / video_width;
			let to_x = -Math.ceil(scaleRatioX * 100);
			let to_y =  -Math.ceil(scaleRatioY * 100);
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
				targetXY: `${to_x} x ${to_y}`,
			};
			setDebugData(newDebugData);
		}
	}, [videoRef, videoWrapper, canvasRef, imageCanvasRef]);

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
			<div ref={videoWrapper} style={{ marginBottom: '16px', position: 'absolute',  top:'0px', left:'0px'}}>
				<video
					ref={videoRef}
					id='camvideo'
					autoPlay
					playsInline
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
