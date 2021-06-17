import React from 'react';

const OverlayImage = (props) => {
	const imageName = `/images/overlays/${props.image}`;
	return <img src={imageName} width={props.width} />;
};

OverlayImage.defaultProps = {
	image: 'FrontFull.png',
	width: '60%',
};

export default OverlayImage;
