import { Account } from "../../redux/user/interface";

export interface SubHeaderComponentOwnProps {
    children?: React.ReactNode;
    accounts: Account[];
    filterText: string;
    filterAccount?: Account;
    setFilterText: (text: string) => void;
    setFilterAccount: (account?: Account) => void;
    resetPaginationToggle: boolean;
    setResetPaginationToggle: (toggle: boolean) => void;
}

export type SubHeaderComponentProps = SubHeaderComponentOwnProps;