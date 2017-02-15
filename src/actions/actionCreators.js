export function setMap(map) {
	console.log('DISPATCH INIT_MAP');
	return {
		type: 'INIT_MAP',
		map
	}
}

export function updateMap(yPos, xPos, value) {
	return {
		type: 'UPDATE_MAP',
		xPos,
		yPos,
		value
	}
}

export function updateMapEnemy(yPos, xPos, health) {
	return {
		type: 'UPDATE_MAP_ENEMY',
		xPos,
		yPos,
		health
	}
}

export function updateCurrentEnemyHealth(health) {
	return {
		type: 'UPDATE_CURRENT_ENEMY_HEALTH',
		health
	}
}

export function updateCurrentEnemyDamage(damage) {
	return {
		type: 'UPDATE_CURRENT_ENEMY_DAMAGE',
		damage
	}
}

export function updatePlayerPos(yPos, xPos) {
	return {
		type: 'UPDATE_PLAYER_POS',
		xPos,
		yPos
	}
}

export function updatePlayerFacing(facing) {
	return {
		type: 'UPDATE_PLAYER_FACING',
		facing
	}
}

export function updatePlayerHealth(health) {
	return {
		type: 'UPDATE_PLAYER_HEALTH',
		health
	}
}

export function updatePlayerWeapon(name, damage) {
	console.log('DISPATCH UPDATE_PLAYER_WEAPON');
	return {
		type: 'UPDATE_PLAYER_WEAPON',
		name,
		damage
	}
}

export function updatePlayerLevel(level) {
	console.log('DISPATCH UPDATE_PLAYER_LVL');
	return {
		type: 'UPDATE_PLAYER_LVL',
		level
	}
}

export function updateView(view) {
	return {
		type: 'UPDATE_VIEW',
		view
	}
}

export function addMessage(message) {
	return {
		type: 'ADD_MESSAGE',
		message
	}
}

export function updateStatus(status) {
	return {
		type: 'UPDATE_STATUS',
		status
	}
}