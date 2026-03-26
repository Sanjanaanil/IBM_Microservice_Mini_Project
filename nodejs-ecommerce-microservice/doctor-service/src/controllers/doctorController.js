const Doctor = require("../models/doctorModel");

class DoctorController {
  async createDoctor(req, res) {
    try {
      const { name, specialization, experience, fees, available } = req.body;

      const doctor = await Doctor.create({
        name,
        specialization,
        experience,
        fees,
        available,
      });

      return res.status(201).json(doctor);
    } catch (error) {
      console.error("Create doctor error:", error);
      return res.status(500).json({ message: "Error creating doctor" });
    }
  }

  async getDoctors(req, res) {
    try {
      const doctors = await Doctor.find();
      return res.status(200).json(doctors);
    } catch (error) {
      console.error("Get doctors error:", error);
      return res.status(500).json({ message: "Error fetching doctors" });
    }
  }
}

module.exports = DoctorController;