var express = require("express");
var router = express.Router();
const place = require("../models/place");
const { checkBody } = require('../modules/checkBody');

router.get("/", (req, res) => {
  res.send({ data: "here is your data" });
});

router.post("/", (req, res) => {
  place.findOne({
    nickname: req.body.nickname,
    name: req.body.name,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
  });
  const newPlace = new place({
    nickname: req.body.nickname,
    name: req.body.name,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
  });
  newPlace.save().then((data) => {
    res.json({
      result: true,
    });
    if (!data) {
      res.json({
        result: false,
        error: "Une erreur est survenue",
      });
    }
  });
});

router.get("/:nickname", (req, res) => {
  place.find({ nickname: req.params.nickname }).then((data) => {
    res.json({
      result: true,
      places: data
    });
    if (!data) {
      res.json({
        result: false,
        error: "Aucun élément trouvé !",
      });
    }
  });
});

router.delete('/', (req, res) => {
  if (!checkBody(req.body, ['nickname', 'name'])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }

  const { nickname, name } = req.body;

  // Regex to delete place regardless of nickname case
  place.deleteOne({ nickname: { $regex: new RegExp(nickname, 'i') }, name }).then((deletedDoc) => {
    if (deletedDoc.deletedCount > 0) {
      res.json({ result: true });
    } else {
      res.json({ result: false, error: 'Place not found' });
    }
  });
});

module.exports = router;
