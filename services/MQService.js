const amqp = require("amqplib");
const dotenv = require("dotenv");
dotenv.config();

const CONN_URL = process.env.AMQP_URL;

var ch = null;

async function getChannel() {
    if (!ch) {
        let conn = await amqp.connect(CONN_URL);
        ch = await conn.createChannel();
    }
    return ch;
}

exports.publish = async (queueName, data) => {
    return (await getChannel()).sendToQueue(queueName, new Buffer(data), {
        persistent: true,
    });
};

process.on("exit", (code) => {
    if (ch) ch.close();
    console.log(`Closing rabbitmq channel`);
});
