import { Account, AccountStatement, User } from "../../redux/user/interface";

export interface TransactionHistoryOwnProps {
    children?: React.ReactNode;
    accountStatements: AccountStatement[];
    userData: User | undefined;
    accounts : Account[];
}

export interface TransactionHistoryStateProps {

}

export interface AccountStatementDataRow extends AccountStatement {
    account: Account
}

export type TransactionHistoryProps = TransactionHistoryOwnProps & TransactionHistoryStateProps;