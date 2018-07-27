import React from 'react';

const Button = (props) => {
	const title = props && props.title ? props.title : 'none';

	return <button onClick={props.push}>{title}</button>
}

export default Button;
