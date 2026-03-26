const { jwtSecret } = require("../../user-service/src/config");

require("dotenv").config();

module.exports = {
  port: process.env.PORT || 5002,
  mongoURI: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET || "doctor_secret_key"
};