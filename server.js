const express = require("express");
const body_parser = require("body-parser");
require("dotenv").config();
const app = express();
const mongoose = require("mongoose");
const { check, validationResult } = require("express-validator");
const url_parser = body_parser.urlencoded({ extended: false });
app.set("view engine", "ejs");
app.use(express.static("public"));
const URI = process.env.Mongo_URI;
mongoose.connect(URI, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB connected");
});
const formschema = {
  GarbageId: String,
  Latitude: String,
  Longitude: String,
  Amount: String,
};
const Note = mongoose.model("note", formschema);

app.get("/", (req, res) => {
  res.render("signup");
});
app.post(
  "/result",
  url_parser,
  [
    check("id", "garbage id must be numeric data only").exists().isNumeric(),
    check("lat", "latitude must be numeric").isNumeric(),
    check("long", "Longitude must be numeric").isNumeric(),
    check("amount", "Amount must be numeric").isNumeric(),
  ],
  (req, res) => {
    //console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const alert = errors.array();
      res.render("signup", { alert });
    } else {
      let newNote = new Note({
        GarbageId: req.body.id,
        Latitude: req.body.lat,
        Longitude: req.body.long,
        Amount: req.body.amount,
      });
      newNote.save();
      res.send("<h1>Data added to the database!!</h1>");
    }
  }
);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
