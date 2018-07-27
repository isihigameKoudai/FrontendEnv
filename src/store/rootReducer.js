import { combineReducers } from 'redux'

import counter from './reducers/counter';

const reducer = combineReducers({
  counter
});

export default reducer;
