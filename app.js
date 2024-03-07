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


/*  MEDIAN's route */
app.get("/median", function (req, res) {

  if (!req.query.nums) {
    return res.status(400).json(
      { response: "nums are required" }
    );
  }

  const nums = req.query.nums.split(",");
  const numsInt = [];

  for (let num of nums) {
    if (isNaN(num)) {
      return res.status(400).json(
        { response: `${num} is not a number` }
      )
    }

    numsInt.push(+num);
  }

  numsInt.sort((a, b) => a - b);

  let idx = numsInt.length / 2;
  let median;
  
  if (numsInt.length % 2 === 0) {
    median = (numsInt[idx - 1] + numsInt[idx]) / 2;
  } else {
    median = numsInt[idx - .5];
  }

  return res.json({
    response: {
      operation: "median",
      value: median
    }
  });

});


/*  MODE's route */
app.get("/mode", function (req, res) {

  if (!req.query.nums) {
    return res.status(400).json(
      { response: "nums are required" }
    );
  }

  const nums = req.query.nums.split(",");
  const occ = {};

  for (let num of nums) {
    if (isNaN(num)) {
      return res.status(400).json(
        { response: `${num} is not a number` }
      )
    }

    if (!occ.hasOwnProperty(num)) {
      occ[num] = 1;
      console.log("YES");
    } else {
      occ[num] += 1;
    }
  }

  const max = Math.max(...Object.values(occ));

  function resp(acc, nextVal) {
    if (nextVal[1] === max) {
      acc.push(nextVal[0]);
    }
    return acc;
  }

  return res.json({
    response: {
      operation: "mode",
      value: Object.entries(occ).reduce(resp, [])
    }
  });

});


/** Start server on port 3000 */
app.listen(3000, function() {
  console.log('Server started on port 3000.');
});
