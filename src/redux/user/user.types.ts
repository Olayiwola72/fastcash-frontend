import { UserResponse, TokenResponse, ErrorDetails, User, FetchExchangeRateRequest } from "./interface";
import { CredentialResponse } from '@react-oauth/google';
import { OwnAccountTransferRequest } from "../../components/OwnAccountTransfer/interface";
import { InterBankTransferRequest } from "../../components/InterBankTransfer/interface";
import { ManageOverdraftRequest } from "../../components/AccountFeatures/interface";
import { UpdateUserRequest } from "../../components/UpdateUser/interface";
import { ChangePasswordRequest } from "../../components/ChangePassword/interface";
import { NavigateFunction } from "react-router-dom";
import { SignInRequest } from "../../components/SignIn/interface";
import { ForgotPasswordRequest, ResetPasswordRequest } from "../../components/ResetPassword/interface";

export enum UserActionTypes {
    GET_AUTH_TOKEN_START = 'GET_AUTH_TOKEN_START',
    GET_AUTH_TOKEN_SUCCESS = 'GET_AUTH_TOKEN_SUCCESS',
    GET_AUTH_TOKEN_FAILURE = 'GET_AUTH_TOKEN_FAILURE',
    GOOGLE_SIGN_IN_START = 'GOOGLE_SIGN_IN_START',
    SIGN_IN_START = 'SIGN_IN_START',
    SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS',
    SIGN_IN_FAILURE = 'SIGN_IN_FAILURE',
    SIGN_OUT_START = 'SIGN_OUT_START',
    SIGN_OUT_SUCCESS = 'SIGN_OUT_SUCCESS',
    SIGN_OUT_FAILURE = 'SIGN_OUT_FAILURE',
    GET_USER_SUCCESS = 'GET_USER_SUCCESS',
    GET_USER_FAILURE = 'GET_USER_FAILURE',
    ACCOUNT_TRANSFER_START = 'ACCOUNT_TRANSFER_START',
    ACCOUNT_TRANSFER_FAILURE = 'ACCOUNT_TRANSFER_FAILURE',
    ACCOUNT_TRANSFER_SUCCESS = 'ACCOUNT_TRANSFER_SUCCESS',
    SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE',
    REMOVE_SUCCESS_MESSAGE = 'REMOVE_SUCCESS_MESSAGE',
    REMOVE_ERROR_MESSAGE = 'REMOVE_ERROR_MESSAGE',
    SET_SHOW_MODAL = 'SET_SHOW_MODAL',
    REMOVE_SHOW_MODAL = 'REMOVE_SHOW_MODAL',
    MANAGE_OVERDRAFT_START = 'MANAGE_OVERDRAFT_START',
    MANAGE_OVERDRAFT_SUCCESS = 'MANAGE_OVERDRAFT_SUCCESS',
    MANAGE_OVERDRAFT_FAILURE = 'MANAGEE_OVERDRAFT_FAILURE',
    CHANGE_PASSWORD_START = 'CHANGE_PASSWORD_START',
    CHANGE_PASSWORD_SUCCESS = 'CHANGE_PASSWORD_SUCCESS',
    CHANGE_PASSWORD_FAILURE = 'CHANGE_PASSWORD_FAILURE',
    UPDATE_USER_START = 'UPDATE_USER_START',
    UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS',
    UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE',
    DISABLE_USER_START = 'DISABLE_USER_START',
    DISABLE_USER_SUCCESS = 'DISABLE_USER_SUCCESS',
    DISABLE_USER_FAILURE = 'DISABLE_USER_FAILURE',
    FORGET_PASSWORD_START = 'FORGET_PASSWORD_START',
    FORGET_PASSWORD_SUCCESS = 'FORGET_PASSWORD_SUCCESS',
    FORGET_PASSWORD_FAILURE = 'FORGET_PASSWORD_FAILURE',
    RESET_PASSWORD_START = 'RESET_PASSWORD_START',
    RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS',
    RESET_PASSWORD_FAILURE = 'RESET_PASSWORD_FAILURE',
    FETCH_EXCHANGE_RATE_START = 'FETCH_EXCHANGE_RATE_START',
    FETCH_EXCHANGE_RATE_SUCCESS = 'FETCH_EXCHANGE_RATE_SUCCESS',
    FETCH_EXCHANGE_RATE_FAILURE = 'FETCH_EXCHANGE_RATE_FAILURE'
}

