const router = require("express").Router();
const Station = require("../models/Station");
const Vehicle = require("../models/Vehicle");

//add vehicle
router.post("/signup", async (req, res) => {
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

//get vehicle history details
router.get('/find/:id/history', async (req, res) => {
    try {
        const vehicle = await Vehicle.findById(req.params.id);
        res.status(200).json(vehicle.history);
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

//signup vehicle
router.post("/reg", (req, res) => {
  const newUser = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    vehicleNumber: req.body.vehicleNumber,
    fuelType: req.body.fuelType
  };

  const query = { email: newUser.email };

  Vehicle.findOne(query, (err, result) => {
    if (result == null) {
      Vehicle.save(newUser, (err, result) => {
        res.status(200).send();
      });
    } else {
      res.status(400).send();
    }
  });
});

//login
router.post("/login", (req, res) => {
  const query = {
    email: req.body.email,
    password: req.body.password,
  };

  Vehicle.findOne(query, (err, result) => {
    if (result != null) {
      const objToSend = {
        name: result.name,
        email: result.email,
      };

      res.status(200).send(JSON.stringify(objToSend));
    } else {
      res.status(404).send();
    }
  });
});

module.exports = router;
