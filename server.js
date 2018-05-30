const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.get("/wheather", (req, res) => {
  res.json({
    temp: Math.ceil(Math.random() * 10) + 10,
    updatedAt: Date.now()
  });
});

app.listen(9000);
