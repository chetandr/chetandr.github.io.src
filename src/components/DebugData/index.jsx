const DebugData = (props) => {
	const components = [];
	if (props.debugData) {
		for (let key in props.debugData) {
			components.push(
				<div className='debugRow'>
					<span className='debugLabel'>{key} : </span>
					<span className='debugValue'>{props.debugData[key]}</span>
				</div>,
			);
		}
	}

	return components;
};

export default DebugData;