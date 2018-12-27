import { combineReducers } from 'redux';
import newSet from './newSet';
import sets from './sets';
import cards from './cards';
import statusBar from './statusBar';

export default combineReducers({
  newSet, sets, cards, statusBar,
});
