const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  skills: [String],
  experience: Number,
  education: String,
  about: String,
  resume: String,
  status: {
    type: String,
    default: "Pending"
  }
}, { timestamps: true });

module.exports = mongoose.model("Candidate", candidateSchema);