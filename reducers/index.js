import { combineReducers } from 'redux';
import newSet from './newSet';
import sets from './sets';
import cards from './cards';
import statusBar from './statusBar';
import selectedSet from './selectedSet';

export default combineReducers({
  newSet, sets, cards, statusBar, selectedSet,
});
