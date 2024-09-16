const mongoose = require("mongoose");

const acdemicSchema = new mongoose.Schema({
  date: {
    type: String,
    validate: {
      validator: function (value) {
        const DateFormat = /^\d{2}-\d{2}-\d{4}$/;
        return DateFormat.test(value);
      },
    },
    required: [true, "The date is required"],
  },
  eventName: {
    type: String,
    trim: true,
    uppercase: true,
    required: [true, "The eventname is required"],
  },
});

const academic = mongoose.model("academic", acdemicSchema);
module.exports = academic;
