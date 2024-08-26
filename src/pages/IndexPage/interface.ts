import { User } from "../../redux/user/interface";

export interface IndexOwnProps {
    children?: React.ReactNode;
}

export interface IndexStateProps {
    userData?: User;
}

export type IndexProps = IndexOwnProps & IndexStateProps;