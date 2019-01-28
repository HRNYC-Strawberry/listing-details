const express = require("express");
const listingController = require("../server/controllers/listingController");
const router = express.Router();
const redis = require("redis");

const client = redis.createClient(6379);

const cache = (req, res, next) => {
  const { id } = req.params;
  client.get(id, (err, data) => {
    if (err) {
      console.log("Error from cache: ", err);
    }
    if (data !== null) {
      // console.log(JSON.parse(data));
      data = JSON.parse(data)
      res.send(data.rows);
    } else {
      next();
    }
  });
};

router.get("/:id", cache, listingController.retrieveOne);
// router.get("/loaderio-509e47c5a2a0b7d6a60dcbd75e113226.txt", (req, res) => {
//   res.send("loaderio-509e47c5a2a0b7d6a60dcbd75e113226");
// });

module.exports = router;
