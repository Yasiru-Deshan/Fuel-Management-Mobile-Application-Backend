const mongoose = require("mongoose");

const VehicleSchema = mongoose.Schema({
  name: {
    type: String,
  },
  vehicleNumber:{
    type: String,
  },
  email:{
    type: String,
  },
  password:{
    type: String,
  },
  fuelType: {
    type: String,
  },
  balance: {
    type: Number,
  },
  history: [{
    quantity:{
        type: Number,
    },
    station:{
        type: String,
    },
    Date:{
        type: Date
    }
  }],
});

module.exports = mongoose.model("Vehicle", VehicleSchema);
