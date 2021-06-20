import React from 'react';

import { Box } from '@material-ui/core';

const TheUnlimited = (props) => {
	return (
		<Box p={4}>
			<img
				src={props.imageURL}
				alt={props.alt}
				style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block', width: '80vw' }}
			></img>
		</Box>
	);
};

TheUnlimited.defaultProps = {
	imageURL: '/logos/carScan_logo.png',
	alt: "Carscan"
}
export default TheUnlimited;
