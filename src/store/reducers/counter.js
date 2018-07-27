import {INCREMENT, DECREMENT} from '../../actions/action-type';
// Initialize state
const initialState = {
	count: 0,
	isChange: false
};

const counter = (state = initialState, action) => {
	switch (action.type) {
		case INCREMENT:
      return {
				count: state.count + 1,
				isChange: true
			};
		case DECREMENT:
			return {
				count: state.count - 1,
				isChange: false
			}
		default:
			return state;
	}
}

export default counter;
