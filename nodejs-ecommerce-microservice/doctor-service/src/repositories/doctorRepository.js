const mongoose = require("mongoose");

/**
 * Class that contains the business logic for the doctor repository interacting with the doctor model
 */
const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
});

const doctor = mongoose.model("doctor", doctorSchema);

class doctorsRepository {
  async create(doctor) {
    const createddoctor = await doctor.create(doctor);
    return createddoctor.toObject();
  }

  async findById(doctorId) {
    const doctor = await doctor.findById(doctorId).lean();
    return doctor;
  }

  async findAll() {
    const doctors = await doctor.find().lean();
    return doctors;
  }
}

module.exports = doctorsRepository;
