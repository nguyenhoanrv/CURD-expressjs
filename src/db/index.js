const mongoose = require("mongoose");

async function connect() {
  try {
    mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log("Connect successfully!!!");
  } catch (error) {
    console.log("Connect failure!!!");
  }
}

module.exports = { connect };
