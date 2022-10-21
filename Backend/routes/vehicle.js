const router = require("express").Router();
const Station = require("../models/Station");
const Vehicle = require("../models/Vehicle");

//add vehicle
router.post("/", async (req, res) => {
  const newVehicle = new Vehicle(req.body);

  try {
    const savedCVehicle = await newVehicle.save();
    res.status(200).json(savedCVehicle);
  } catch (err) {
    res.status(500).json(err);
  }
});

//pump a vehicle
router.put("/pump/:id", async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);

    const qty = req.body.quantity;

    const balance = 20 - qty;

    await vehicle.updateOne({ $set: {balance: balance} });
    await vehicle.updateOne({
      $push: { history: { quantity: req.body.quantity, station: req.body.station } },
    });
    res.status(200).json("Fuel has been pumped");
    
  } catch (err) {
    res.status(500).json(err);
  }
});

//get vehicle details
router.get('/find/:id', async (req, res) => {
    try {
        const vehicle = await Vehicle.findById(req.params.id);
        res.status(200).json(vehicle);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
