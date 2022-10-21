const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/database");
const cors = require("cors");
require("dotenv").config();

//Routes
const stationRoute = require("./routes/station");
const vehicleRoute = require("./routes/vehicle");

const app = express();
app.use(cors());
connectDB();

//Init middleware
app.use(express.json({ extended: false }));

app.use("/api/station", stationRoute);
app.use("/api/vehicle", vehicleRoute);

const PORT = process.env.PORT || 8070;

app.listen(PORT, () => console.log(`server started on port ${8070}`));
