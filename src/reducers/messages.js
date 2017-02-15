function messages(state = [], action) {
	switch(action.type) {
		case 'ADD_MESSAGE':
			return [...state.slice(-4), action.message]
		default: 
			return state;
	}
}

export default messages;