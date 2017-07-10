import {combineReducers} from 'redux';
import {routerReducer as routing} from 'react-router-redux';
import form from './form';
import api  from './api';

export default combineReducers({
  routing,
  form,
  api,
});
