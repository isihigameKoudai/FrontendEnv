import React from 'react';
import { connect } from 'react-redux'

import actions from '../actions/';
import Label from '../components/Label';
import Button from '../components/Button';

const mapStateToProps = (state) => {
	return state;
};

const mapDispatchToProps = (dispatch) => {
	return {
    buttonAdd: () => { dispatch(actions.increment()) },
    buttonMinus: () => { dispatch(actions.decerement()) }
  }
}

class About extends React.Component {
	render() {
		const prop = this.props;
		return (
			<div>
				<Label data={prop.counter.count}/>
				<Button push={prop.buttonAdd} title='ADD'/>
				<Button push={prop.buttonMinus} title='MINUS'/>
			</div>
		)
	}
}

// コンポーネントにpropsとdispatchを付与
export default connect(mapStateToProps,mapDispatchToProps)(About);
