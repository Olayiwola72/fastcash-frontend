import React from "react";
import { MapDispatchToPropsFunction, connect } from 'react-redux';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { Dispatch } from 'redux';
import { removeErrorMessage, setErrorMessage, googleSignInStart } from '../../redux/user/user.actions';
import { GoogleOAuthProps, GoogleOAuthOwnProps, GoogleOAuthDispatchProps } from './interface';
import { useTranslation } from 'react-i18next';
import './style.scss';

const GoogleOAuth : React.FC<GoogleOAuthProps> = ({ googleSignInStart, setErrorMessage }) => {
    const { t } = useTranslation();

    const handleSuccess = (response: CredentialResponse) => {
        googleSignInStart(response);
    };
    
    const handleError = (error: void) => {
        console.warn(error)
        setErrorMessage(t('UnexpectedErrorOccured'));
    };

    return (
        <div className="google-login-container mb-4 mt-4 w-100">
            <GoogleLogin
                onSuccess={handleSuccess} 
                onError={handleError}
                theme="outline"
                text = "continue_with"
                shape="rectangular"
                size="large"
                width="750"
                type="standard"
                logo_alignment="left"
            />
        </div>
    )
}

const mapDispatchToProps : MapDispatchToPropsFunction<GoogleOAuthDispatchProps, GoogleOAuthOwnProps> = (dispatch: Dispatch) => ({
    removeErrorMessage : () => dispatch(removeErrorMessage()),
    setErrorMessage: (errorMessage : string) => dispatch(setErrorMessage(errorMessage)),
    googleSignInStart: (response : CredentialResponse) => dispatch(googleSignInStart(response))
});
  
export default connect(null, mapDispatchToProps)(GoogleOAuth);
