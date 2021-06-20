import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import OverlayWindow from '../../../OverlayWindow';
import MediaStreamWithDnD from '../../../MediaStreamWithDnD';
import OverlayMessageBox from '../../../OverlayMessageBox';
import RoundedButton from '../../../RoundedButton';
import { DialogTitle, Typography } from '@material-ui/core';
import { Dialog, DialogActions } from '@material-ui/core';
import styled from "@material-ui/core/styles/styled"

const Divider = styled(Box)({
	height: '1px',
	backgroundColor: '#EBEBEB',
})
const License = (props) => {
	const handleClicked = () => {
		console.log('next Clicked', props.nextAction);
		props.nextAction();
	};
	const [detailsOpen, setDetailsOpen] = React.useState(false)

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
										onClick={() => setDetailsOpen(true)}
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
			<Box p={4} style={{ display: 'block', width: '100%', position: 'absolute', top: "20%", zIndex: 200, textAlign: "center", color: "white" }}>
				<Typography>Place our License disc within the frames and hold it there for a few second.</Typography>
			</Box>
			<Box></Box>

			<MediaStreamWithDnD />
			<Box style={{ postion: 'absolute', top: 0, left: 0 }}>
				<OverlayWindow windowSize={24} />
			</Box>
            <Box p={4} style={{ display: 'block', width: '100%', position: 'absolute', top: "64%", zIndex: 200, textAlign: "center", color: "white" }}>
				<Typography>Move Closer to the scan area.</Typography>
			</Box>
			<Dialog open={detailsOpen} size='md'>
				<DialogTitle>Details found !</DialogTitle>
				<Box p={1} m={2} textAlign='center'>
					<Typography variant="h6" >SCANIA</Typography>
					<Divider/>
					<Typography variant="body2" textAlign='center'>Make</Typography>
				</Box>
				<Box p={1} m={2} textAlign='center'>
					<Typography variant="h6" >Truck Tractor / Voorspanmotor</Typography>
					<Divider/>
					<Typography variant="body2" textAlign='center'>Model</Typography>
				</Box>
				<Box p={1} m={2} textAlign='center'>
					<Typography variant="h6" >CND64NC</Typography>
					<Divider/>
					<Typography variant="body2" textAlign='center'>License No</Typography>
				</Box>
				<Box p={1} m={2} textAlign='center'>
					<Typography variant="h6" >9BSR 6X40 0038 86738</Typography>
					<Divider/>
					<Typography variant="body2" textAlign='center'>Vin No</Typography>
				</Box>
				<DialogActions>
					<RoundedButton label="Retake" color="tertiary"></RoundedButton>
					<RoundedButton label="Confirm" onClick={handleClicked}></RoundedButton>
				</DialogActions>
			</Dialog>
		</React.Fragment>
	);
	// return <Backdrop open={true}></Backdrop>
};

export default License;
