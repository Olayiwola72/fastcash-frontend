import { NavigateFunction } from "react-router-dom";
import { User } from "../../redux/user/interface";

export interface ChangePasswordRequest {
    password: string
}

export interface ChangePasswordOwnProps {
    children?: React.ReactNode;
    userData : User | undefined
}

export interface ChangePasswordStateProps {
    
}

export interface ChangePasswordDispatchProps {
    changePasswordStart : (userId: number, data: ChangePasswordRequest, navigate : NavigateFunction) => void;
}

export type ChangePasswordProps = ChangePasswordOwnProps & ChangePasswordStateProps & ChangePasswordDispatchProps;