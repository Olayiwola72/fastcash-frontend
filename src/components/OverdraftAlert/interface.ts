import { Account } from "../../redux/user/interface";

export interface OverdraftAlertOwnProps {
    children?: React.ReactNode;
    account: Account | undefined;
}

export interface OverdraftAlertStateProps {
  
}

export interface OverdraftAlertDispatchProps {
    setShowModal: () => void;
}

export type OverdraftAlertProps = OverdraftAlertOwnProps & OverdraftAlertStateProps & OverdraftAlertDispatchProps;