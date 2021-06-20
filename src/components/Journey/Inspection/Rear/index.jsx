import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import OverlayWindow from '../../../OverlayWindow';
import MediaStreamWithDnD from '../../../MediaStreamWithDnD';
import OverlayImage from '../../../OverlayImage';
import RoundedButton from '../../../RoundedButton';
import { Typography } from '@material-ui/core';
import PhotoCameraRounded from '@material-ui/icons/PhotoCameraRounded';
import CaptureIcon from '../../../CaptureIcon';
import CaptureButton from '../../../CaptureButton';
const License = (props) => {
	const handleClicked = () => {
		console.log('next Clicked', props.nextAction);
		props.nextAction();
	};

	return (
		<React.Fragment>
			<Box
				p={4}
				style={{
					display: 'block',
					width: '100%',
					position: 'absolute',
					top: '10px',
					zIndex: 200,
					textAlign: 'center',
					color: 'white',
				}}
			>
				<Typography>Position rear of the car within the outlines and take a photo.</Typography>
			</Box>

			<MediaStreamWithDnD />
			{/* <Box style={{ postion: 'absolute', top: 0, left: 0 }}>
				<OverlayWindow windowSize={24} />
			</Box> */}
			<CaptureButton onClick={handleClicked}/>
			<Box
				style={{
					display: 'block',
					width: '100%',
					position: 'absolute',
					top: '20%',
					zIndex: 200,
					textAlign: 'center',
					color: 'white',
				}}
			>
				<OverlayImage image='RearFull.png' width="50%"/>
			</Box>
		</React.Fragment>
	);
	// return <Backdrop open={true}></Backdrop>
};

export default License;
