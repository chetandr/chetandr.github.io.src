import React from 'react';
import Button from '@material-ui/core/Button';
const RoundedButton = (props) => {
	const handleClick = () => {
		props.onClick();
	};

	return (
		<Button
			variant={props.variant}
			color={props.color}
			fullWidth={props.fullWidth}
			size={props.size}
			style={{ borderRadius: '28px', height: '0.05%', textTransform: 'none', paddingLeft: '16px',  paddingRight: '16px'  }}
			onClick={handleClick}
		>
			{props.label}
		</Button>
	);
};

RoundedButton.defaultProps = {
	label: '',
	color: 'primary',
	onClick: () => {},
	fullWidth: true,
	size: 'medium',
	variant: 'contained',
};

export default RoundedButton;
