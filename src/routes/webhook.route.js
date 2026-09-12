const express = require("express");
const webhookController = require("../controllers/webhook.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

// Apply authentication middleware to protect all webhook routes
router.use(authMiddleware);

// Register a new target webhook URL for the authenticated user
router.post("/register", webhookController.register);

// List all webhooks registered by the authenticated user
router.get("/", webhookController.getWebhooks);

// Delete a specific target webhook URL
router.delete("/delete", webhookController.deleteWebhook);

module.exports = router;