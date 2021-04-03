const Email = require("./Email");
const SMS = require("./SMS");
const PushNotification = require("./PushNotification");
const queue = require("../services/MQService");

class NotificationFactory {
    create(type, user, message) {
        switch (type) {
            case "email":
                return new Email(user, message, queue);
            case "sms":
                return new SMS(user, message, queue);
            case "pushNotification":
                return new PushNotification(user, message, queue);
            default:
                return false;
        }
    }
}

module.exports = new NotificationFactory();
