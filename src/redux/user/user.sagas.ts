import { select, takeLatest, put, all, call } from 'redux-saga/effects';
import { axiosInstance, axiosInstanceWithAuthNoInterceptor, axiosNoInterceptor } from '../../utils/axiosConfig';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Buffer } from 'buffer';
import { googleLogout } from '@react-oauth/google';
import { UserActionTypes, GetAuthTokenStartAction, AccountTransferStartAction, GoogleSignInStartAction, ManageOverdraftStartAction, ChangePasswordStartAction, UpdateUserStartAction, DisableUserStartAction, ForgetPasswordStartAction, ResetPasswordStartAction, FetchExchangeRateStartAction } from './user.types';
import { getAuthTokenSuccess, getAuthTokenFailure, signInSuccess, signInFailure, signOutSuccess, signOutFailure, accountTransferSuccess , accountTransferFailure, manageOverdraftSuccess, manageOverdraftFailure, changePasswordSuccess, changePasswordFailure, updateUserSuccess, updateUserFailure, disableUserSuccess, disableUserFailure, forgotPasswordSuccess, forgotPasswordStartFailure, resetPasswordSuccess, resetPasswordStartFailure} from './user.actions';
import { ErrorDetails, User, UserResponse } from './interface';
import { isAxiosError, handleAxiosError, handleNonAxiosError } from '../../utils/apiErrorUtil';
import { RootState } from '../store';
import toast from 'react-hot-toast';
import i18n from '../../utils/i18n';
import { accountsPage, indexPage, transactionsPage } from '../../pages/route';
import { API_ERROR_MESSAGES, API_URLS } from '../../constants/api';

export const getToken = (state: RootState): string | undefined => {
    if (state.user && state.user.token) {
        return state.user.token;
    } else {
        return undefined;
    }
};

export const getRefreshToken = (state: RootState): string | undefined => {
    if (state.user && state.user.refreshToken) {
        return state.user.refreshToken;
    } else {
        return undefined;
    }
};

export const getUserData = (state: RootState): User | undefined => {
    if (state.user && state.user.userData) {
        return state.user.userData;
    } else {
        return undefined;
    }
};

export function* callApiWithRefreshToken<T>(
    apiCall: (config: AxiosRequestConfig) => Promise<AxiosResponse<T>>,
    config: AxiosRequestConfig,
): Generator<any, AxiosResponse<T>, AxiosResponse<T> & { data: T }> {
    try {
        const response: AxiosResponse<T> = yield call(apiCall, config);
        return response;
    } catch (error: any) {
        if (error.response) {
            const apiErrorResponse: ErrorDetails = error.response.data;
            const errorMessage = apiErrorResponse.errors[0]?.errorMessage;

            if (error.response && error.response.status === 401 && errorMessage === API_ERROR_MESSAGES.TOKEN_EXPIRED) {  // Unauthorized, when token is expired
                try {
                    yield call(getAuthRefreshTokenSaga);
                    const newToken = yield select(getToken);  // Get the new token

                    if (newToken) {
                        // Retry the original request with the new token
                        config.headers = {
                            ...config.headers,
                            'Authorization': 'Bearer ' + newToken,
                        };
                        const response: AxiosResponse<T> = yield call(apiCall, config);
                        return response;
                    }
                } catch (error) {
                    throw error;
                }
            }
        }

        throw error;
    }
}

export function* getAuthTokenSaga(action : GetAuthTokenStartAction){ 
    const { email, password } = action.payload;

    const config = {
        method: 'POST',
        url: API_URLS.AUTH_TOKEN, // Using the constanturl: API_URLS.AUTH_TOKEN, // Using the constant
        headers: {
            'Authorization': 'Basic ' + (new Buffer(email + ':' + password).toString('base64'))
        }
    }; 
       
    try {
        const { data } = yield axiosNoInterceptor(config);
        yield put(getAuthTokenSuccess(data));
    } catch (error : any) {
        let errors: ErrorDetails;

        if (isAxiosError(error)) {
            errors = handleAxiosError(error);
        } else {
            errors = handleNonAxiosError();
        }

        yield put(getAuthTokenFailure(errors));
    }
}

