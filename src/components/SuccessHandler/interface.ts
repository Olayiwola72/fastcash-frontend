export interface SuccessHandlerOwnProps {
    children?: React.ReactNode;
    className?: string;
}

export interface SuccessHandlerStateProps {
    isFetching: boolean;
    successMessage: string | undefined
}

export type SuccessHandlerProps = SuccessHandlerOwnProps & SuccessHandlerStateProps;