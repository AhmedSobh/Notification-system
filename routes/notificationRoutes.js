const express = require("express");
const notificationService = require("../services/notificationService");

const router = express.Router();

router.route("/").post(notificationService.sendHandler);
module.exports = router;
