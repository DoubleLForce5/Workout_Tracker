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

// Add Exercise
router.put("/workouts/:id", (req, res) => {
  console.log(req.params.id)
  db.Workout.findByIdAndUpdate( req.params.id, 
    { $push: 
      // name: req.body.name,
      // duration: req.body.duration,
      // weight: req.body.weight, 
      // reps: req.body.reps, 
      // sets: req.body.sets,
    { exercise: req.body }
    },
    (error, data) => {
      console.log(data)
      if(error) {
        res.send(error);
      } else {
        res.send(data);
      }
    }
  );
});

// Create Workout 
router.post("/workouts", (req, res) => {
  db.Workout.create(req.body)
  .then(dbWorkout => {
    console.log(dbWorkout)
    res.json(dbWorkout)
  })
  .catch(err => {
    console.error(err)
    res.send(err);
  });
});

// router.post("/workouts", (req, res) => {
//   db.Workout.create(req.body)
//   .then(dbWorkout => {
//     console.log(dbWorkout)
//     res.json(dbWorkout)
//   })
//   .catch(err => {
//     console.error(err)
//     res.send(err);
//   });
// });


module.exports = router;