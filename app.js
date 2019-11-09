const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
//import session
const session = require("express-session");
const accountCheck = require("./accountCheck");
//import accounts info
const users = require("./accounts.json").users;
//set the enviroment
const {
  port = 3000,
  sessName = "uid",
  sessSecret = "ssh",
  sessLifeTime = 1000 * 60 * 60 * 2
} = process.env;

//set session
app.use(
  session({
    name: sessName,
    resave: false,
    saveUninitialized: false,
    secret: sessSecret,
    cookie: {
      maxAge: sessLifeTime,
      sameSite: true,
      secure: false
    }
  })
);
//Redirection
const redirectLogin = (req, res, next) => {
  if (!req.session.userId) {
    res.redirect("/login");
  } else {
    next();
  }
};

const redirectHome = (req, res, next) => {
  if (req.session.userId) {
    res.redirect("/");
  } else {
    next();
  }
};

app.use(bodyParser.urlencoded({ extends: true }));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//home page
app.get("/", redirectLogin, (req, res) => {
  const userId = req.session.userId;
  const userInfo = users.find(item => item.id === userId);
  res.render("home", { userInfo });
});

//login page
app.get("/login", redirectHome, (req, res) => {
  res.render("index");
});
//sign in
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const userId = accountCheck(email, password);
  let errorString =
    "Sorry!Your account is not exist or you enter the wrong password.";
  //sign in success
  if (userId != undefined) {
    req.session.userId = userId;
    return res.redirect("/");
  }
  //sign in fail
  else res.render("index", { errorString });
});

//register page
app.get("/register", redirectHome, (req, res) => {
  res.render("register");
});
//register
app.post("/register", redirectHome, (req, res) => {
  const { name, email, password } = req.body;

  if (name && email && password) {
    let exists = users.some(item => item.email === email);

    //if email is available
    if (!exists) {
      let newUser = {
        id: users.length + 1,
        firstName: name,
        email,
        password
      };
      users.push(newUser);
      req.session.userId = newUser.id;
      return res.redirect("/");
    } else {
      let errString1 = "Sorry!This email has been already used ";
      res.render("register", { errString1 });
    }
  } else {
    let errString = "Please make sure you have fill in the form completely";
    res.render("register", { errString });
  }
});

//logout
app.post("/logout", redirectLogin, (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.redirect("/");
    }
    res.clearCookie(sessName);
    res.redirect("/login");
  });
});

app.listen(port, (req, res) => {
  console.log(`This express is listening on http://localhost:${port}`);
});
