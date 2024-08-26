import { NavigateFunction } from "react-router-dom";
import { User } from "../../redux/user/interface";

export interface UpdateUserRequest {
    name: string
}

export interface UpdateUserOwnProps {
    children?: React.ReactNode;
    userData : User | undefined
}

export interface UpdateUserStateProps {
    
}

export interface UpdateUserDispatchProps {
    setShowModal : () => void;
    updateUserStart : (userId: number, data: UpdateUserRequest, navigate : NavigateFunction) => void;
}

export type UpdateUserProps = UpdateUserOwnProps & UpdateUserStateProps & UpdateUserDispatchProps;