const express = require("express");
const mongoose = require("mongoose")
console.log("hello")
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));
app.use('/api', require('./routes/apiRoutes'))
app.use('/', require('./routes/htmlRoutes'))

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false
});



app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});