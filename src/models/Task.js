const mongoose = require("mongoose");
const Task = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  time: {
    type: Date,
    default: Date.now(),
  },
});
module.exports = mongoose.model("Task", Task);
