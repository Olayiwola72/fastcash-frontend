import { UserActionTypes, UserActions } from './user.types';
import { UserState } from './interface';

const INITIAL_STATE : UserState = {
	isFetching: false,
	token: undefined,
	refreshToken: undefined,
	userData: undefined,
	errorDetails: undefined,
	successMessage: undefined,
	showModal : false
};

const userReducer = (state = INITIAL_STATE, action: UserActions) : UserState =>  {
	switch (action.type){
		case UserActionTypes.GET_AUTH_TOKEN_START:
		case UserActionTypes.GOOGLE_SIGN_IN_START:
		case UserActionTypes.SIGN_OUT_START:
		case UserActionTypes.ACCOUNT_TRANSFER_START:
		case UserActionTypes.MANAGE_OVERDRAFT_START:
		case UserActionTypes.CHANGE_PASSWORD_START:
		case UserActionTypes.UPDATE_USER_START:
		case UserActionTypes.DISABLE_USER_START:
		case UserActionTypes.FORGET_PASSWORD_START:
		case UserActionTypes.RESET_PASSWORD_START:
		return {
			...state,	
			isFetching: true,
			errorDetails: undefined,
			successMessage: undefined
		}
		case UserActionTypes.GET_AUTH_TOKEN_SUCCESS:
			return {
				...state,
				token: action.payload.token,
				refreshToken: action.payload.refreshToken,
				errorDetails: undefined
			}
		case UserActionTypes.GET_AUTH_TOKEN_FAILURE:
		case UserActionTypes.GET_USER_FAILURE:
			return {
				...state,
				isFetching: false,	
				userData: undefined,
				token: undefined,
				refreshToken: undefined,
				errorDetails: action.payload,
			}
		case UserActionTypes.SIGN_IN_SUCCESS:
			return {
				...state,	
				isFetching: false,
				token: action.payload.token,
				refreshToken: action.payload.refreshToken,
				userData: action.payload.userData,
				errorDetails: undefined
			}
		case UserActionTypes.SIGN_IN_FAILURE:
			return {
				...state,
				isFetching: false,
				token: undefined,
				refreshToken: undefined,
				userData: undefined,
				errorDetails: action.payload,
				successMessage: undefined
			}
		case UserActionTypes.SIGN_OUT_SUCCESS:
		case UserActionTypes.CHANGE_PASSWORD_SUCCESS:
		case UserActionTypes.DISABLE_USER_SUCCESS:
		case UserActionTypes.FORGET_PASSWORD_SUCCESS:
		case UserActionTypes.RESET_PASSWORD_SUCCESS:
			return {
				...state,
				isFetching: false,
				token: undefined,
				refreshToken: undefined,
				userData: undefined,
				errorDetails: undefined,
				successMessage: undefined
			}
		case UserActionTypes.GET_USER_SUCCESS:
			return {
				...state,
				isFetching: false,
				userData: action.payload
			}
		case UserActionTypes.ACCOUNT_TRANSFER_SUCCESS:
		case UserActionTypes.UPDATE_USER_SUCCESS:
			return {
				...state,
				isFetching: false,
				userData: action.payload.userData,
				successMessage: action.payload.successMessage,
			}
		case UserActionTypes.SET_ERROR_MESSAGE:
		case UserActionTypes.ACCOUNT_TRANSFER_FAILURE:
		case UserActionTypes.MANAGE_OVERDRAFT_FAILURE:
		case UserActionTypes.CHANGE_PASSWORD_FAILURE:
		case UserActionTypes.UPDATE_USER_FAILURE:
		case UserActionTypes.DISABLE_USER_FAILURE:
		case UserActionTypes.FORGET_PASSWORD_FAILURE:
		case UserActionTypes.RESET_PASSWORD_FAILURE:
			return {
				...state,
				errorDetails: action.payload,
				isFetching: false,
				successMessage: undefined
			}
		case UserActionTypes.REMOVE_SUCCESS_MESSAGE:
			return {
				...state,
				successMessage: undefined,
			}
		case UserActionTypes.REMOVE_ERROR_MESSAGE:
			return {
				...state,
				errorDetails: undefined,
			}
		case UserActionTypes.SET_SHOW_MODAL:
			return {
				...state,
				showModal: true,
			}
		case UserActionTypes.REMOVE_SHOW_MODAL:
			return {
				...state,
				showModal: false,
			}
		case UserActionTypes.MANAGE_OVERDRAFT_SUCCESS:
			return {
				...state,
				userData: action.payload.userData,
			}
		default:
			return state;
	}
}

export default userReducer;