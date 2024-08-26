import { CredentialResponse } from "@react-oauth/google";

export interface GoogleOAuthOwnProps {
    children?: React.ReactNode;
}

export interface GoogleOAuthStateProps {
    
}

export interface GoogleOAuthDispatchProps {
    removeErrorMessage: () => void;
    setErrorMessage: (errorMessage : string) => void;
    googleSignInStart: (response : CredentialResponse) => void;
}

export type GoogleOAuthProps = GoogleOAuthOwnProps & GoogleOAuthStateProps & GoogleOAuthDispatchProps;