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
router.post("/workouts/", ({ body }, res) => {
  db.Workout.create(body)
  .then(exercise => {
    res.json(exercise);
  })
  .catch(err => {
    res.status(400).json(err);
  });
});

module.exports = router;