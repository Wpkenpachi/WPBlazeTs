import Config from "./Config";

export default class RiskManagement {
    private balance: number = 0;
    private entry_amount: number = 2;
    private current_gale: number = 0;

    constructor(readonly initial_balance: number = 0, public config: Config = new Config()){
        this.balance = initial_balance;
        this.entry_amount = this.config.default_entry_amount;
    }

    private reachedMaxGales(): boolean {
        return this.current_gale >= this.config!.max_gales;
    }

    public calculateGale(): number {
        if (!this.config!.use_gale) return this.entry_amount;
        if (this.reachedMaxGales()) return this.entry_amount;
        return this.entry_amount * 2;
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

    public increaseGale(): void {
        if (this.current_gale >= this.config.max_gales) return;
        this.current_gale += 1;
    }

    public increaseBalance(value: number): void {
        this.balance += value;
    }

    public decreaseBalance(value: number): void {
        if (this.balance < value) throw new Error("No sufficient funds");
        this.balance -= value;
    }
}