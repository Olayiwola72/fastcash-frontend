import { Account, MoneyTransfer, User } from "../../redux/user/interface";

export interface RecentTransactionsOwnProps {
    children?: React.ReactNode;
    transfers: MoneyTransfer[];
    userData: User | undefined; 
    accounts : Account[]
}

export interface RecentTransactionsStateProps {
    
}

export interface MoneyTransferDataRow extends MoneyTransfer {
    direction: string;
    sign : string;
    account: Account
}

export type RecentTransactionsProps = RecentTransactionsOwnProps & RecentTransactionsStateProps;