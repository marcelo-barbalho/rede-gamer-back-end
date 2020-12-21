const express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
const connectDB = require("./config/db");
const app = express();
// const fileUpload = require('express-fileupload')
const PORT = process.env.PORT || 3001;

// Init Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use('/bovinas', express.static('uploads'))

// Connect Database
connectDB();

// app.use(fileUpload({createParentPath:true}))


//Paths
app.get("/", (req, res) => res.send("E ai, estou funcionando?"));
app.use("/auth", require("./routes/api/auth"));
app.use("/user", require("./routes/api/user"));

app.listen(PORT, () => {
  console.log(`port ${PORT}`);
});
