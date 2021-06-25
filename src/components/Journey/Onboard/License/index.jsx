import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import OverlayWindow from '../../../OverlayWindow';
import OverlayMessageBox from '../../../OverlayMessageBox';
import RoundedButton from '../../../RoundedButton';
import { DialogTitle, Typography } from '@material-ui/core';
import { Dialog, DialogActions } from '@material-ui/core';
import styled from '@material-ui/core/styles/styled';
import { BrowserMultiFormatReader, NotFoundException } from "@zxing/library";
import { useEffect } from 'react';
// import geoLocation from "../../../../utils/geoLocation";
const Divider = styled(Box)({
	height: '1px',
	backgroundColor: '#EBEBEB',
});
const License = (props) => {
	const [licenseData, setlicenseData] = React.useState([])
	const codeReader = new BrowserMultiFormatReader();
	const result = React.useRef();
	const video = React.useRef();
	const handleClicked = () => {
		console.log('next Clicked', props.nextAction);
		props.nextAction(licenseData);
	};
	const handleReset = () => {
		console.log("RESET")
		setlicenseData([]);
		codeReader.reset()
	}
	


	useEffect(async () => {
		const videoInputDevices = codeReader.listVideoInputDevices();

		console.log(`Started continous decode from camera with id ${videoInputDevices[0]}`)
		console.log(result.current);
		codeReader.decodeFromVideoDevice(videoInputDevices[0], video.current, (res, err) => {
			if (res) {
				// console.log()
				setlicenseData(res.text.split('%'))
				// result.current.textContent = res.text
				codeReader.stopStreams()
			}
			if (err && !(err instanceof NotFoundException)) {
				console.error(err)
				// result.current.textContent = err
			}
		})


	}, [])

	return (
		<React.Fragment>

			<Box p={2} style={{ display: 'block', width: '100%', position: 'absolute' }}>
				<OverlayMessageBox>
					<Box p={2}>
						<Box p={1}>
							<Typography variant='body1'>Generate Vehicle Details</Typography>
						</Box>
						<Grid container>
							<Grid item xs={1}></Grid>
							<Grid item xs={4}>
								<Box>
									<RoundedButton
										color='secondary'
										size='small'
										fullWidth={false}
										label='License Disc'
										// onClick={() => setDetailsOpen(true)}
									/>
								</Box>
							</Grid>
							<Grid item xs={1}></Grid>

							<Grid item xs={4}>
								<Box>
									<RoundedButton
										color='secondary'
										size='small'
										fullWidth={false}
										label='Vin Number'
										variant='text'
									/>
								</Box>
							</Grid>
							<Grid item xs={1}></Grid>
						</Grid>
					</Box>
				</OverlayMessageBox>
			</Box>
			<Box
				p={4}
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
				<Typography>Place our License disc within the frames and hold it there for a few second.</Typography>
			</Box>
			<Box>
				<div>
					<video id="video" width="300" height="200" ref={video}></video>
				</div>
			</Box>

			<Box style={{ top: 0, left: 0 }}>
				<OverlayWindow windowSize={24} />
			</Box>
			<Box
				p={4}
				style={{
					display: 'block',
					width: '100%',
					position: 'absolute',
					top: '64%',
					zIndex: 200,
					textAlign: 'center',
					color: 'white',
				}}
			>
				<Typography>Move Closer to the scan area.</Typography>
			</Box>
			<Dialog open={licenseData.length > 0} size='md'>
				<DialogTitle disableTypography='false'>
					<Typography variant='h4' style={{ textAlign: 'center' }}>
						Details found !
					</Typography>
				</DialogTitle>
				<Box p={1} m={2} textAlign='center'>
					<Typography variant='h6'>{licenseData[9]}</Typography>
					<Divider />
					<Typography variant='body2' textAlign='center'>
						Make
					</Typography>
				</Box>
				<Box p={1} m={2} textAlign='center'>
					<Typography variant='h6'>{licenseData[8]}</Typography>
					<Divider />
					<Typography variant='body2' textAlign='center'>
						Model
					</Typography>
				</Box>
				<Box p={1} m={2} textAlign='center'>
					<Typography variant='h6'>{licenseData[6]}</Typography>
					<Divider />
					<Typography variant='body2' textAlign='center'>
						License No
					</Typography>
				</Box>
				<Box p={1} m={2} textAlign='center'>
					<Typography variant='h6'>{licenseData[12]}</Typography>
					<Divider />
					<Typography variant='body2' textAlign='center'>
						Vin No
					</Typography>
				</Box>
				<DialogActions>
					<RoundedButton label='Retake' color='tertiary' onClick={handleReset}></RoundedButton>
					<RoundedButton label='Confirm' onClick={handleClicked}></RoundedButton>
				</DialogActions>
			</Dialog>
		</React.Fragment>
	);
	// return <Backdrop open={true}></Backdrop>
};

export default License;
