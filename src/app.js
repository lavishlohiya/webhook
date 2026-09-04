const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Webhook API is running"
    })
})

module.exports = app;