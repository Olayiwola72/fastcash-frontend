export interface LogoOwnProps {
    children?: React.ReactNode;
    width: string;
    className?: string
}

export interface LogoStateProps {

}

export interface LogoDispatchProps {
    removeErrorMessage: () => void;
}

export type LogoProps = LogoOwnProps & LogoStateProps & LogoDispatchProps;