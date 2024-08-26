import { FieldError, Merge, FieldErrorsImpl } from "react-hook-form";

export interface TogglePasswordOwnProps {
    showPassword: boolean
    toggleShowPassword: () => void;
    errorMessage: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined
}

export type TogglePasswordProps = TogglePasswordOwnProps;