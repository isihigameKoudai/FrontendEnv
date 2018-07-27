import React from 'react';

const Label = (props) => {
	const counts = props && props.data ? props.data : 0;
	return <p>{counts}</p>
}

export default Label;
