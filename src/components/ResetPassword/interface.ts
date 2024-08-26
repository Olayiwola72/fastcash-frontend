import { NavigateFunction } from "react-router-dom";

export interface ResetPasswordOwnProps {
    children?: React.ReactNode;
}

export interface ResetPasswordStateProps {
    
}

export interface ForgotPasswordRequest {
    email: string,
}

export interface ResetPasswordRequest {
    password: string,
    token: string
}

export type PasswordRequest = ForgotPasswordRequest | ResetPasswordRequest;

export interface ResetPasswordDispatchProps {
    forgotPasswordStart: (data : ForgotPasswordRequest) => void;
    resetPasswordStart: (data : ResetPasswordRequest, navigate : NavigateFunction) => void;
}

export type ResetPasswordProps = ResetPasswordOwnProps & ResetPasswordStateProps & ResetPasswordDispatchProps;