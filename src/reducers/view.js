function view(state = [], action) {
	switch(action.type) {
		case 'UPDATE_VIEW':
			return action.view
		default: 
			return state;

	}
}

export default view;