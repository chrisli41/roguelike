import { createStore } from 'redux';
import rootReducer from './reducers/index';

function initMap() {
		const map = [];
		for(var i = 0; i < 30; i++) {
			for(var j = 0; j < 50; j++) {
				if (i === 0 || i === 1 || i === 2 || i === 27 || i === 28 || i === 29 || j === 0 || j === 1 || j === 2 || j === 47 || j === 48 || j === 49) {
					map.push({value: 3, xPos: j, yPos: i});
				} 
				else if (i === 3 || i === 26 || j === 3 || j === 46) {
					map.push({value: 1, xPos: j, yPos: i});
				}
				else if (i === 15 && j === 25) {
					map.push({value: 21, xPos: 25, yPos: 15});
				}
				else if (Math.random() > .99) {

					const damage = Math.random() > .50 ? 2 : 3;

					map.push({value: 5, health: 10, damage: damage, xPos: j, yPos: i});
				}
				else {
					const value = Math.random() > .25 ? 0 : Math.random() > .10 ? 1 : 4;
					map.push({value: value, xPos: j, yPos: i});
				}
			}
		}
		return map;
}

const defaultState = {
	map: initMap(),
	status: 'alive',
	messages: [],
	currentEnemy: {
		health: 'N/A',
		damage: 'N/A',
	},
	player: {
		xPos: 25,
		yPos: 15,
		health: 10,
		weapon: { name: 'Fists', 
				  damage: 4 },
		level: 1,
		facing: 21
	}
}

const store = createStore(rootReducer, defaultState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;