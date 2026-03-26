const express = require("express");
const DoctorController = require("../controllers/doctorController");

const router = express.Router();
const doctorController = new DoctorController();

router.post("/register", (req, res) => doctorController.registerDoctor(req, res));
router.post("/login", (req, res) => doctorController.loginDoctor(req, res));
router.get("/profile", (req, res) => doctorController.getDoctorProfile(req, res));

router.post("/", (req, res) => doctorController.createDoctor(req, res));
router.get("/", (req, res) => doctorController.getDoctors(req, res));

module.exports = router;