type ValueType = 'aboslute' | 'relative';
export default class Config {
    constructor(
        readonly default_entry_amount: number = 2,
        readonly use_gale: boolean = false,
        readonly max_gales: number = 0,
        readonly max_drawdown: number = 0,
        readonly max_profit: number = 0,
        readonly drawdown_type: ValueType = 'aboslute',
        readonly profit_type: ValueType = 'aboslute'
    ){}
}