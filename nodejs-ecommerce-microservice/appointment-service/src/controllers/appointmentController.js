const Appointment = require("../models/appointmentModel");

class AppointmentController {
  async createAppointment(req, res) {
    try {
      const { userId, doctorId, doctorName, patientName, date, time } = req.body;

      const appointment = await Appointment.create({
        userId,
        doctorId,
        doctorName,
        patientName,
        date,
        time,
      });

      return res.status(201).json(appointment);
    } catch (error) {
      console.error("Create appointment error:", error);
      return res.status(500).json({ message: "Error creating appointment" });
    }
  }

  async getAppointments(req, res) {
    try {
      const appointments = await Appointment.find();
      return res.status(200).json(appointments);
    } catch (error) {
      console.error("Get appointments error:", error);
      return res.status(500).json({ message: "Error fetching appointments" });
    }
  }

  async getMyAppointments(req, res) {
    try {
      const userId = req.query.userId;

      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }

      const appointments = await Appointment.find({ userId });
      return res.status(200).json(appointments);
    } catch (error) {
      console.error("Get my appointments error:", error);
      return res.status(500).json({ message: "Error fetching user appointments" });
    }
  }

  async getDoctorAppointments(req, res) {
    try {
      const doctorId = req.query.doctorId;

      if (!doctorId) {
        return res.status(400).json({ message: "Doctor ID is required" });
      }

      const appointments = await Appointment.find({ doctorId });
      return res.status(200).json(appointments);
    } catch (error) {
      console.error("Get doctor appointments error:", error);
      return res.status(500).json({ message: "Error fetching doctor appointments" });
    }
  }

  async updateAppointmentStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const updatedAppointment = await Appointment.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      );

      if (!updatedAppointment) {
        return res.status(404).json({ message: "Appointment not found" });
      }

      return res.status(200).json(updatedAppointment);
    } catch (error) {
      console.error("Update appointment status error:", error);
      return res.status(500).json({ message: "Error updating appointment status" });
    }
  }

  async deleteAppointment(req, res) {
    try {
      const { id } = req.params;

      const deletedAppointment = await Appointment.findByIdAndDelete(id);

      if (!deletedAppointment) {
        return res.status(404).json({ message: "Appointment not found" });
      }

      return res.status(200).json({ message: "Appointment deleted successfully" });
    } catch (error) {
      console.error("Delete appointment error:", error);
      return res.status(500).json({ message: "Error deleting appointment" });
    }
  }
}

module.exports = AppointmentController;