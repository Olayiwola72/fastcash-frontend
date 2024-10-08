import { NavigateFunction } from "react-router-dom";
import { Account, ErrorDetails, FetchExchangeRateRequest, User } from "../../redux/user/interface";
import { CurrencyResponse } from "../../redux/config/interface";
import { TransactionType } from "../../constants/api";

export interface OwnAccountTransferOwnProps {
    accounts : Account[];
    userData: User | undefined;
    children?: React.ReactNode;
}

export interface OwnAccountTransferRequest {
    transactionType : TransactionType
    debitAccount: number | undefined,
    amount: number | undefined,
    debitCurrency: string,
    creditCurrency: string,
    creditAccount: number | undefined,
    conversionRate: number,
    conversionAmount: number,
    notes: string    
}

export interface OwnAccountTransferStateProps {
    currencies: CurrencyResponse[] | undefined;
    errorDetails: ErrorDetails | undefined;
}

export interface OwnAccountTransferDispatchProps {
    accountTransferStart: (payload : OwnAccountTransferRequest, navigate : NavigateFunction) => void;
    fetchExchangeRateStart: (payload: FetchExchangeRateRequest) => void;
}

export type OwnAccountTransferProps = OwnAccountTransferOwnProps & OwnAccountTransferStateProps & OwnAccountTransferDispatchProps;