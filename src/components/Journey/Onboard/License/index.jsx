import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import OverlayWindow from '../../../OverlayWindow';
import MediaStreamWithDnD from '../../../MediaStreamWithDnD';
import OverlayMessageBox from '../../../OverlayMessageBox';
import RoundedButton from '../../../RoundedButton';
import { Typography } from '@material-ui/core';
const License = (props) => {
	const handleClicked = () => {
		console.log('next Clicked', props.nextAction);
		props.nextAction();
	};

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
										onClick={handleClicked}
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
		</React.Fragment>
	);
	// return <Backdrop open={true}></Backdrop>
};

export default License;
