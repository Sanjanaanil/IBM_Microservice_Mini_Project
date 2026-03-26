require("dotenv").config();

module.exports = {
  port: process.env.PORT || 5003,
  mongoURI: process.env.MONGO_URI,
};