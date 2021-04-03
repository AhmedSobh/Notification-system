const amqp = require("amqplib");
const dotenv = require("dotenv");
const utils = require("./workerUtility");
const redis = require("../services/redisService");
const { QUEUES } = require("../utils/constants");
dotenv.config();
// todo: make key validation before consume if reached limit then return and get rid of time out
console.log("started");
const CONN_URL = process.env.AMQP_URL;

(async () => {
    let conn = await amqp.connect(CONN_URL);
    let ch = await conn.createChannel();
    ch.prefetch(1);
    for (let queue of Object.values(QUEUES)) {
        runConsumer(ch, queue);
    }
})();

const runConsumer = (channel, queue) => {
    return channel.consume(
        queue.key,
        async function (msg) {
            try {
                let time = await utils.getTime(queue.type);
                await redis.setAsync(
                    `${queue.type}-currentPerMint`,
                    ++time.currentMessagesPerMint,
                    "EX",
                    utils.leftSeconds()
                );
                setTimeout(() => channel.ack(msg), time.value);
            } catch (error) {
                console.log(error);
            }
        },
        {
            noAck: false,
            consumerTag: queue.key,
        }
    );
};

module.exports = { runConsumer };
