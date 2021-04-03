const SMS = require("../../factories/SMS");

test("SMS class", async () => {
    let user = {
        _id: "606377db90c41234e6e4b5db",
        name: "ghobashy",
        email: "g@g.g",
        phone: "0111111111",
        token: "iqwjqwsasczcasjasqsqsadzxc",
    };

    let message = "this is SMS 💌";

    let queue = {
        publish() {
            return true;
        },
    };

    const sms = new SMS(user, message, queue);
    expect(await sms.sendNotification()).toBe(true);
});
