const { send, sendHandler } = require("../../services/notificationService");
const userModel = require("../../models/userModel");
const db = require("./../../services/dbConnection");

function setup() {
    const req = {
        params: {},
        body: {},
    };
    const res = {};
    Object.assign(res, {
        status: jest.fn(
            function status() {
                return this;
            }.bind(res)
        ),
        json: jest.fn(
            function json() {
                return this;
            }.bind(res)
        ),
        send: jest.fn(
            function send() {
                return this;
            }.bind(res)
        ),
    });
    return { req, res };
}

beforeEach(async () => {
    userModel.findById = jest.fn().mockResolvedValue({
        _id: "606377db90c41234e6e4b5db",
        name: "ghobashy",
        email: "g@g.g",
        phone: "0111111111",
        token: "iqwjqwsasczcasjasqsqsadzxc",
    });
});

test("happy senario", async () => {
    const { req, res } = setup();
    req.body = {
        users: ["606377db90c41234e6e4b5db"],
        type: "sms",
        message: "this is your message",
    };
    await sendHandler(req, res);

    expect(res.json).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalled();
});

test("function send()", async () => {
    let users = ["606377db90c41234e6e4b5db"];
    let user = {
        _id: "606377db90c41234e6e4b5db",
        name: "ghobashy",
        email: "g@g.g",
        phone: "0111111111",
        token: "iqwjqwsasczcasjasqsqsadzxc",
    };
    let message = "This is your first notification";
    let type = "sms";
    await send(type, users, message);
    expect(await userModel.findById()).toEqual(user);
});
