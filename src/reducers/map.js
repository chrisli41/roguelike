function map(state = [], action) {
	switch(action.type) {
		case'INIT_MAP':
			console.log('INIT_MAP REDUCER');
			return action.map;

		case 'UPDATE_MAP':
			return state.map((item, index) => {
				if(item.xPos === action.xPos && item.yPos === action.yPos) {
					return {
						...item,
						value: action.value
					}
				}

				return item;
			});

		case 'UPDATE_MAP_ENEMY':
			return state.map((item, index) => {
				if(item.xPos === action.xPos && item.yPos === action.yPos) {
					return {
						...item,
						health: action.health
					}
				}

				return item;
			});

		default: 
			return state;

	}
}

export default map;