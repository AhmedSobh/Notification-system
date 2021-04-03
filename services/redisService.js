const redis = require("redis");
const dotenv = require("dotenv");
const { promisify } = require("util");
dotenv.config();

const PORT = process.env.REDIS_PORT;
const URL = process.env.REDIS_URL;
const PASS = process.env.REDIS_PASS;

const client = redis.createClient(PORT, URL);
client.auth(PASS);

const setAsync = promisify(client.set).bind(client);
const getAsync = promisify(client.get).bind(client);

module.exports = { setAsync, getAsync };
