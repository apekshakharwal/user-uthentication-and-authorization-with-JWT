const mongoose = require("mongoose");

var UserSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: "Required"
      },
      email: {
        type: String,
        required: "Required"
      },
      password: {
        type: String,
        required: "Required"
      },
      mobile_no: {
        type: Number,
        required: "Required"
      },
      address: {
        type: String,
        //  required : "Required"
      },
      pincode: {
        type: Number,
        //  required : "Required"
      },
      token: { 
        type: String,
        //  required: true 
      },
    })

const User = mongoose.model('Users', UserSchema);

module.exports = User;