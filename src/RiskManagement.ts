import Config from "./Config";

export default class RiskManagement {
    private balance: number = 0;
    private entry_amount: number = 2;
    private current_gale: number = 0;
    private current_drawdown: number = 0;

    constructor(readonly initial_balance: number = 0, public config: Config = new Config()){
        this.balance = initial_balance;
        this.entry_amount = this.config.default_entry_amount;
    }

    public calculateEntryAmount(): void {
        if (!this.config!.use_gale) return;
        if (this.hasReachedMaxGales()) {
            this.entry_amount = this.config.default_entry_amount;
            return;
        }
        this.entry_amount *= 2;
        this.increaseGale();
    }

    public pay(): void {
        if (!this.hasSufficientFunds()) throw new Error("No sufficient funds");
        if (this.hasReachedMaxDrawdown()) throw new Error("Max Drawdown Reached")
        this.balance -= this.entry_amount;
        this.increaseGale();
    }

    public receive(factor: number = 2): void {
        this.balance += this.entry_amount * factor;
        this.resetGale();
    }

    public increaseDrawdown(value: number): void {
        this.current_drawdown += value;
    }

    private hasSufficientFunds(): boolean {
        return this.balance > this.entry_amount;
    }

    private resetGale(): void {
        this.entry_amount = this.config.default_entry_amount;
    }

    private hasReachedMaxGales(): boolean {
        return this.current_gale >= this.config!.max_gales;
    }

    public getBalance(): number {
        return this.balance;
    }

    public getEntryAmount(): number {
        return this.entry_amount;
    }

    public getGale(): number {
        return this.current_gale;
    }

    public getDrawdown(): number {
        return this.current_drawdown;
    }

    private increaseGale(): void {
        if (this.current_gale >= this.config.max_gales) return;
        this.current_gale += 1;
    }

    private calculateDrawdownPercentage(): number {
        return this.current_drawdown / this.initial_balance * 100; 
    }

    private hasReachedMaxDrawdown(): boolean {
        if (this.config.max_drawdown === 0) return false;
        const aboslute_drawdown = this.config.drawdown_type == 'relative' ? this.calculateDrawdownPercentage() : this.current_drawdown;
        if (aboslute_drawdown >= this.config.max_drawdown) return true;
        return false;
    }
}