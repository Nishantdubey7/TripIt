const Admin = require("../models/admin");

const adminRegistration = (req, res) => {
  let newAdmin = new Admin(req.body);

  newAdmin
    .save()
    .then((result) => {
      res.redirect("/admin-login");
    })
    .catch((err) => {
      console.log(err);
    });
};

const admin_login = async (req, res) => {
  // let newUser = new User(req.body);
  let username = req.body.userName;
  let password = req.body.pass;
  console.log("Admin : "+ username + " just attempted to log in");
  console.log(password + "is his password");

  try {
    const check = await Admin.findOne({ userName: username });

    if (check.pass === password) {
      req.session.userName = username;
      req.session.role = "admin";
      res.redirect("/admin-dashboard");
      console.log("Admin : "+ username + "Logged In");
    } else {
      //res.send("wrong cred")
      res.redirect("/admin-login");
    }
  } catch {
    res.send("wrong username and password ");
  }
};

const admin_logout = function (req, res) {
  req.session.destroy(function (err) {
    if (err) {
      console.log(err);
      res.send("error");
    } else {
      res.redirect("/");
      console.log("logged out successfully");
    }
  });
};

module.exports = { adminRegistration, admin_login, admin_logout };
