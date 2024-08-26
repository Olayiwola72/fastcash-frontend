import { ConfigActionTypes, ConfigActions } from './config.types';
import { ConfigState } from './interface';

const INITIAL_STATE : ConfigState = {
	todayDate: undefined,
	currencies: undefined,
	providers: undefined,
	transactionTypes: undefined
};

const configReducer = (state = INITIAL_STATE, action : ConfigActions) : ConfigState =>  {
	switch (action.type){
		case ConfigActionTypes.GET_CONFIG_SUCCESS:
			return {
				...state,
				currencies: action.payload.currencies,
				providers: action.payload.providers
			}
		default:
			return state;
	}
}

export default configReducer;