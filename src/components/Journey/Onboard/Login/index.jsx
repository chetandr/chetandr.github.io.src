import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
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

const Login = (props) => {
	const [checked, setChecked] = React.useState(false);
	const [openTermsAndConditions, setOpenTermsAndConditions] = React.useState(false);
	const handleChange = () => {
		setChecked(!checked);
	};

	const handleClicked = () => {
		console.log('next Clicked', props.nextAction);
		props.nextAction();
	};
	console.log('PROPS', props.nextAction);
	return (
		<React.Fragment>
			<Logo />
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
							<Typography color='primary' style={{ cursor: 'pointer', display: 'inline-block' }}>
								{' '}
								Terms and Conditions
							</Typography>
						</Typography>
					</FormLabel>
				</FormGroup>
			</Box>
		</React.Fragment>
	);
};

Login.defaultProps = {
	nextAction: () => {},
	prevAction: () => {},
};
export default Login;
