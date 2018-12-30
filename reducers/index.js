import { combineReducers } from 'redux';
import newSet from './newSet';
import sets from './sets';
import cards from './cards';
import statusBar from './statusBar';
import selectedSet from './selectedSet';
import quiz from './quiz';

export default combineReducers({
  newSet, sets, cards, statusBar, selectedSet, quiz,
});
