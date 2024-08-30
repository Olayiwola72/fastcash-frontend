import { MoneyTransfer, User } from "../../redux/user/interface";

export interface DashboardComponentOwnProps {
    children?: React.ReactNode;
    transfers: MoneyTransfer[];
    userData: User | undefined;
}

export interface DashboardComponentStateProps {

}

export interface DashboardComponentDispatchProps {

}

export type DashboardComponentProps = DashboardComponentOwnProps & DashboardComponentStateProps & DashboardComponentDispatchProps;