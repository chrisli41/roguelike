function currentEnemy(state = [], action) {
	switch(action.type) {
		case 'UPDATE_CURRENT_ENEMY_HEALTH':
			return { ...state, health: action.health }

		case 'UPDATE_CURRENT_ENEMY_DAMAGE':
			return { ...state, damage: action.damage }

		default: 
			return state;

	}
}

export default currentEnemy;