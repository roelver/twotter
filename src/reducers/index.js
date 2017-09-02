import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import profileReducer from './profile-reducer';
import twotReducer from './twot-reducer';

const rootReducer = combineReducers({
  profile: profileReducer,
  form: formReducer,
  twot: twotReducer
});

export default rootReducer;
