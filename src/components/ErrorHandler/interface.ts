import { ErrorDetails } from "../../redux/user/interface";

export interface ErrorHandlerOwnProps {
    children?: React.ReactNode;
    className?: string;
}

export interface ErrorHandlerStateProps {
    isFetching: boolean;
    errorDetails: ErrorDetails | undefined
}

export type ErrorHandlerProps = ErrorHandlerOwnProps & ErrorHandlerStateProps;