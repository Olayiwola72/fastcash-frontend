import { Account, User } from "../../redux/user/interface";
import { ManageOverdraftRequest } from "../AccountFeatures/interface";

export interface MyModalOwnProps {
    children?: React.ReactNode;
    currentAccount? : Account;
    userData? : User
}

export interface MyModalStateProps {
    showModal: boolean;
}

export interface MyModalDispatchProps {
    removeShowModal : () => void;
    manageOverdraftStart : (id : number, payload : ManageOverdraftRequest) => void;
    disableUserStart : (id : number) => void;
}

export type MyModalProps = MyModalOwnProps & MyModalStateProps & MyModalDispatchProps;