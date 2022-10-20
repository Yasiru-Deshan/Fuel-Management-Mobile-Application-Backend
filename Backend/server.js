const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/database");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
connectDB();

const PORT = process.env.PORT || 8070;


app.listen(PORT, () => console.log(`server started on port ${8070}`));
