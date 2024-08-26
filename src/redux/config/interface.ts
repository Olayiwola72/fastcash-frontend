export interface ConfigState extends Config {}

export interface Config {
    todayDate: string | undefined;
    currencies: CurrencyResponse[] | undefined;
    providers: string[] | undefined;
    transactionTypes: string[] | undefined
}

export interface CurrencyResponse {
    name: string,
    buyRate: number
}