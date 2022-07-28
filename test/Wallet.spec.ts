import Wallet from "../src/Wallet";

test("Must create a Wallet", function() {
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
    expect(wallet).toBeTruthy();
    expect(wallet.balance).toBe(0.05);
    expect(wallet.bonus_balance).toBe(0);
    expect(wallet.real_balance).toBe(0.05);
});