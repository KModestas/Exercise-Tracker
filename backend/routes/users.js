const router = require("express").Router();
const User = require("../models/user.model");

// when a get request at /users/ occurs, find (mongoose method) and return all users as json
// if the app was bigger, it would require and return a controller containing the logic (like WDI project 4)
router.route("/").get((req, res) => {
  // get info about request
  // console.log(req.headers);
  // console.log(req.url);
  // console.log(req.ip);
  // console.log(req.method); - get
  // console.log(req.protocol); - http / https
  // console.log(req.path); - just the path part of the url
  // console.log(req.query); - query string
  // console.log(req.subdomains); test.sales.example.com ['test', 'sales']
  // console.log(req.params); - variable in url
  // console.log(req.body) -> is parsed by express.json() middleware
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json("Error: " + err));
});

// when a post request at /users/add occurs, get the username from the request body, create a new mongoose User instance and say this new user to the db
router.route("/add").post((req, res) => {
  const username = req.body.username;
  const newUser = new User({ username });
  newUser
    .save()
    .then(() => res.json("New user added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
