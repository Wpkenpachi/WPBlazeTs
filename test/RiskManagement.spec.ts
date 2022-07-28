import Config from "../src/Config";
import RiskManagement from "../src/RiskManagement";

const config = new Config(2, true, 3, 50, 100, 'aboslute', 'aboslute');

test("Must create a RiskManagement Instance", function () {
    const riskManagement = new RiskManagement();
    expect(riskManagement).toBeTruthy();
    expect(riskManagement.getBalance()).toBe(0);
    expect(riskManagement.config).toBeInstanceOf(Config);
});

test("Must create RiskManagement Instance with balance and config", function () {
    const riskManagement = new RiskManagement(1000, config);
    expect(riskManagement.getBalance()).toBe(1000);
    expect(riskManagement.getEntryAmount()).toBe(2);
    expect(riskManagement.config).toEqual({
        default_entry_amount: 2,
        use_gale: true,
        max_gales: 3,
        max_drawdown: 50,
        max_profit: 100,
        drawdown_type: 'aboslute',
        profit_type: 'aboslute'
    });
});

test("Must increase Balance", function () {
    const riskManagement = new RiskManagement(1000);
    riskManagement.increaseBalance(100);
    expect(riskManagement.getBalance()).toBe(1100);
});

test("Must decrease Balance", function () {
    const riskManagement = new RiskManagement(1000);
    riskManagement.decreaseBalance(100);
    expect(riskManagement.getBalance()).toBe(900);
});

test("Must throw error decreasing Insufficient Balance", function () {
    const riskManagement = new RiskManagement(1000);
    expect(() => riskManagement.decreaseBalance(2000)).toThrowError("No sufficient funds");
});

test("Must calculate entry plus gale", function() {
    const riskManagement = new RiskManagement(1000, config);
    const gale = riskManagement.calculateGale();
    expect(gale).toBe(4);
});

test("Must return 0 calculating entry plus gale after reached max number of gales", function() {
    let cfg = new Config(2, true, 1);
    const riskManagement = new RiskManagement(1000, cfg);
    riskManagement.increaseGale();
    riskManagement.increaseGale();
    expect(riskManagement.calculateGale()).toBe(2);
});

test("Must return gale 0 for use_gale false", function () {
    let cfg = new Config(2, false);
    const riskManagement = new RiskManagement(1000, cfg);
    const gale = riskManagement.calculateGale();
    expect(gale).toBe(2);
});

test("Must increase gale", function() {
    let cfg = new Config(2, true, 1);
    const riskManagement = new RiskManagement(1000, cfg);
    riskManagement.increaseGale();
    expect(riskManagement.getGale()).toBe(1);
});

test("Must not increase gale if reached max number of gales", function () {
    let cfg = new Config(2, true, 1);
    const riskManagement = new RiskManagement(1000, cfg);
    riskManagement.increaseGale();
    riskManagement.increaseGale();
    expect(riskManagement.getGale()).toBe(1);
});