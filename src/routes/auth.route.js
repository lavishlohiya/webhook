const express = require("express");
const authController = require("../controllers/auth.controller");
const { route } = require("../app");

const router = express.Router();

router.post("/register", authController.register);

router.post("/login", authController.login);

router.post("/logout", authController.logout);

router.delete("/delete", authController.deleteUser);

module.exports = router;