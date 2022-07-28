import Config from "../src/Config"

test("Must create an Config", function() {
    const config = new Config();
    expect(config).toBeTruthy();
})