const express = require("express");
const authController = require("../controllers/auth.controller");

const router = express.Router();

// Register a new user account
router.post("/register", authController.register);

// Authenticate user credentials and return JWT token/cookie
router.post("/login", authController.login);

// Logout user and clear authentication session cookie
router.post("/logout", authController.logout);

// Delete authenticated user account
router.delete("/delete", authController.deleteUser);

module.exports = router;