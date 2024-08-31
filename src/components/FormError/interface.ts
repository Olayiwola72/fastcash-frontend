import { FieldErrors } from "react-hook-form";

export interface FormErrorOwnProps {
    children?: React.ReactNode;
    className?: string;
    errors: FieldErrors;
    field: string;
    fieldName: string;
    value?: string;
}

export interface FormErrorStateProps {
    
}

export type FormErrorProps = FormErrorOwnProps & FormErrorStateProps;