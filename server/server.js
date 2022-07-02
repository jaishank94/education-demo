const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const schoolRouter = require('./routes/school');

var app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, });

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Mongoose DB Connection Established!");
});

app.use('/schools', schoolRouter);

app.listen(PORT, () => {
  console.log(`Running server at port ${PORT}`);
});
