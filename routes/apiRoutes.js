const router = require('express').Router();
const db = require("../models");

// Get Last Workout 
router.get("/workouts", (req, res) => {
  db.Workout.aggregate([{
      $addFields: {
        totalDuration: {
          $sum: '$exercises.duration',
        },
      },
    }, ])
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

  console.log("req.body", req.body)

  db.Workout.findByIdAndUpdate(
      req.params.id, {
        $push: {
          exercises: (req.body)
        }
      }, {
        runValidators: true
      }
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

router.get('/workouts/range', (req, res) => {
  db.Workout.aggregate([{
        $addFields: {
          totalDuration: {
            $sum: '$exercises.duration',
          },
        },
      },
      {
        $addFields: {
          totalWeight: {
            $sum: '$exercises.weight',
          },
        },
      }
    ])
    .then(workoutData => {
      res.json(workoutData);
    })
    .catch((err) => {
      console.error(err)
      res.status(500).json(err)
    })
})

module.exports = router;