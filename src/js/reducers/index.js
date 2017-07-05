import {combineReducers} from 'redux';
import {routerReducer as routing} from 'react-router-redux';
import form from './form';

export default combineReducers({
  routing,
  form,
});
