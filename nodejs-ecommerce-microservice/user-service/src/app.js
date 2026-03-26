const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("./config");
const usersRouter = require("./routes/userRoutes");
require("dotenv").config();

class App {
  constructor() {
    this.app = express();
    this.connectDB();
    this.setMiddlewares();
    this.setRoutes();
  }

  async connectDB() {
    try {
      await mongoose.connect(config.mongoURI);
      console.log("MongoDB connected");
    } catch (error) {
      console.error("MongoDB connection error:", error.message);
    }
  }

  setMiddlewares() {
    this.app.use(
      cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
      })
    );

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  setRoutes() {
    this.app.use("/api/users", usersRouter);
  }

  start() {
    const PORT = process.env.PORT || 5001;
    this.server = this.app.listen(PORT, () =>
      console.log(`User service started on port ${PORT}`)
    );
  }
}

module.exports = App;