const mongoose = require("mongoose");

const personelEventSchema = new mongoose.Schema({
  Title: {
    type: String,
    trim: true,
    required: [true, "The title is required"],
  },
  time: {
    type: String,
    // validate: {
    //   validator: function (value) {
    //     const TimeFormat = /^\d{2}:\d{2}:\d{2}$/;
    //     return TimeFormat.test(value);
    //   },
    //   message: "Invalid time format .Use HH:MM:SS",
    // },
    required: [true, "The date is required"],
  },
  date: {
    type: Date,
    // validate: {
    //   validator: function (value) {
    //     const DateFormat = /^\d{2}-\d{2}-\d{4}$/;
    //     return DateFormat.test(value);
    //   },
    // },
    required: [true, "The date is required"],
  },
  conferenceLink: {
    type: String,
  },
  discription: {
    type: String,
    trim: true,
    maxlength: 200,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const personel = mongoose.model("personel", personelEventSchema);
module.exports = personel;
