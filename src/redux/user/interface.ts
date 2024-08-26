import { UseFormSetValue, FieldValues } from 'react-hook-form';
import { AuthMethod, TransactionDirection } from '../../constants/api';

export interface UserState extends UserResponse {
    isFetching: boolean,
	errorDetails: ErrorDetails | undefined,
    showModal: boolean
}

export interface UserResponse extends TokenResponse {
    successMessage: string | undefined,
    userData: User | undefined,
}

export interface TokenResponse {
    token: string | undefined,
    refreshToken: string | undefined,
}

export interface User {
    id: number,
    authMethod: AuthMethod,
    enabled: boolean,
    email: string,
    roles: string,
    accounts: Account[]
    transfers: MoneyTransfer[],
    chargeAccounts: Account[] | null,
    accountStatements: AccountStatement[] | null
    familyName: string | null,
    givenName: string | null,
    pictureUrl: string | null,
    emailVerified: boolean,
    externalUserId: string, 
    userType: string,
    name : string | null,
    createdAt: string,
    defaultPassword: boolean,
    deletedAt: string | null,
    lastLoginDate: string | null,
}

export interface Account {
    accountNumber: number,
    accountHolderName?: string,
    balance: number,
    currency: string,
    allowOverdraft: boolean,
    accountCategory: string
    createdAt: string,
    deletedAt: string | null
}

export interface MoneyTransfer {
    id: number,
    transactionId : string,
    amount: number,
    debitCurrency: string,
    creditCurrency: string,
    debitAccount: Account,
    creditAccount: Account,
    notes: string,
    internalAccount: Account | null
    conversionRate : number,
    totalDebitedAmount: number,
    totalCreditedAmount: number,
    chargeAmount: number,
    internalChargeAccount: Account | null
    transactionType: string
    narration: string,
    createdAt: string,
    createdAtFormatted: string,
    deletedAt: string | null
}

export interface AccountStatement extends MoneyTransfer {
    direction: TransactionDirection,
    sign: string,
    balance: number
}

// Define the interface for the structure containing the errors array
export interface ErrorDetails {
    errors: ErrorDetail[];
}

// Define the interface for a single error object
interface ErrorDetail {
    errorMessage: string;
    fieldName: string | null;
}

export interface FetchExchangeRateRequest {
    amount: number;
    debitCurrency: string;
    creditCurrency: string;
    setValue: UseFormSetValue<FieldValues>;
}