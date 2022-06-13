const cors = require("cors")

const express = require("express");

const app = express();

app.use(express.json());
app.use(cors());

const routes = require("./routes");

routes(app);

module.exports = app;
