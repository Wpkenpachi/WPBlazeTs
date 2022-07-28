export default class Wallet {
    constructor(
        readonly id: number,
        readonly primary: boolean,
        readonly balance: number,
        readonly bonus_balance: number,
        readonly real_balance: number,
        readonly currency_type: string,
        readonly deposit_currency: DepositCurrency,
        readonly currency: Currency
    ) {}
}

type DepositCurrency = {
    "type": string | null;
    "name": string | null;
    "symbol": string | null;
}

type Currency = {
    type: string;
    name: string;
    symbol: string;
    fiat: boolean;
}