const Email = require("../../factories/Email");

test("Email class", async () => {
    let user = {
        _id: "606377db90c41234e6e4b5db",
        name: "ghobashy",
        email: "g@g.g",
        phone: "0111111111",
        token: "iqwjqwsasczcasjasqsqsadzxc",
    };

    let message = "this is Email 💌";

    let queue = {
        publish() {
            return true;
        },
    };

    const email = new Email(user, message, queue);
    expect(await email.sendNotification()).toBe(true);
});
