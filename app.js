const express = require("express");
const app = express();
const mongodb = require("mongoose");
const bodyparser = require("body-parser");
const router = require("./routes/router");
const session = require("express-session");
const { v4: uuidv4 } = require("uuid");

const packageController = require("./controllers/packageController");

app.set("view engine", "ejs");

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

const dbUrl =
  "mongodb+srv://satyuum:MongoTryqwerty37@cluster0.pr2msog.mongodb.net/tripit?retryWrites=true&w=majority";
mongodb
  .connect(dbUrl)
  .then(async (result) => {
    console.log("connected to db"), await app.listen(3000);
    console.log("listening on 3000");
  })
  .catch((err) => console.log(err));

app.use(
  session({
    secret: uuidv4(),
    resave: false,
    saveUninitialized: true,
  })
);

app.get("/", (req, res) => {
  if (req.session.userName) {
    if (req.session.role == "admin") {
      res.redirect("/admin-dashboard");
    } else {
      res.redirect("/user-dashboard");
    }
  } else {
    res.render("lock-screen");
  }
});

//user login routes:
app.get("/user-login", (req, res) => {
  res.render("user/login");
});

app.get("/user-register", (req, res) => {
  res.render("user/register");
});

//admin login routes:
app.get("/admin-login", (req, res) => {
  res.render("admin/login");
});

app.get("/admin-register", (req, res) => {
  res.render("admin/register");
});

//dashboard routes:
app.get("/user-dashboard", packageController.show_packages);

app.get("/admin-dashboard", packageController.show_packages);

//temporary routes:

app.use('/user-bill', (req, res) => {
 res.render('user/invoice', { userName: req.session.userName});
})



//router middleware
app.use("/route", router);

//404 middleware
app.use((req, res) => {
  res.status(404).render("404");
});
