export default class RiskManagement {
    constructor(public balance: number = 0, public config?: Config){
        this.config = config ? config : this.getDefaultConfig();
    }

    private getDefaultConfig() {
        return {
            use_gale: false,
            max_gales: null,
            max_drawdown: null,
            max_profit: null,
            drawdown_type: null,
            profit_type: null
        };
    }
}

type ValueType = 'aboslute' | 'relative';
type Config = {
    use_gale: boolean;
    max_gales: number | null;
    max_drawdown: number | null;
    max_profit: number | null;
    drawdown_type: ValueType | null;
    profit_type: ValueType | null;
}