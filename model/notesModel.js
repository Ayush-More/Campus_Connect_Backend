const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
  Title: {
    type: String,
    required: [true, "The name of the book is required"],
    trim: true,
  },
  Category: {
    type: String,
    isRequired: true,
    enum: ["Subject", "Development", "DSA"],
    default: "Subject",
  },
  SubCategory: {
    type: [String],
    isRequired: true,
  },
  Pdf: {
    public_id: {
      type: String,
      required: true,
    },
    secure_url: {
      type: String,
      required: true,
    },
    version: {
      type: String,
      required: true,
    },
  },
  discription: {
    type: String,
    trim: true,
  },
  favourite: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const notes = mongoose.model("notes", notesSchema);
module.exports = notes;