export interface GetAuthTokenStartAction {
    type: typeof UserActionTypes.GET_AUTH_TOKEN_START;
    payload: SignInRequest;
}

export interface GoogleSignInStartAction {
    type: typeof UserActionTypes.GOOGLE_SIGN_IN_START;
    payload: CredentialResponse;
}

interface GetAuthTokenSuccessAction {
    type: typeof UserActionTypes.GET_AUTH_TOKEN_SUCCESS;
    payload: TokenResponse;
}

interface GetAuthTokenFailureAction {
    type: typeof UserActionTypes.GET_AUTH_TOKEN_FAILURE;
    payload: ErrorDetails;
}

export interface SignInStartAction {
    type: typeof UserActionTypes.SIGN_IN_START;
}

interface SignInSuccessAction {
    type: typeof UserActionTypes.SIGN_IN_SUCCESS;
    payload: UserResponse;
}

interface SignInFailureAction {
    type: typeof UserActionTypes.SIGN_IN_FAILURE;
    payload: ErrorDetails;
}

export interface SignOutStartAction {
    type: typeof UserActionTypes.SIGN_OUT_START;
}

interface SignOutSuccessAction {
    type: typeof UserActionTypes.SIGN_OUT_SUCCESS;
}

interface SignOutFailureAction {
    type: typeof UserActionTypes.SIGN_OUT_FAILURE;
    payload: ErrorDetails;
}

interface GetUserSuccessAction {
    type: typeof UserActionTypes.GET_USER_SUCCESS;
    payload: User;
}

interface GetUserFailureAction {
    type: typeof UserActionTypes.GET_USER_FAILURE;
    payload: ErrorDetails;
}

export interface AccountTransferStartAction {
    type: typeof UserActionTypes.ACCOUNT_TRANSFER_START;
    payload: { data: TransferRequest, navigate: NavigateFunction };
}

interface AccountTransferSuccessAction {
    type: typeof UserActionTypes.ACCOUNT_TRANSFER_SUCCESS;
    payload: UserResponse;
}

interface AccountTransferFailureAction {
    type: typeof UserActionTypes.ACCOUNT_TRANSFER_FAILURE;
    payload: ErrorDetails;
}

interface SetErrorMessageAction {
    type: typeof UserActionTypes.SET_ERROR_MESSAGE;
    payload: ErrorDetails;
}

interface RemoveSuccessMessageAction {
    type: typeof UserActionTypes.REMOVE_SUCCESS_MESSAGE;
}

interface RemoveErrorMessageAction {
    type: typeof UserActionTypes.REMOVE_ERROR_MESSAGE;
}

interface SetShowModalAction {
    type: typeof UserActionTypes.SET_SHOW_MODAL;
}

interface RemoveShowModalAction {
    type: typeof UserActionTypes.REMOVE_SHOW_MODAL;
}

export interface ManageOverdraftStartAction {
    type: typeof UserActionTypes.MANAGE_OVERDRAFT_START;
    payload: { id: number, data: ManageOverdraftRequest };
}

interface ManageOverdraftSuccessAction {
    type: typeof UserActionTypes.MANAGE_OVERDRAFT_SUCCESS;
    payload: UserResponse;
}

interface ManageOverdraftFailureAction {
    type: typeof UserActionTypes.MANAGE_OVERDRAFT_FAILURE;
    payload: ErrorDetails;
}

export interface ChangePasswordStartAction {
    type: typeof UserActionTypes.CHANGE_PASSWORD_START;
    payload: { id: number, data: ChangePasswordRequest, navigate: NavigateFunction };
}

interface ChangePasswordSuccessAction {
    type: typeof UserActionTypes.CHANGE_PASSWORD_SUCCESS;
}

