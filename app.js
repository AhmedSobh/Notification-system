const express = require("express");

const AppError = require("./utils/appError");
const notificationsRouter = require("./routes/notificationRoutes");

const app = express();
app.use(express.json());

app.use("/api/v1/notifications", notificationsRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

module.exports = app;
