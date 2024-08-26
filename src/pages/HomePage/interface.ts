import { User } from "../../redux/user/interface";

export interface HomeOwnProps {
    children?: React.ReactNode;
}

export interface HomeStateProps {
    userData: User | undefined;
}

export interface HomeDispatchProps {

}

export type HomeProps = HomeOwnProps & HomeStateProps & HomeDispatchProps;