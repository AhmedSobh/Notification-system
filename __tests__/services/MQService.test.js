const queue = require("../../services/MQService");

describe("publish", () => {
    test("sms queue", async () => {
        expect(await queue.publish("sms-queue", "dataa")).toBe(true);
    });
    test("email queue", async () => {
        expect(await queue.publish("email-queue", "dataa")).toBe(true);
    });
    test("push notification queue", async () => {
        expect(await queue.publish("push-notification-queue", "dataa")).toBe(
            true
        );
    });
});
