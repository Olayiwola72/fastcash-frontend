import { Config } from "../../redux/config/interface";
import { ConfigActionTypes } from "../../redux/config/config.types";
import { User } from "../../redux/user/interface";

export interface LayoutOwnProps {
    children?: React.ReactNode;
}

export interface LayoutStateProps {
    userData: User | undefined;
    isFetching: boolean,
}

export interface LayoutDispatchProps {
    removeErrorMessage: () => void;
    getConfigSuccess: (data: Config) => { type: ConfigActionTypes.GET_CONFIG_SUCCESS; payload: Config; };
    getUserSuccess: (data: User) => void;
    getUserFailure: () => void;
    signOutSuccess: () => void;
}

export type LayoutProps = LayoutOwnProps & LayoutStateProps & LayoutDispatchProps;