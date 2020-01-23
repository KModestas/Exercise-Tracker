const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// define the schema
const exerciseSchema = new Schema(
  {
    // instead of required true, you can return a string message as a validation message
    username: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    date: { type: Date, required: true }
  },
  {
    timestamps: true
  }
);

// create a mongoose model, wrapping the schema and providing an interface to the db for creating, querying, updating, deleting records
const Excerise = mongoose.model("Excerise", exerciseSchema);

module.exports = Excerise;
