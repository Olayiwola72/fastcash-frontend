import { TransferRequest, UserActionTypes } from './user.types';
import { UserResponse, TokenResponse, ErrorDetails, User, FetchExchangeRateRequest } from'./interface';
import { CredentialResponse } from '@react-oauth/google';
import { handleFallbackError, handleAuthenticationError } from '../../utils/apiErrorUtil';
import { ManageOverdraftRequest } from '../../components/AccountFeatures/interface';
import { UpdateUserRequest } from '../../components/UpdateUser/interface';
import { ChangePasswordRequest } from '../../components/ChangePassword/interface';
import { NavigateFunction } from 'react-router-dom';
import { SignInRequest } from '../../components/SignIn/interface';
import { ForgotPasswordRequest, ResetPasswordRequest } from '../../components/ResetPassword/interface';

export const googleSignInStart = (response: CredentialResponse) => ({
	type: UserActionTypes.GOOGLE_SIGN_IN_START,
	payload: response
});

export const getAuthTokenStart = (data : SignInRequest) => ({
	type: UserActionTypes.GET_AUTH_TOKEN_START,
	payload: data
});

export const getAuthTokenSuccess = (data : TokenResponse) => ({
	type: UserActionTypes.GET_AUTH_TOKEN_SUCCESS,
	payload: data
});

export const getAuthTokenFailure = (data : ErrorDetails) => ({
	type: UserActionTypes.GET_AUTH_TOKEN_FAILURE,
	payload: data
});

export const signInStart = () => ({
	type: UserActionTypes.SIGN_IN_START
});

export const signInSuccess = (data : UserResponse) => ({
	type: UserActionTypes.SIGN_IN_SUCCESS,
	payload: data
});

export const signInFailure = (data : ErrorDetails) => ({
	type: UserActionTypes.SIGN_IN_FAILURE,
	payload: data
});

export const signOutStart = () => ({
	type: UserActionTypes.SIGN_OUT_START
});

export const signOutSuccess = () => ({
	type: UserActionTypes.SIGN_OUT_SUCCESS,
});

export const signOutFailure = (data : ErrorDetails) => ({
	type: UserActionTypes.SIGN_OUT_FAILURE,
	payload: data
});

export const getUserSuccess = (data : User) => ({
	type: UserActionTypes.GET_USER_SUCCESS,
	payload: data
});

export const getUserFailure = () => ({
	type: UserActionTypes.GET_USER_FAILURE,
	payload: handleAuthenticationError()
});

export const accountTransferStart = (data : TransferRequest, navigate : NavigateFunction) => ({
	type: UserActionTypes.ACCOUNT_TRANSFER_START,
	payload: {data, navigate}
});

export const accountTransferSuccess = (data : TokenResponse) => ({
	type: UserActionTypes.ACCOUNT_TRANSFER_SUCCESS,
	payload: data
});

export const accountTransferFailure = (data : ErrorDetails) => ({
	type: UserActionTypes.ACCOUNT_TRANSFER_FAILURE,
	payload: data
});

export const setErrorMessage = (errorMessage : string) => ({
	type: UserActionTypes.SET_ERROR_MESSAGE,
	payload: handleFallbackError(errorMessage)
});

export const removeSuccessMessage = () => ({
	type: UserActionTypes.REMOVE_SUCCESS_MESSAGE
});

export const removeErrorMessage = () => ({
	type: UserActionTypes.REMOVE_ERROR_MESSAGE
});

export const setShowModal = () => ({
	type: UserActionTypes.SET_SHOW_MODAL
});

export const removeShowModal = () => ({
	type: UserActionTypes.REMOVE_SHOW_MODAL
});

export const manageOverdraftStart = (id : number, data : ManageOverdraftRequest) => ({
	type: UserActionTypes.MANAGE_OVERDRAFT_START,
	payload : {id, data}
});

export const manageOverdraftSuccess = (data : UserResponse) => ({
	type: UserActionTypes.MANAGE_OVERDRAFT_SUCCESS,
	payload: data
});

export const manageOverdraftFailure = (data : ErrorDetails) => ({
	type: UserActionTypes.MANAGE_OVERDRAFT_FAILURE,
	payload: data
});

export const changePasswordStart = (id : number, data : ChangePasswordRequest, navigate : NavigateFunction) => ({
	type: UserActionTypes.CHANGE_PASSWORD_START,
	payload : {id, data, navigate}
});

export const changePasswordSuccess = () => ({
	type: UserActionTypes.CHANGE_PASSWORD_SUCCESS
});

export const changePasswordFailure = (data : ErrorDetails) => ({
	type: UserActionTypes.CHANGE_PASSWORD_FAILURE,
	payload: data
});

export const updateUserStart = (id : number, data : UpdateUserRequest, navigate : NavigateFunction) => ({
	type: UserActionTypes.UPDATE_USER_START,
	payload : {id, data, navigate}
});

export const updateUserSuccess = (data : UserResponse) => ({
	type: UserActionTypes.UPDATE_USER_SUCCESS,
	payload: data
});

export const updateUserFailure = (data : ErrorDetails) => ({
	type: UserActionTypes.UPDATE_USER_FAILURE,
	payload: data
});

export const disableUserStart = (id : number) => ({
	type: UserActionTypes.DISABLE_USER_START,
	payload : {id}
});

export const disableUserSuccess = () => ({
	type: UserActionTypes.DISABLE_USER_SUCCESS
});

export const disableUserFailure = (data : ErrorDetails) => ({
	type: UserActionTypes.DISABLE_USER_FAILURE,
	payload: data
});

export const forgotPasswordStart = (data : ForgotPasswordRequest) => ({
	type: UserActionTypes.FORGET_PASSWORD_START,
	payload : data
});

export const forgotPasswordSuccess = () => ({
	type: UserActionTypes.FORGET_PASSWORD_SUCCESS
});

export const forgotPasswordStartFailure = (data : ErrorDetails) => ({
	type: UserActionTypes.FORGET_PASSWORD_FAILURE,
	payload: data
});

export const resetPasswordStart = (data : ResetPasswordRequest,  navigate : NavigateFunction) => ({
	type: UserActionTypes.RESET_PASSWORD_START,
	payload : { data, navigate }
});

export const resetPasswordSuccess = () => ({
	type: UserActionTypes.RESET_PASSWORD_SUCCESS
});

export const resetPasswordStartFailure = (data : ErrorDetails) => ({
	type: UserActionTypes.RESET_PASSWORD_FAILURE,
	payload: data
});

export const fetchExchangeRateStart = (data : FetchExchangeRateRequest) => ({
	type: UserActionTypes.FETCH_EXCHANGE_RATE_START,
	payload : data
});