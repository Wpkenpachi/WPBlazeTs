export default class Bet {
    constructor(
        readonly amount: number,
        readonly currency_type: string,
        readonly color: number,
        readonly free_bet: boolean,
        readonly wallet_id: number
    ) {}
}