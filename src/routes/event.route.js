const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const eventController = require("../controllers/event.controller");

const router = express.Router();

router.post("/create", authMiddleware, eventController.createEvent);

router.get("/event", authMiddleware, eventController.getEvents);

router.delete("/delete", authMiddleware, eventController.deleteEvent);

module.exports = router;