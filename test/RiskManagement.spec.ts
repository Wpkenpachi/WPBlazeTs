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

test("Must pay", function() {
    const config = new Config(2, false);
    const riskManagement = new RiskManagement(10, config);
    riskManagement.pay()
    expect(riskManagement.getBalance()).toBe(8);
});

test("Must throw No funds", function() {
    const config = new Config(20, false);
    const riskManagement = new RiskManagement(10, config);
    expect(() => riskManagement.pay()).toThrowError("No sufficient funds");
});

test("Must throw absolute Drawdown Reached", function() {
    const config = new Config(5, false, 0, 5);
    const riskManagement = new RiskManagement(10, config);
    riskManagement.increaseDrawdown(5);
    expect(() => riskManagement.pay()).toThrowError("Max Drawdown Reached");
});

test("Must throw relative Drawdown Reached", function() {
    const config = new Config(5, false, 0, 10, 0, 'relative');
    const riskManagement = new RiskManagement(10, config);
    riskManagement.increaseDrawdown(10);
    expect(() => riskManagement.pay()).toThrowError("Max Drawdown Reached");
});

test("Must pay with Max Drawdown set", function() {
    const config = new Config(5, false, 0, 10, 0, 'relative');
    const riskManagement = new RiskManagement(100, config);
    riskManagement.increaseDrawdown(5);
    expect(() => riskManagement.pay()).not.toThrowError();
});

test("Must receive", function() {
    const config = new Config(2);
    const riskManagement = new RiskManagement(1000, config);
    riskManagement.receive();
    expect(riskManagement.getBalance()).toBe(1004);
});

test("Must return gale", function() {
    const config = new Config(2);
    const riskManagement = new RiskManagement(1000, config);
    expect(riskManagement.getGale()).toBe(0);
});

test("Must return drawdown", function() {
    const config = new Config(2);
    const riskManagement = new RiskManagement(1000, config);
    riskManagement.increaseDrawdown(5);
    expect(riskManagement.getDrawdown()).toBe(5);
});

test("Must calculate entry amount without gale", function() {
    const config = new Config(2, false, 2);
    const riskManagement = new RiskManagement(1000, config);
    riskManagement.calculateEntryAmount();
    expect(riskManagement.getEntryAmount()).toBe(2);
});

test("Must calculate entry amount reaching max gales", function() {
    const config = new Config(2, true, 2);
    const riskManagement = new RiskManagement(1000, config);
    riskManagement.pay();
    riskManagement.pay();
    riskManagement.pay();
    riskManagement.calculateEntryAmount();
    expect(riskManagement.getEntryAmount()).toBe(2);
});

test("Must calculate entry amount", function() {
    const config = new Config(2, true, 2);
    const riskManagement = new RiskManagement(1000, config);
    riskManagement.calculateEntryAmount();
    expect(riskManagement.getEntryAmount()).toBe(4);
});

test("Must increase gales", function() {
    const config = new Config(2, true, 2);
    const riskManagement = new RiskManagement(1000, config);
    riskManagement.pay();
    riskManagement.pay();
    expect(riskManagement.getGale()).toBe(2);
});