export function* getAuthRefreshTokenSaga(){ 
    const refreshToken : string = yield select(getRefreshToken);

    const config = {
        method: 'post',
        url: API_URLS.AUTH_REFRESH_TOKEN, // Using the constant
        data: {
            'refreshToken': refreshToken
        }
    }; 
    
    try {
        const { data } = yield axiosInstance(config);
        yield put(getAuthTokenSuccess(data));
    } catch (error : any) {
        let errors: ErrorDetails;

        if (isAxiosError(error)) {
            errors = handleAxiosError(error);
        } else {
            errors = handleNonAxiosError();
        }

        yield put(getAuthTokenFailure(errors));
    }
}

export function* fetchExchangeRateSaga(action : FetchExchangeRateStartAction){ 
    const token : string = yield select(getToken);

    const { amount, debitCurrency, creditCurrency, setValue } = action.payload;

    const config: AxiosRequestConfig = {
        method: 'GET',
        url: API_URLS.EXCHANGE_RATE_AMOUNT,
        headers: {
            Authorization: 'Bearer ' + token,
        },
        params: {
            baseCurrency: debitCurrency,
            targetCurrency: creditCurrency,
            amount: amount,
        },
    };

    try {
        const { data } = yield call(callApiWithRefreshToken, axiosNoInterceptor, config);
        
        if(data && data.result === 'success'){
            setValue('conversionRate', data.conversion_rate);
            setValue('conversionAmount', data.conversion_result);
        }else{
            setValue('conversionRate', '');
            setValue('conversionAmount', '');
        }  
    } catch (error: any) {
        setValue('conversionRate', '');
        setValue('conversionAmount', '');

        let errors: ErrorDetails;

        if (error.response?.status !== 401) {
            if (isAxiosError(error)) {
                errors = handleAxiosError(error);
                toast.error(errors.errors[0].errorMessage);
            }
        }
    }
}

export function* signInSaga(){ 
    const token : string = yield select(getToken);

    const config = {
        method: 'post',
        url: API_URLS.AUTH_LOGIN, // Using the constant
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }; 

    try {
        const { data } = yield call(callApiWithRefreshToken, axiosInstance, config);
        
        if(data){
            yield put(signInSuccess(data as UserResponse));
            toast.success(data?.successMessage)
        }   
    } catch (error) {
        let errors: ErrorDetails;

        if (isAxiosError(error)) {
            errors = handleAxiosError(error);
        } else {
            errors = handleNonAxiosError();
        }

        yield put(signInFailure(errors));
    }
}

export function* googleSignInSaga(action : GoogleSignInStartAction){ 
    const config = {
        method: 'post',
        url: API_URLS.USER_GOOGLE, // Using the constant
        data: action.payload
    }; 
    
    try {
        const { data } = yield axiosInstanceWithAuthNoInterceptor(config);
        yield put(signInSuccess(data as UserResponse));
        toast.success(data?.successMessage)
    } catch (error) {
        let errors: ErrorDetails;

        if (isAxiosError(error)) {
            errors = handleAxiosError(error);
        } else {
            errors = handleNonAxiosError();
        }

        yield put(signInFailure(errors));
    }
}

export function* signOutSaga(){ 
    const userData : User = yield select(getUserData);

    try {
        if(userData.authMethod === "GOOGLE"){
            googleLogout();
        }

        yield put(signOutSuccess());
        toast.success(i18n.t('SignedOutSuccess'));

        sessionStorage.removeItem("form-own-account");
        sessionStorage.removeItem("form-inter-bank");
        sessionStorage.removeItem("form-change-password");
        sessionStorage.removeItem("form-account-settings");
        sessionStorage.removeItem("form-sign-in");
    } catch (error) {
        let errors: ErrorDetails;

        if (isAxiosError(error)) {
            errors = handleAxiosError(error);
        } else {
            errors = handleNonAxiosError();
        }

        yield put(signOutFailure(errors));
    }
}

