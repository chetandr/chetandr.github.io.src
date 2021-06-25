import { Box } from '@material-ui/core';
import React from 'react';

const SwipeButton = () => (
	<Box style={{ width: '100%', height: '64px', background: '#FEF1F5' }}>
		<Box style={{ width: '64px', background: '#EEF1F5', height: '100%', border: "solid black 1px", margin: '8px' }}></Box>
	</Box>
);

export default SwipeButton;
