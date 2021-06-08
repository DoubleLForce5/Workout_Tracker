const mongojs = require("mongojs");
const router = require('express').Router();
const db = require("../models");

// Get Last Workout 
router.get("/workouts", (req, res) => {
db.Workout.find({})
  .then(workoutData => {
    res.json(workoutData);
  })
  .catch((err) => {
    console.error(err)
    res.status(500).json(err)
  });
});

// Add Exercise | Update a workout 
router.put("/workouts/:id", (req, res) => {
  console.log(req.params.id)
  db.Workout.updateOne(
    {
      _id: mongojs.ObjectId(req.params.id)
    },
    (error, data) => {
      if(error) {
        res.send(error);
      } else {
        res.send(data);
      }
    }
  );
});


module.exports = router;