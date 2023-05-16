import {createStore, combineReducers} from 'redux';

import groupReducer from './groupReducer';

const rootReducer = combineReducers({
  groupReducer: groupReducer,
});

export const store = createStore(rootReducer);
