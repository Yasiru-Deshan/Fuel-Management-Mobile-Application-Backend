const router = require("express").Router(); 
const Station = require("../models/Station");
const Vehicle = require("../models/Vehicle")

//join to queue
router.put("/:id/joinqueue", async (req, res) => {
  try {
    const newVehicle = new Vehicle({
      vehicleId: req.body.vehicleId,
      name: req.body.name,
      fuelType: req.body.fuelType,
      balance: req.body.balance,
    });

    const queue = await Station.findById(req.params.id);

    if(req.body.fuelType=="Petrol"){
            await queue.updateOne({ $push: { petrolQueue: [newVehicle] } });
            return res.status(200).json("Joined to the petrol queue");
    }
    else if(req.body.fuelType=="Diesel"){
            await queue.updateOne({ $push: { dieselQueue: [newVehicle] } });
            return res.status(200).json("Joined to the diesel queue");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//exit from queue
router.put("/:id/exitqueue", async (req, res) => {
  try {

    const queue = await Station.findById(req.params.id);

    if(req.body.fuelType=="Petrol"){
            await queue.updateOne(
              {
                $pull: { petrolQueue: {_id: req.body.vehicleId} },
              }
            );
            return res.status(200).json("Exit from the petrol queue");
    }
    else if(req.body.fuelType=="Diesel"){
            await queue.updateOne(

              {
                $pull: { dieselQueue: {_id: req.body.vehicleId} },
              }
            );
            return res.status(200).json("Exit from the diesel queue");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//add station
router.post('/', async(req,res)=>{

    const newStation = new Station(req.body);

    try{
        const savedStation = await newStation.save();
        res.status(200).json(savedStation);
    }catch(err){
        res.status(500).json(err);
    }
});

//add arrival details
router.put("/:id", async (req, res) => {

  try {
    const vehicle = await Station.findById(req.params.id);

    await vehicle.updateOne({ $set: req.body });
    res.status(200).json("Arrival details updated");

  } catch (err) {
    res.status(500).json(err);
  }
});

//get station details
router.get("/find/:id", async (req, res) => {
  try {
    const station = await Station.findById(req.params.id);
    res.status(200).json(station);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get petrol queue
router.get("/find/:id/petrol", async (req, res) => {
  try {
    const station = await Station.findById(req.params.id);
    res.status(200).json(station.petrolQueue);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get petrol queue
router.get("/find/:id/diesel", async (req, res) => {
  try {
    const station = await Station.findById(req.params.id);
    res.status(200).json(station.dieselQueue);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all stations
router.get("/find/", async (req, res) => {
  Station.find()
    .then((list) => {
      res.json(list);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;