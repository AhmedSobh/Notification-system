class Notification {
    constructor(user, message, queue) {
        this.user = user;
        this.message = message;
        this.queue = queue;
    }

    sendNotification() {}

    getPayload() {}
}

module.exports = Notification;
