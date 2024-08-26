import { AxiosError } from 'axios';
import { ErrorDetails } from '../redux/user/interface';
import i18n from './i18n';
import toast from 'react-hot-toast';

export function handleFallbackError(errorMessage : string) : ErrorDetails {
    // Fallback error response
    toast.error(errorMessage);

    return {
        errors: [{
            errorMessage: errorMessage,
            fieldName: null,
        }]
    };
}

export function isAxiosError(error: any): error is AxiosError {
    return error.isAxiosError !== undefined;
}

export function handleAuthenticationError(): ErrorDetails {
    return handleFallbackError(i18n.t('AuthenticationErrorOccured'));
}

// Handle cases where error is not an AxiosError
export function handleNonAxiosError(): ErrorDetails {
    return handleFallbackError(i18n.t('UnexpectedErrorOccured'));
}

// Handle Axios errors
export function handleAxiosError(error: AxiosError): ErrorDetails {
    if (error.response && error.response.data) {
        // Type assertion to inform TypeScript about the expected structure of error.response.data
        const data = error.response.data as ErrorDetails;

        if (data.errors) {
            return {
                errors: data.errors,
            };
        }
    }

    // Fallback error response
    return handleFallbackError(i18n.t('UnexpectedErrorOccured'));
}
