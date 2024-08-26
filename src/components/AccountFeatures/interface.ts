import { Account, User } from "../../redux/user/interface";

export interface AccountFeaturesOwnProps {
    userData: User | undefined;
    accounts : Account[];
    children?: React.ReactNode;
}

export interface AccountFeaturesStateProps {
    
}

export interface ManageOverdraftRequest {
    allowOverdraft: Boolean;
}

export interface AccountFeaturesDispatchProps {
    setShowModal : () => void;
}

export type AccountFeaturesProps = AccountFeaturesOwnProps & AccountFeaturesStateProps & AccountFeaturesDispatchProps;