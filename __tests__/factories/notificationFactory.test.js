const notificationFactory = require("../../factories/notificationFactory");
const Email = require("../../factories/Email");
const SMS = require("../../factories/SMS");
const PushNotification = require("../../factories/PushNotification");

// const queue = require("../../services/MQService");

test("check notificationFactory instances", () => {
    let user = {
        _id: "606377db90c41234e6e4b5db",
        name: "ghobashy",
        email: "g@g.g",
        phone: "0111111111",
        token: "iqwjqwsasczcasjasqsqsadzxc",
    };

    let message = "this is message 💌";

    expect(notificationFactory.create("sms", user, message)).toBeInstanceOf(
        SMS
    );
    expect(notificationFactory.create("email", user, message)).toBeInstanceOf(
        Email
    );
    expect(
        notificationFactory.create("pushNotification", user, message)
    ).toBeInstanceOf(PushNotification);

    expect(notificationFactory.create("randomText", user, message)).toBe(false);
});
