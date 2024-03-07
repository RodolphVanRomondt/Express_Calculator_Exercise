/** Simple Calculator (Mean, Median, Mode) Express app. **/

const express = require('express');

const app = express();

app.use(express.json());


/* Homepage renders simple message. */
app.get('/', function(req, res) {
  return res.send("*** Express Calculator ***");
});


/** Start server on port 3000 */
app.listen(3000, function() {
  console.log('Server started on port 3000.');
});
