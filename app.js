/** Simple Calculator (Mean, Median, Mode) Express app. **/

const express = require('express');

const app = express();

app.use(express.json());


/* Homepage renders simple message. */
app.get('/', function(req, res) {
  return res.send("*** Express Calculator ***");
});


/*  MEAN's route */
app.get("/mean", function (req, res) {

  if (!req.query.nums) {
    return res.status(400).json(
      { response: "nums are required" }
    );
  }

  const nums = req.query.nums.split(",");

  let total = 0;

  for (let num of nums) {

    if (isNaN(num)) {
      return res.status(400).json(
        { response: `${num} is not a number` }
      )
    }

    total += parseInt(num);
  }

  return res.json({
    response: {
      operation: "mean",
      value: total / nums.length
    }
  });

});


/** Start server on port 3000 */
app.listen(3000, function() {
  console.log('Server started on port 3000.');
});
