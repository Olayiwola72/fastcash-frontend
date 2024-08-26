export interface ErrorOwnProps {
    children?: React.ReactNode;
}

export interface ErrorStateProps {
   errorMessage: string 
}

export type ErrorProps = ErrorOwnProps & ErrorStateProps;