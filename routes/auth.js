const express = require("express");
const authController = require("../controllers/auth");

const router = express.Router();

// auth route

router.get("/login", authController.getLogin);

module.exports = router;