interface ChangePasswordFailureAction {
    type: typeof UserActionTypes.CHANGE_PASSWORD_FAILURE;
    payload: ErrorDetails;
}

export interface UpdateUserStartAction {
    type: typeof UserActionTypes.UPDATE_USER_START;
    payload: { id: number, data: UpdateUserRequest, navigate: NavigateFunction };
}

interface UpdateUserSuccessAction {
    type: typeof UserActionTypes.UPDATE_USER_SUCCESS;
    payload: UserResponse;
}

interface UpdateUserFailureAction {
    type: typeof UserActionTypes.UPDATE_USER_FAILURE;
    payload: ErrorDetails;
}

export interface DisableUserStartAction {
    type: typeof UserActionTypes.DISABLE_USER_START;
    payload: { id: number };
}

interface DisableUserSuccessAction {
    type: typeof UserActionTypes.DISABLE_USER_SUCCESS;
}

interface DisableUserFailureAction {
    type: typeof UserActionTypes.DISABLE_USER_FAILURE;
    payload: ErrorDetails;
}

export interface ForgetPasswordStartAction {
    type: typeof UserActionTypes.FORGET_PASSWORD_START;
    payload: { data: ForgotPasswordRequest };
}

interface ForgetPasswordSuccessAction {
    type: typeof UserActionTypes.FORGET_PASSWORD_SUCCESS;
}

interface ForgetPasswordFailureAction {
    type: typeof UserActionTypes.FORGET_PASSWORD_FAILURE;
    payload: ErrorDetails;
}

export interface ResetPasswordStartAction {
    type: typeof UserActionTypes.RESET_PASSWORD_START;
    payload: { data: ResetPasswordRequest, navigate: NavigateFunction };
}

interface ResetPasswordSuccessAction {
    type: typeof UserActionTypes.RESET_PASSWORD_SUCCESS;
}

interface ResetPasswordFailureAction {
    type: typeof UserActionTypes.RESET_PASSWORD_FAILURE;
    payload: ErrorDetails;
}

export interface FetchExchangeRateStartAction {
    type: typeof UserActionTypes.FETCH_EXCHANGE_RATE_START;
    payload: FetchExchangeRateRequest;
}

interface FetchExchangeRateSuccessAction {
    type: typeof UserActionTypes.FETCH_EXCHANGE_RATE_SUCCESS;
}

interface FetchExchangeRateFailureAction {
    type: typeof UserActionTypes.FETCH_EXCHANGE_RATE_FAILURE;
    payload: ErrorDetails;
}

export type TransferRequest = OwnAccountTransferRequest | InterBankTransferRequest;

export type UserActions =
    | GoogleSignInStartAction
    | GetAuthTokenStartAction
    | GetAuthTokenSuccessAction
    | GetAuthTokenFailureAction
    | SignInStartAction
    | SignInSuccessAction
    | SignInFailureAction
    | SignOutStartAction
    | SignOutSuccessAction
    | SignOutFailureAction
    | GetUserSuccessAction
    | GetUserFailureAction
    | AccountTransferStartAction
    | AccountTransferSuccessAction
    | AccountTransferFailureAction
    | RemoveSuccessMessageAction
    | RemoveErrorMessageAction
    | SetErrorMessageAction
    | SetShowModalAction
    | RemoveShowModalAction
    | ManageOverdraftStartAction
    | ManageOverdraftSuccessAction
    | ManageOverdraftFailureAction
    | ChangePasswordStartAction
    | ChangePasswordSuccessAction
    | ChangePasswordFailureAction
    | UpdateUserStartAction
    | UpdateUserSuccessAction
    | UpdateUserFailureAction
    | DisableUserStartAction
    | DisableUserSuccessAction
    | DisableUserFailureAction
    | ForgetPasswordStartAction
    | ForgetPasswordSuccessAction
    | ForgetPasswordFailureAction
    | ResetPasswordStartAction
    | ResetPasswordSuccessAction
    | ResetPasswordFailureAction
    | FetchExchangeRateStartAction
    | FetchExchangeRateSuccessAction
    | FetchExchangeRateFailureAction
