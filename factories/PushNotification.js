const Notification = require("./Notification");
const {
    QUEUES: { PUSH_QUEUE },
} = require("../utils/constants");
class PushNotification extends Notification {
    constructor(user, message, queue) {
        super(user, message, queue);
    }
    async sendNotification() {
        return await this.queue.publish(PUSH_QUEUE.key, this.getPayload());
    }

    getPayload() {
        return JSON.stringify({
            data: {
                title: "Alert",
                token: this.user.token,
                sound: "default",
                mutablecontent: true,
                message: this.message,
            },
            type: "pushNotification",
        });
    }
}

module.exports = PushNotification;
