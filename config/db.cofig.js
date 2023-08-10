const mongoose = require('mongoose');


module.exports = async function connection() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/test')
    console.log("Connected to database");
  }
  catch (error) {
    console.log("Error while connecting");
  }
}
