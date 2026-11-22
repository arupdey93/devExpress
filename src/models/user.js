const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: 4,
      maxlength: 40,
    },
    lastName: {
      type: String,
      trim: true,
      maxlength: 40,
    },
    emailId: {
      type: String,
      lowercase: true,
      required: true,
      trim: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email address " + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Please enter a strong password " + value);
        }
      },
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "other"].includes(value)) {
          throw new Error("Gender must be male, female or other");
        }
      },
    },
    photoUrl: {
      type: String,
      validate(value) {
        if (!validator.isURL) {
          throw new Error("URL is not valid " + value);
        }
      },
    },
    about: {
      type: String,
      default: "This is a default about user",
      trim: true,
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("User", userSchema);
