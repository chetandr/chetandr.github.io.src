import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Logo from '../../../Logos';
import Typography from '@material-ui/core/Typography';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import RoundedButton from '../../../RoundedButton';
import Car from '../../../Car';
import Checkbox from '@material-ui/core/Checkbox';
import SwipeButton from 'react-swipezor';
import ReactSwipeButton from 'react-swipe-button';
import CompanySettings$ from '../../../../APIConfig/CompanySettings';
import { useEffect } from 'react';

const Login = (props) => {
	const [checked, setChecked] = React.useState(false);
	const [companyData, setCompnayData] = React.useState(null);
	const [openTermsAndConditions, setOpenTermsAndConditions] = React.useState(false);
	const handleChange = () => {
		setChecked(!checked);
	};

	// Load Company Details
	useEffect(() => {
		try {
			// CompanySettings$(9994).subscribe((response) => setCompnayData(response.data));
		} catch (e) {
			console.log(e);
		}
	}, []);

	const handleClicked = () => {
		console.log('next Clicked', props.nextAction);
		props.nextAction();
	};
	console.log('PROPS', props.nextAction);
	return (
		<React.Fragment>
			{companyData !== null && <Logo imageURL={companyData?.logo} />}

			<Box pt={2} px={4}>
				<Typography style={{ textAlign: 'center' }}>
					Welcome to The Unlimited. Let us begin assessing your vehicle from the comfort of your home.
				</Typography>
			</Box>
			<Box pt={2} px={4}>
				<TextField
					id='standard-full-width'
					placeholder='Enter Your Contact Number'
					fullWidth
					margin='normal'
					variant='outlined'
					InputProps={{
						style: { borderRadius: '28px' },
					}}
				/>
			</Box>
			<Box pt={4} px={4}>
				<ReactSwipeButton text='Swipe to Login' color='#EDA03A' onSuccess={handleClicked} />
			</Box>
			<Box p={8}>
				<Car />
			</Box>
			<Box pt={4} style={{ position: 'absolute', bottom: '10px' }}>
				<FormGroup>
					<FormLabel>
						<Checkbox
							color='primary'
							checked={checked}
							onChange={handleChange}
							name='Agreed'
							style={{ float: 'left' }}
						/>
						<Typography variant='caption'>
							I have read, understood and agreed with your{' '}
							<Typography
								color='primary'
								style={{ cursor: 'pointer', display: 'inline-block' }}
								onClick={() => setOpenTermsAndConditions(true)}
							>
								{' '}
								Terms and Conditions
							</Typography>
						</Typography>
					</FormLabel>
				</FormGroup>
			</Box>
			{/* {companyData !== null && ( */}
			<Dialog open={openTermsAndConditions} maxWidth='lg' style={{ width: '80vw', height: '80vw' }}>
				<DialogTitle>Terms and Conditions</DialogTitle>
				<DialogContent>
					<iframe
						src={'https://usabilla.com/terms/'}
						style={{ width: '60vw', height: '60vw', border: 'none' }}
					></iframe>
				</DialogContent>
				<DialogActions>
					<Button variant='contained' color='primary' onClick={() => setOpenTermsAndConditions(false)}>
						Close
					</Button>
				</DialogActions>
			</Dialog>
			{/* )} */}
		</React.Fragment>
	);
};

Login.defaultProps = {
	nextAction: () => {},
	prevAction: () => {},
};
export default Login;
