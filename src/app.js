const express = require("express");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.route");
const webhookRoutes = require("./routes/webhook.route");
const eventRoutes = require("./routes/event.route");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
    res.json({
        message: "Webhook API is running"
    })
})

app.use("/auth", authRoutes);

app.use("/webhook", webhookRoutes);

app.use("/event", eventRoutes);

module.exports = app;