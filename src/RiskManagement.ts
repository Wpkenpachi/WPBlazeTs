export default class RiskManagement {
    private balance: number = 0;
    constructor(readonly initial_balance: number = 0, public config?: Config){
        this.balance = initial_balance;
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

    public getBalance(): number {
        return this.balance;
    }

    public increaseBalance(value: number): void {
        this.balance += value;
    }

    public decreaseBalance(value: number): void {
        if (this.balance < value) throw new Error("No sufficient funds");
        this.balance -= value;
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