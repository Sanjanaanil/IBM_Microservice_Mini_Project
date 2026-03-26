const doctorsRepository = require(".repositories/doctorsRepository");

/**
 * Class that ties together the business logic and the data access layer
 */
class doctorsService {
  constructor() {
    this.doctorsRepository = new doctorsRepository();
  }

  async createdoctor(doctor) {
    const createddoctor = await this.doctorsRepository.create(doctor);
    return createddoctor;
  }

  async getdoctorById(doctorId) {
    const doctor = await this.doctorsRepository.findById(doctorId);
    return doctor;
  }

  async getdoctors() {
    const doctors = await this.doctorsRepository.findAll();
    return doctors;
  }
}

module.exports = doctorsService;
