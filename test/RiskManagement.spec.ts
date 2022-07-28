import RiskManagement from "../src/RiskManagement";

test("Must create a RiskManagement Instance", function () {
    const riskManagement = new RiskManagement();
    expect(riskManagement).toBeTruthy();
    expect(riskManagement.balance).toBe(0);
    expect(riskManagement.config).toEqual({
        use_gale: false,
        max_gales: null,
        max_drawdown: null,
        max_profit: null,
        drawdown_type: null,
        profit_type: null
    });
});

test("Must create RiskManagement Instance with balance and config", function () {
    const riskManagement = new RiskManagement(1000, {
        use_gale: true,
        max_gales: 3,
        max_drawdown: 50,
        max_profit: 100,
        drawdown_type: 'aboslute',
        profit_type: 'aboslute'
    });
    expect(riskManagement).toBeTruthy();
    expect(riskManagement.balance).toBe(1000);
    expect(riskManagement.config).toEqual({
        use_gale: true,
        max_gales: 3,
        max_drawdown: 50,
        max_profit: 100,
        drawdown_type: 'aboslute',
        profit_type: 'aboslute'
    });
});