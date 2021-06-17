import React from 'react';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';

import CaptureIcon from '../CaptureIcon';

const CaptureButton = (props) => {
	return (
		<Box
			p={4}
			style={{
				display: 'block',
				position: 'absolute',
				top: '40%',
				right: '0%',
				zIndex: 205,
				textAlign: 'center',
				color: 'white',
			}}
		>
			<IconButton onClick={props.onClick}>
				<CaptureIcon />
			</IconButton>
		</Box>
	);
};

export default CaptureButton;