const queue = require("../../workers/notificationWorker");
const amqp = require("amqplib");
const dotenv = require("dotenv");

dotenv.config();
const CONN_URL = process.env.AMQP_URL;

describe("Consumer", () => {
    let ch = null;
    beforeEach(async () => {
        let conn = await amqp.connect(CONN_URL);
        ch = await conn.createChannel();
        sms = { key: "sms-queue", type: "sms" };
        email = { key: "email-queue", type: "email" };
        pushNotification = {
            key: "push-notification-queue",
            type: "pushNotification",
        };

        ch.prefetch(1);
    });
    test("consume from sms queue", async () => {
        expect(await queue.runConsumer(ch, sms)).toEqual({
            consumerTag: "sms-queue",
        });
    });

    test("consume from email queue", async () => {
        expect(await queue.runConsumer(ch, email)).toEqual({
            consumerTag: "email-queue",
        });
    });

    test("consume from notification queue", async () => {
        expect(await queue.runConsumer(ch, pushNotification)).toEqual({
            consumerTag: "push-notification-queue",
        });
    });
});
