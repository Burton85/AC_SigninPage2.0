const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const port = 3000;
const bodyParser = require("body-parser");
const accountCheck = require("./accountCheck");

app.use(bodyParser.urlencoded({ extends: true }));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.post("/success", (req, res) => {
  const input = req.body;
  const result = accountCheck(input);
  res.render("successPage", { result: result });
});

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(port, (req, res) => {
  console.log("this express is listening on http://localhost:3000");
});
