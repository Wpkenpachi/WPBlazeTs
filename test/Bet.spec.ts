import Bet from "../src/Bet";

test("Must create a Bet to WHITE color", function () {
    const bet = new Bet(parseFloat("2.00"), "BRL", 0, false, 1);
    expect(bet).toBeTruthy();
    expect(bet.amount).toBe(2.0);
    expect(bet.color).toBe(0);
    expect(bet.free_bet).toBeFalsy();
    expect(bet.wallet_id).toBe(1);
});