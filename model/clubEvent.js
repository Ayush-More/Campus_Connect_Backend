const mongoose = require("mongoose");

const clubEventSchema = new mongoose.Schema({
  tittle: {
    type: String,
    trim: true,
  },
  venue: {
    type: String,
    trim: true,
    maxlength: 100,
  },
  date: {
    type: Date,
    // validate: {
    //   validator: function (value) {
    //     const DateFormat = /^\d{2}/\d{2}/\d{4}$/;
    //     return DateFormat.test(value);
    //   },
    // },
    required: [true, "The Date is required"],
  },
  time: {
    type: String,
    // validate: {
    //   validator: function (value) {
    //     const TimeFormat = /^\d{2}:\d{2}$/;
    //     return TimeFormat.test(value);
    //   },
    //   message: "Invalid time format .Use HH:MM:SS",
    // },
  },
  image: {
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
  Description: {
    type: String,
    trim: true,
    maxlength: 200,
  },
  queryContact: {
    type: String,
    maxlength: 10,
  },
  Registrationlink: {
    type: String,
    // validate: {
    //   validator: function (value) {
    //     const registrationLinkRegex =
    //       /^(https?:\/\/)?(www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/\S*)?$/;
    //     return registrationLinkRegex.test(value);
    //   },
    //   message: "Invalid registration link ",
    // },
  },
  type: {
    type: String,
    enum: ["Seminar", "Industrial Vist", "Hackathon", "Contest", "Recruitment"],
    required: [true, "The type of event is required"],
  },
  mode: {
    type: String,
    enum: ["Online", "Offline", "Hybrid"],
  },
  dressCode: {
    type: String,
  },
  Department: {
    type: String,
  },
});

const club = mongoose.model("club", clubEventSchema);
module.exports = club;
