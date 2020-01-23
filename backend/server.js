const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// connect to mongoAtlas DB using the connection string which we get from mongoAtlas site
const uri = process.env.ATLAS_URI;
// useNewUrlParser etc are there to prevent breaking changes, not improtant to know about
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});
// you can use this then block or connection.open below to handle the promise when the db connects
//   .then(() => console.log("MongoDB connected!"))
//   .catch(err => console.log("Error", err.message));

const connection = mongoose.connection;
connection.once("open", () => console.log("MongoDB connected!"));

app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log("SERVER RUNNING");
});
