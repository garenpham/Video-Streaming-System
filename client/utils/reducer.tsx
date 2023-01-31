export const initialState = {
	user: '',
};

/**
 * Selecter
 */

export interface IState {
	user: string;
}

export interface IAction {
	type: string;
	user: string;
}

export interface IReducer {
	(state: IState, action: IAction): IState;
}

const reducer = (state: IState, action: IAction) => {
	switch (action.type) {
		case 'CURRENT_USER':
			return { ...state, user: action.user };

		default:
			return state;
	}
};

export default reducer;
