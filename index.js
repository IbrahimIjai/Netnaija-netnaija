const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// set up express app
const app = express();

mongoose.connect(
  "mongodb+srv://ECOM:whizzie@cluster0.7alphba.mongodb.net/my_ecommerce?retryWrites=true&w=majority",
);
mongoose.Promise = global.Promise;

//set up static files
app.use(express.static("public"));

// use body-parser middleware
app.use(bodyParser.json());

// initialize routes
app.use("/api", require("./routes/api"));

// error handling middleware can't send back error after posting without this
app.use(function (err, req, res, next) {
  console.log(err); // to see properties of message in our console
  res.status(422).send({ error: err.message });
});

// listen for requests
app.listen(process.env.port || 4000, function () {
  console.log("now listening for requests");
});
