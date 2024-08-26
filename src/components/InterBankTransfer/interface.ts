import { NavigateFunction } from "react-router-dom";
import { OwnAccountTransferOwnProps, OwnAccountTransferRequest, OwnAccountTransferStateProps } from "../OwnAccountTransfer/interface";
import { FetchExchangeRateRequest } from "../../redux/user/interface";

export interface InterBankTransferOwnProps extends OwnAccountTransferOwnProps {

}

export interface InterBankTransferRequest extends OwnAccountTransferRequest {
    accountHolderName: string,
    bankName: string
}

export interface InterBankTransferStateProps extends OwnAccountTransferStateProps {

}

export interface InterBankTransferDispatchProps {
    accountTransferStart: (payload : InterBankTransferRequest, navigate : NavigateFunction) => void;
    fetchExchangeRateStart: (payload: FetchExchangeRateRequest) => void;
}

export type InterBankTransferProps = InterBankTransferOwnProps & InterBankTransferStateProps & InterBankTransferDispatchProps;