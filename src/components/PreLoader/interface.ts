export interface PreLoaderOwnProps {
    children?: React.ReactNode;
    className?: string;
    isLoading?: boolean;
}

export interface PreLoaderStateProps {
    isFetching: boolean;
}

export type PreLoaderProps = PreLoaderOwnProps & PreLoaderStateProps;