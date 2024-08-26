export const API_URLS = {
    CONFIG: '/v1/enums',
    AUTH_TOKEN: '/v1/auth/token',
    AUTH_REFRESH_TOKEN: '/v1/auth/token/refresh',
    AUTH_LOGIN: '/v1/auth/login',
    USER_GOOGLE: '/v1/user/google',
    TRANSFER: '/v1/transfer',
    ACCOUNT_MANAGE_OVERDRAFT: (id: number) => `/v1/account/${id}`,
    USER_GET: (id: number) => `/v1/user/${id}`,
    USER_CHANGE_PASSWORD: (id: number) => `/v1/user/${id}`,
    USER_UPDATE: (id: number) => `/v1/user/${id}`,
    USER_DISABLE: (id: number) => `/v1/user/${id}`,
    PASSWORD_FORGOT: '/v1/password/forgot',
    PASSWORD_RESET: '/v1/password/reset',
    EXCHANGE_RATE_AMOUNT: '/v1/exchange-rate',
};

export const API_ERROR_MESSAGES = {
    TOKEN_INVALID: 'Token is invalid.',
    TOKEN_EXPIRED: 'Token is expired.'
};

export const TRANSACTION_TYPES = {
    OWN_ACCOUNT: 'OWN_ACCOUNT',
    INTER_BANK: 'INTER_BANK'
} as const;

export type TransactionType = typeof TRANSACTION_TYPES[keyof typeof TRANSACTION_TYPES];

export const TRANSACTION_DIRECTION = {
    Receiving: 'Receiving',
    Sending: 'Sending'
} as const;

export type TransactionDirection = typeof TRANSACTION_DIRECTION[keyof typeof TRANSACTION_DIRECTION];

export const AUTH_METHOD = {
    LOCAL: 'LOCAL',
    GOOGLE: 'GOOGLE',
    FACEBOOK: 'FACEBOOK'
} as const;

export type AuthMethod = typeof AUTH_METHOD[keyof typeof AUTH_METHOD];
