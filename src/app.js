const express = require("express");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.route");
const webhookRoutes = require("./routes/webhook.route");
const eventRoutes = require("./routes/event.route");

const app = express();

// Global Middlewares
app.use(express.json());       // Parse incoming JSON payloads
app.use(cookieParser());       // Parse cookies attached to incoming requests

// Health check root endpoint
app.get("/", (req, res) => {
    res.json({
        message: "Webhook API is running"
    });
});

// Route Registrations
app.use("/auth", authRoutes);       // Authentication routes (register, login, logout, delete)
app.use("/webhook", webhookRoutes); // Webhook registration and management routes
app.use("/event", eventRoutes);     // Event creation, subscription, and dispatch routes

module.exports = app;