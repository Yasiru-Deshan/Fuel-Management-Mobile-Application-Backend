const mongoose = require("mongoose");

const VehicleSchema = mongoose.Schema({
  name: {
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
