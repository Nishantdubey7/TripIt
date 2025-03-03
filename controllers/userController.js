const User = require("../models/user");

const userRegistration = (req, res) => {
  let newUser = new User(req.body);

  newUser
    .save()
    .then((result) => {
      res.redirect("/user-login");
    })
    .catch((err) => {
      console.log(err);
    });
};

const user_login = async (req, res) => {
  // let newUser = new User(req.body);
  let username = req.body.userName;
  let password = req.body.pass;
  console.log(username + "just attempted to log in");
  console.log(password + "his password");

  try {
    const check = await User.findOne({ userName: username });

    if (check.pass === password) {
      req.session.userName = username;
      req.session.userEmail = check.email;
      req.session.role = "user";
      res.redirect("/user-dashboard");
      console.log(username + "Logged In");
    } else {
      //res.send("wrong cred")
      res.redirect("/user-login");
    }
  } catch {
    res.send("wrong username and password ");
  }
};


module.exports = { userRegistration, user_login, };
