import { User } from "../../redux/user/interface";

export interface HeaderOwnProps {
    children?: React.ReactNode;
}

export interface HeaderStateProps {
    userData?: User;
}

export interface HeaderDispatchProps {
    signOutStart: () => void;
}

export type HeaderProps = HeaderOwnProps & HeaderStateProps & HeaderDispatchProps;