const express = require("express");
const AppointmentController = require("../controllers/appointmentController");

const router = express.Router();
const appointmentController = new AppointmentController();

router.post("/", (req, res) => appointmentController.createAppointment(req, res));
router.get("/", (req, res) => appointmentController.getAppointments(req, res));
router.get("/my-appointments", (req, res) => appointmentController.getMyAppointments(req, res));
router.get("/doctor-appointments", (req, res) => appointmentController.getDoctorAppointments(req, res));
router.put("/:id/status", (req, res) => appointmentController.updateAppointmentStatus(req, res));
router.delete("/:id", (req, res) => appointmentController.deleteAppointment(req, res));

module.exports = router;