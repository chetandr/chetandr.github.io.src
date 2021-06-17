import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import TheUnlimited from '../../../Logos/theunlimited';
import Typography from '@material-ui/core/Typography';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from "@material-ui/core/FormGroup";
import RoundedButton from "../../../RoundedButton";
import Car from "../../../Car";
import Checkbox from '@material-ui/core/Checkbox';
const Login = (props) => {
	const [checked,setChecked] = React.useState(false);
	
	const handleChange = () => {
		setChecked(!checked);
	}

	const handleClicked = () => {
		console.log("next Clicked",props.nextAction)
		props.nextAction();
	}
	console.log("PROPS", props.nextAction)
	return (
		<React.Fragment>
			<TheUnlimited />
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
				<RoundedButton label="Login" onClick={handleClicked}/>
			</Box>
			<Box pt={8}>
				<Car/>
			</Box>
			<Box pt={4}>
				<FormGroup>
				
				<FormLabel><Checkbox checked={checked} onChange={handleChange} name="Agreed" style={{float:"left"}}/><Typography variant="caption">I have read, understood and agreed with your Terms and Conditions</Typography></FormLabel>
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
