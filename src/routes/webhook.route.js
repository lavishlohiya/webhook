const express = require("express");
const webhookController = require("../controllers/webhook.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.use(authMiddleware);

router.post("/register", webhookController.register);

router.get("/", webhookController.getWebhooks);

router.delete("/delete", webhookController.deleteWebhook);

module.exports = router;