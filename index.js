const express = require("express");
const app = express();

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Started!");
});

app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));