export function* createTransferSaga(action : AccountTransferStartAction){ 
    const token : string = yield select(getToken);
    const { data, navigate } = action.payload;

    const config = {
        method: 'post',
        url: API_URLS.TRANSFER, // Using the constant
        headers: {
            'Authorization': 'Bearer ' + token
        },
        data: data
    }; 

    try {
        const { data } = yield call(callApiWithRefreshToken, axiosInstance, config);

        if(data){
            yield put(accountTransferSuccess(data as UserResponse));

            // Redirect to transactionsPage
            navigate && navigate(transactionsPage);
            
            toast.success(data?.successMessage, {
                position: 'top-right',
            })

            sessionStorage.removeItem("form-own-account");
            sessionStorage.removeItem("form-inter-bank");
        }        
    } catch (error) {
        let errors: ErrorDetails;

        if (isAxiosError(error)) {
            errors = handleAxiosError(error);
        } else {
            errors = handleNonAxiosError();
        }

        yield put(accountTransferFailure(errors));
    }
}

export function* manageOverdraftSaga(action : ManageOverdraftStartAction){ 
    const token : string = yield select(getToken);
    const { id, data } = action.payload;
    
    const config = {
        method: 'PUT',
        url: API_URLS.ACCOUNT_MANAGE_OVERDRAFT(id), // Using the constant
        headers: {
            'Authorization': 'Bearer ' + token
        },
        data: data
    }; 

    try {
        const { data } = yield call(callApiWithRefreshToken, axiosInstance, config);

        if(data){
            yield put(manageOverdraftSuccess(data as UserResponse));

            toast.success(data?.successMessage, {
                position: 'top-right',
            })
        }
    } catch (error) {
        let errors: ErrorDetails;

        if (isAxiosError(error)) {
            errors = handleAxiosError(error);
        } else {
            errors = handleNonAxiosError();
        }

        yield put(manageOverdraftFailure(errors));
    }
}

export function* changePasswordSaga(action : ChangePasswordStartAction){ 
    const token : string = yield select(getToken);
    const { id, data, navigate } = action.payload;
    
    const config = {
        method: 'PATCH',
        url: API_URLS.USER_CHANGE_PASSWORD(id), // Using the constant
        headers: {
            'Authorization': 'Bearer ' + token
        },
        data: data
    };
    
    try {
        const { data } = yield call(callApiWithRefreshToken, axiosInstance, config);

        if(data){
            yield put(changePasswordSuccess());

            // Redirect to indexPage
            navigate && navigate(indexPage);
    
            toast.success(data?.successMessage)
            sessionStorage.removeItem("form-change-password");
        }
    } catch (error) {
        let errors: ErrorDetails;

        if (isAxiosError(error)) {
            errors = handleAxiosError(error);
        } else {
            errors = handleNonAxiosError();
        }

        yield put(changePasswordFailure(errors));
    }
}

export function* updateUserStartSaga(action : UpdateUserStartAction){ 
    const token : string = yield select(getToken);
    const { id, data, navigate } = action.payload;
    
    const config = {
        method: 'PUT',
        url: API_URLS.USER_UPDATE(id), // Using the constant
        headers: {
            'Authorization': 'Bearer ' + token
        },
        data: data
    };
    
    try {
        const { data } = yield call(callApiWithRefreshToken, axiosInstance, config);

        if(data){
            yield put(updateUserSuccess(data as UserResponse));

            // Redirect to accountsPage
            navigate && navigate(accountsPage);
    
            sessionStorage.removeItem("form-account-settings");
    
            toast.success(data?.successMessage)
        }
    } catch (error) {
        let errors: ErrorDetails;

        if (isAxiosError(error)) {
            errors = handleAxiosError(error);
        } else {
            errors = handleNonAxiosError();
        }

        yield put(updateUserFailure(errors));
    }
}

