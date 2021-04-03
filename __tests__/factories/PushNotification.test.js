const PushNotification = require("../../factories/PushNotification");

test("PushNotification class", async () => {
    let user = {
        _id: "606377db90c41234e6e4b5db",
        name: "ghobashy",
        email: "g@g.g",
        phone: "0111111111",
        token: "iqwjqwsasczcasjasqsqsadzxc",
    };

    let message = "this is Push notification 💌";

    let queue = {
        publish() {
            return true;
        },
    };

    const pushNotification = new PushNotification(user, message, queue);
    expect(await pushNotification.sendNotification()).toBe(true);
});
