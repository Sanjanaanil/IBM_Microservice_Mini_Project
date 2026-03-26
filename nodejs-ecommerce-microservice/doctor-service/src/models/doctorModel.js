const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    specialization: {
      type: String,
      required: true,
    },
    experience: {
      type: Number,
      default: 0,
    },
    fees: {
      type: Number,
      required: true,
    },
    available: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      default: "doctor",
    },
  },
  { timestamps: true }
);

doctorSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

doctorSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;