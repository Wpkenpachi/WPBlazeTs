import Bet from "../src/Bet";
import Wallet from "../src/Wallet";

test("Must create a Bet to WHITE color", function () {
    const wallet = new Wallet(32447855, true, parseFloat("0.0500"), parseFloat("0.0000"), parseFloat("0.0500"), "BRL", {
        "type": null,
        "name": null,
        "symbol": null
    },
    {
        "type": "BRL",
        "name": "Brazilian Real",
        "symbol": "R$",
        "fiat": true
    });
    const bet = new Bet(parseFloat("2.00"), "BRL", 0, false, wallet.id);
    expect(bet).toBeTruthy();
    expect(bet.amount).toBe(2.0);
    expect(bet.color).toBe(0);
    expect(bet.free_bet).toBeFalsy();
    expect(bet.wallet_id).toBe(32447855);
});