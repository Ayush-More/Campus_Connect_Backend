const mongoose = require("mongoose");

const studentMentorSchema = new mongoose.Schema({
  users: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  programmingLanguages: {
    type: [String],
    required: [
      true,
      "Please provide the programming languages the student mentor is proficient in",
    ],
  },
  role: {
    type: String,
    required: [true, "Please provide your role"],
  },
  intustryExperience: {
    type: String,
    required: [true, "Please provide the industry Expirence"],
  },
  ClubWithPosition: {
    type: String,
    required: [true, "Please provide the club"],
  },
  CompanyName: {
    type: String,
    required: [true, "Please provide the company"],
  },
  Cgpa: {
    type: String,
    required: [true, "Please provide the average cgpa"],
  },
});

const StudentMentor = mongoose.model("StudentMentor", studentMentorSchema);

module.exports = StudentMentor;
