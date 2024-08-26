export interface SignInOwnProps {
    children?: React.ReactNode;
}

export interface SignInStateProps {
    
}

export interface SignInRequest {
    email: string,
    password: string
}

export interface SignInDispatchProps {
    getAuthTokenStart: (data : SignInRequest) => void;
    removeErrorMessage: () => void;
}

export type SignInProps = SignInOwnProps & SignInStateProps & SignInDispatchProps;