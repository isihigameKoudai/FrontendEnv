import React from 'react';

class Top extends React.Component {
	constructor() {
		super();
		this.state = {
			count: 0,
			isFlag: false
		};
		this.addCount = this.addCount.bind(this);
		this.setState = this.setState.bind(this);
	}
	addCount() {
		this.setState({count: this.state.count + 1});
	}
	render() {
		return (
			<div>
				<p>{this.state.count}</p>
				<button onClick={this.addCount}>BUTTON</button>
			</div>
		)
	}
}

export default Top;