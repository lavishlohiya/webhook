// Standalone Express receiver app for local webhook testing
const express = require("express");

const app = express();

// Parse JSON request bodies
app.use(express.json());

// Target endpoint to receive and log dispatched webhook payloads
app.post("/tester", (req, res) => {
    console.log("Received Webhook Payload:", req.body);
    res.sendStatus(200);
});

// Start receiver on port 4000
app.listen(4000, () => {
    console.log("Tester Receiver is running on port: 4000");
});