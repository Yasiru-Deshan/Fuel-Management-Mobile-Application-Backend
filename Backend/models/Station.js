const mongoose = require("mongoose");

const StationSchema = mongoose.Schema({
  stationCode: {
    type: String,
  },
  name: {
    type: String,
  },
  username:{
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  location: {
    type: String,
  },
  available: {
    type: Boolean,
  },
  arrivalDate: {
    type: Date,
  },
  arrivalQuantity:{
    type: Number,
  },
  finishTime: {
    type: Date,
  },
  arrivalType: {
    type: String,
  },
  dieselQueue: [
    {
      vehicleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vehicle",
      },
      name: {
        type: String,
      },
      fuelType: {
        type: String,
      },
      balance: {
        type: String,
      },
    },
  ],
  petrolQueue: [
    {
      vehicleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vehicle",
      },
      name: {
        type: String,
      },
      fuelType: {
        type: String,
      },
      balance: {
        type: String,
      },
      last_updated: {
        type: Date,
      },
    },
  ],
});

module.exports = mongoose.model("Station", StationSchema);
