const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// this schema currently only has 1 field
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      // will trim spaces off the end
      trim: true,
      minLength: 3
    }
  },
  {
    // will automatically create fields for when created or edited
    timestamps: true
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
