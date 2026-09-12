const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const eventController = require("../controllers/event.controller");

const router = express.Router();

// Bind an event topic to a target webhook URL
router.post("/create", authMiddleware, eventController.createEvent);

// Fetch active event subscriptions for the authenticated user
router.get("/event", authMiddleware, eventController.getEvents);

// Delete an existing event subscription
router.delete("/delete", authMiddleware, eventController.deleteEvent);

// Dispatch event payload to all target webhook endpoints bound to the event
router.post("/send", authMiddleware, eventController.sendEvent);

module.exports = router;