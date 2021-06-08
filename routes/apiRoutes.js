const router = require('express').Router();
const db = require("../models");

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


module.exports = router;