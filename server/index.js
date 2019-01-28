const express = require("express");
const router = require("./routes.js");
const bodyParser = require("body-parser");
const path = require("path");
const compression = require("compression");
const newrelic = require("newrelic");

const app = express();

app.use(compression());
app.use(bodyParser.json());
app.use("/", express.static(path.join(__dirname + "/../client/dist")));
// "/:id(\\d+)",
app.use("/:id", express.static(path.join(__dirname + "/../client/dist")));
app.use("/api/details", router);

// test route
app.get('/hello', (req, res) => res.send('world'))

let port = 3012;
app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});
