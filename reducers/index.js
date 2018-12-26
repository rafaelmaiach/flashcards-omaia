import { combineReducers } from 'redux';
import newSet from './newSet';
import sets from './sets';
import cards from './cards';

export default combineReducers({ newSet, sets, cards });
