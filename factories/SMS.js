const Notification = require("./Notification");
const {
    QUEUES: { SMS_QUEUE },
} = require("../utils/constants");

class SMS extends Notification {
    constructor(user, message, queue) {
        super(user, message, queue);
    }
    async sendNotification() {
        return await this.queue.publish(SMS_QUEUE.key, this.getPayload());
    }

    getPayload() {
        return JSON.stringify({
            data: {
                recipient: this.user.phone,
                message: this.message,
            },
            type: "sms",
        });
    }
}

module.exports = SMS;
