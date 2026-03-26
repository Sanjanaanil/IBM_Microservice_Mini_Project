const express = require("express");
const UserController = require("../controllers/userController");

const router = express.Router();
const userController = new UserController();

router.post("/register", (req, res) => userController.register(req, res));
router.post("/login", (req, res) => userController.login(req, res));
router.get("/profile", (req, res) => userController.getProfile(req, res));

module.exports = router;