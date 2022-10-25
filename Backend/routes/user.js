const router = require("express").Router();
const Station = require("../models/Station");
const Vehicle = require("../models/Vehicle");
const User = require("../models/User");

//add vehicle
router.post("/signup", (req, res) => {
  const newUser = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };

  const query = { email: newUser.email };

  User.findOne(query, (err, result) => {
    if (result == null) {
      User.insertOne(newUser, (err, result) => {
        res.status(200).send();
      });
    } else {
      res.status(400).send();
    }
  });
});

router.post("/login", (req, res) => {
  const query = {
    email: req.body.email,
    password: req.body.password,
  };

  User.findOne(query, (err, result) => {
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

router.post("/add", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(200).send({ user });
  } catch (error) {
    res.status(400).send({ error });
  }
});

module.exports = router;
