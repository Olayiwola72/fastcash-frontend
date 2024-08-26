export interface SideBarOwnProps {
    children?: React.ReactNode;
}

export interface SideBarStateProps {

}

export interface SideBarDispatchProps {
    signOutStart: () => void;
    removeSuccessMessage: () => void;
    removeErrorMessage: () => void;
}

export type SideBarProps = SideBarOwnProps & SideBarStateProps & SideBarDispatchProps;