const mongojs = require("mongojs");
const router = require('express').Router();
const db = require("../models");

// Get Last Workout 
router.get("/workouts", (req, res) => {
db.Workout.aggregate([
    {
      $addFields: {
        totalDuration: {
          $sum: '$exercises.durations',
        },
      },
    },
  ])
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
  // console.log(req.params.id)
  // console.log(req.body)
  console.log("req.body", req.body)
  
  db.Workout.findByIdAndUpdate( 
    req.params.id, 
    { $push: { exercises: (req.body) } },
    { runValidators: true }
    // (error, data) => {
    //   // console.log(data)
    //   if(error) {
    //     res.send(error);
    //   } else {
    //     res.send(data);
    //   }
    // }
    
  )
  .then(workoutData => {
    console.log("workout Data", workoutData)
    res.json(workoutData);
  })
  .catch((err) => {
    console.error(err)
    res.status(500).json(err)
  });
});

// Create Workout 
router.post("/workouts", (req, res) => {
  // console.log('line 50')
  // console.log(req);
  db.Workout.create({})
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