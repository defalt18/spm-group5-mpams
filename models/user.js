const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  accountType: {
    type: Number,
    required: true,
    default: -1,
  },
  professionalInfo: {
    profession: [
      {
        type: String,
      },
    ],
    address: {
      type: String,
    },
    mobileNo: {
      type: String,
    },
    imagesUris: [
      {
        type: String,
      },
    ],
  },
});

module.exports = mongoose.model("User", userSchema);
