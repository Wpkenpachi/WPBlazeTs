import Account from "../src/Account";

test("Must create an account with balance zero", function () {
    const account = new Account("Wesley Paulo");
    expect(account.username).toBe("Wesley Paulo");
    expect(account.balance).toBe(0);
});

test("Must create an account with balance 1000", function () {
    const account = new Account("Wesley Paulo", 1000);
    expect(account.username).toBe("Wesley Paulo");
    expect(account.balance).toBe(1000);
});