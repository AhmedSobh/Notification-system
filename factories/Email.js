const Notification = require("./Notification");
const {
    QUEUES: { EMAIL_QUEUE },
} = require("../utils/constants");

class Email extends Notification {
    constructor(user, message, queue) {
        super(user, message, queue);
    }
    async sendNotification() {
        return await this.queue.publish(EMAIL_QUEUE.key, this.getPayload());
    }

    getPayload() {
        return JSON.stringify({
            data: {
                Subject: "Alert",
                to: this.user.email,
                message: this.message,
            },
            type: "email",
        });
    }
}

module.exports = Email;
