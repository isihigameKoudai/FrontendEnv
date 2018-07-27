import {INCREMENT, DECREMENT} from './action-type';

export default {
	increment: (count) => {
		return {
			type: INCREMENT
		}
	},
	decerement: () => {
		return {
			type: DECREMENT
		}
	}
}