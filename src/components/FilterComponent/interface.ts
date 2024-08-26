export interface FilterComponentOwnProps {
    children?: React.ReactNode;
    filterText: string;
    filterKeyTitle: string;
    onFilter: (event : React.ChangeEvent<HTMLInputElement>) => void;
    onClear: () => void;
}

export interface FilterComponentStateProps {
    
}

export type FilterComponentProps = FilterComponentOwnProps & FilterComponentStateProps;