export function* disableUserStartSaga(action : DisableUserStartAction){ 
    const token : string = yield select(getToken);
    const { id } = action.payload;
    
    const config = {
        method: 'DELETE',
        url: API_URLS.USER_DISABLE(id), // Using the constant
        headers: {
            'Authorization': 'Bearer ' + token
        }
    };
    
    try {
        const { data } = yield call(callApiWithRefreshToken, axiosInstance, config);
        yield put(disableUserSuccess());
        toast.success(data?.successMessage)
    } catch (error) {
        let errors: ErrorDetails;

        if (isAxiosError(error)) {
            errors = handleAxiosError(error);
        } else {
            errors = handleNonAxiosError();
        }

        yield put(disableUserFailure(errors));
    }
}

export function* forgetPasswordStartSaga(action : ForgetPasswordStartAction){ 
    const config = {
        method: 'POST',
        url: API_URLS.PASSWORD_FORGOT, // Using the constant
        data: action.payload
    };

    try {
        const { data } = yield axiosNoInterceptor(config);
        yield put(forgotPasswordSuccess());
        toast.success(data?.successMessage)
    } catch (error) {
        let errors: ErrorDetails;

        if (isAxiosError(error)) {
            errors = handleAxiosError(error);
        } else {
            errors = handleNonAxiosError();
        }

        yield put(forgotPasswordStartFailure(errors));
    }
}

export function* resetPasswordStartSaga(action : ResetPasswordStartAction){ 
    const { data, navigate } = action.payload;

    const config = {
        method: 'POST',
        url: API_URLS.PASSWORD_RESET, // Using the constant
        data: data
    };

    try {
        const { data } = yield axiosInstance(config);
        yield put(resetPasswordSuccess());

        // Redirect to indexPage
        navigate && navigate(indexPage);

        toast.success(data?.successMessage)
    } catch (error) {
        let errors: ErrorDetails;

        if (isAxiosError(error)) {
            errors = handleAxiosError(error);
        } else {
            errors = handleNonAxiosError();
        }

        yield put(resetPasswordStartFailure(errors));
    }
}

export function* onGetAuthTokenStart() {
    yield takeLatest(UserActionTypes.GET_AUTH_TOKEN_START, getAuthTokenSaga);
}

export function* onSignInStart() {
    yield takeLatest(UserActionTypes.GET_AUTH_TOKEN_SUCCESS, signInSaga);
}

export function* onGoogleSignInStart() {
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, googleSignInSaga);
}

export function* onSignOutStart() {
    yield takeLatest(UserActionTypes.SIGN_OUT_START, signOutSaga);
}

export function* onCreateTransferSaga() {
    yield takeLatest(UserActionTypes.ACCOUNT_TRANSFER_START, createTransferSaga);
}

export function* onManageOverdraftSaga() {
    yield takeLatest(UserActionTypes.MANAGE_OVERDRAFT_START, manageOverdraftSaga);
}

export function* onChangePasswordSaga() {
    yield takeLatest(UserActionTypes.CHANGE_PASSWORD_START, changePasswordSaga);
}

export function* onUpdateUserStartSaga() {
    yield takeLatest(UserActionTypes.UPDATE_USER_START, updateUserStartSaga);
}

export function* onDisableUserStartSaga() {
    yield takeLatest(UserActionTypes.DISABLE_USER_START, disableUserStartSaga);
}

export function* onForgotPasswordStartSaga() {
    yield takeLatest(UserActionTypes.FORGET_PASSWORD_START, forgetPasswordStartSaga);
}

export function* onResetPasswordStartSaga() {
    yield takeLatest(UserActionTypes.RESET_PASSWORD_START, resetPasswordStartSaga);
}

export function* onFetchExchangeRateSaga() {
    yield takeLatest(UserActionTypes.FETCH_EXCHANGE_RATE_START, fetchExchangeRateSaga);
}

export function* userSagas() {
    yield all([
        call(onGetAuthTokenStart),
        call(onGoogleSignInStart),
        call(onSignInStart),
        call(onSignOutStart),
        call(onCreateTransferSaga),
        call(onManageOverdraftSaga),
        call(onChangePasswordSaga),
        call(onUpdateUserStartSaga),
        call(onDisableUserStartSaga),
        call(onForgotPasswordStartSaga),
        call(onResetPasswordStartSaga),
        call(onFetchExchangeRateSaga),
    ]); 
}