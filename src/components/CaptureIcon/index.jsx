import React from 'react';
import Icon from '@material-ui/core/Icon';
const CaptureIcon = (props) => {
	return (
		<Icon style={{ height: '100%', width: '100%' }}>
			<img src='/images/CaptureButton.png' style={{ textAlign: 'center', width: '80px' }} />
		</Icon>
	);
};

export default CaptureIcon;
