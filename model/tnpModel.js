const mongoose = require("mongoose");

const internshipSchema = new mongoose.Schema({
  profile: {
    type: String,
    required: [true, "The Profile is required"],
  },
  mode: {
    type: String,
    required: true,
    enum: ["online", "offline", "hybrid"],
  },
  stipend: {
    type: String,
    required: true,
    enum: ["paid", "unpaid"],
  },
  duration: {
    type: Number,
    required: true,
  },
  companyName: {
    type: String,
    required: [true, "The company Name is required"],
  },
  deadline: {
    type: String,
    required: [true, "The deadLine is required"],
    validate: {
      validator: function (value) {
        const DateFormat = /^\d{2}-\d{2}-\d{4}$/;
        return DateFormat.test(value);
      },
    },
  },
  link: {
    type: String,
    required: true,
  },
  skills: {
    type: String, // An array of strings for skills
    required: true,
  },
  numberOfOpenings: {
    type: Number,
    required: true,
  },
  engineeringBatch: {
    type: String,
    required: true,
    enum: ["2026", "2025", "2024"],
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200,
  },
});

const Internship = mongoose.model("Internship", internshipSchema);

module.exports = Internship;
