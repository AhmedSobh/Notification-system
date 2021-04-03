const notificationFactory = require("../factories/NotificationFactory");
const userModel = require("../models/userModel");

const sendHandler = async (req, res) => {
    try {
        const { users, message, type } = req.body;

        if (!users || !message || !type)
            res.status(403).json({
                message: "One or more required fields not provided",
            });
        await send(type, users, message);

        res.status(200).json({
            message: "Your notifcations enqueued successfully",
        });
    } catch (error) {
        res.status(400).json({ message: "Something went wrong" });
    }
};

const send = async (type, users, message) => {
    for (let i = 0; i < users.length; i++) {
        let user = await userModel.findById(users[i]);
        const notification = notificationFactory.create(type, user, message);
        await notification.sendNotification();
    }
};

module.exports = { sendHandler, send };
