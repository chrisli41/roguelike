

function player(state = [], action) {
	switch(action.type) {
		case 'UPDATE_PLAYER_POS':
			return {...state, xPos: action.xPos, yPos: action.yPos}

		case 'UPDATE_PLAYER_HEALTH':
			return {...state, health: action.health}

		case 'UPDATE_PLAYER_WEAPON':
			return {...state, weapon: {name: action.name, damage: action.damage}}

		case 'UPDATE_PLAYER_LVL':
			console.log('UPDATE_PLAYER_LVL REDUCER');
			return {...state, level: action.level}	
			
		case 'UPDATE_PLAYER_FACING':
			return {...state, facing: action.facing}

		default: 
			return state;

	}
}

export default player;