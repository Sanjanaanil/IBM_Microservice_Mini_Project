require("dotenv").config();

module.exports = {
  port: process.env.PORT || 5001,
  mongoURI: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET || "healthcare_secret",
};