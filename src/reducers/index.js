import { combineReducers } from 'redux';
import map from './map';
import player from './player';
import view from './view';
import status from './status';
import currentEnemy from './currentEnemy';
import messages from './messages';

const rootReducer = combineReducers({map, player, view, status, currentEnemy, messages});

export default rootReducer;