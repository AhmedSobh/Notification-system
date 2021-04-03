const redis = require("../services/redisService");

exports.getTime = async (type) => {
    let currentMessagesPerMint = await redis.getAsync(`${type}-currentPerMint`);
    // console.log(currentMessagesPerMint);
    currentMessagesPerMint = currentMessagesPerMint
        ? currentMessagesPerMint
        : 1;
    let time = 0;
    // console.log(this.leftSeconds());
    // console.log(this.getMaxLimitPerMint(type));
    // console.log(currentMessagesPerMint);
    // console.log(currentMessagesPerMint >= this.getMaxLimitPerMint(type));
    //check if the max limit for notification service reached
    if (currentMessagesPerMint >= this.getMaxLimitPerMint(type)) {
        //convert it to milliseconds
        // console.log("enteered here");
        time = this.leftSeconds() * 1000;
    }
    return {
        value: time,
        currentMessagesPerMint,
    };
};

exports.getMaxLimitPerMint = (type) => {
    switch (type) {
        case "sms":
            return process.env.SMS_LIMIT;
        case "pushNotification":
            return process.env.PUSH_LIMIT;
        case "email":
            return process.env.EMAIL_LIMIT;
        default:
            return 10;
    }
};

exports.leftSeconds = () => {
    return 60 - new Date().getSeconds();
};
