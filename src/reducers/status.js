function status(state = [], action) {
	switch(action.type) {
		case 'UPDATE_STATUS':
			return action.status
		default: 
			return state;

	}
}

export default status;