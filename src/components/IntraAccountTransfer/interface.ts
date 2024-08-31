import { NavigateFunction } from "react-router-dom";
import { OwnAccountTransferOwnProps, OwnAccountTransferRequest, OwnAccountTransferStateProps } from "../OwnAccountTransfer/interface";
import { FetchExchangeRateRequest } from "../../redux/user/interface";

export interface IntraBankTransferOwnProps extends OwnAccountTransferOwnProps {

}

export interface IntraBankTransferRequest extends OwnAccountTransferRequest {
    
}

export interface IntraBankTransferStateProps extends OwnAccountTransferStateProps {

}

export interface IntraBankTransferDispatchProps {
    accountTransferStart: (payload : IntraBankTransferRequest, navigate : NavigateFunction) => void;
    fetchExchangeRateStart: (payload: FetchExchangeRateRequest) => void;
}

export type IntraBankTransferProps = IntraBankTransferOwnProps & IntraBankTransferStateProps & IntraBankTransferDispatchProps;