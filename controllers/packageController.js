const { request } = require("express");
const Package = require("../models/package");
const User = require("../models/user");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    let extArray = file.mimetype.split("/");
    let extension = extArray[extArray.length - 1];
    cb(null, file.fieldname + "_" + Date.now() + "." + extension);
  },
});

const upload = multer({ storage: storage });

const add_package = (req, res) => {
  upload.single("image")(req, res, function (err) {
    if (err) {
      res.send(err);
      console.log(err);
    } else {
      console.log("image uploaded successfully");

      // Create a new Package instance and populate it with form data
      const newPackage = new Package({
        ...req.body,
        imagePath: req.file.path,
      });

      newPackage
        .save()
        .then((result) => {
          res.redirect("/admin-dashboard");
          console.log("new package added 🔥");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
};

const show_packages = (req, res) => {
  if (req.session.userName) {
    Package.find()
      .sort({ createdAt: -1 })
      .then((result) => {
        if (req.session.role == "admin") {
          res.render("admin/dashboard", {
            packages: result,
            userName: req.session.userName,
          });
        } else {
          res.render("user/dashboard", {
            packages: result,
            userName: req.session.userName,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    res.redirect("/");
  }
};

const showPProfile = (req, res) => {
  if (req.session.userName) {
    const id = req.params.id;

    Package.findById(id)
      .then((result) => {
        res.render("user/pProfile", {
          pProfile: result,
          userName: req.session.userName,
        });
        console.log(result);
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    res.redirect("/404");
  }
};

const payPage = (req, res) => {
  if (req.session.userName) {
    const id = req.params.id;
    
    User.findOne({userName: req.session.userName})
    .then((user) => {
      console.log(user);
      Package.findById(id)
        .then((result) => {
          res.render("user/invoice", {
            pProfile: result,
            userName: req.session.userName,
            User: user,
          });
          console.log(result.packageType + " booked by " + req.session.userName);
        })
        .catch((err) => {
          console.error(err);
        });

    })
    .catch((err) => {
    console.log(err);
    })

  } else {
    res.redirect("/");
  }
};

const allPackages = async (req, res) => {
  if (req.session.userName) {
    if (req.session.role == "admin") {
      await Package.find()
        .sort({ createdAt: -1 })
        .then((result) => {
          res.render("admin/managePackage", {
            packages: result,
            userName: req.session.userName,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      res.redirect("/");
    }
  } else {
    res.redirect("/");
  }
};

const removePackage = async (req, res) => {
  if (req.session.userName) {
    const id = req.params.id;
    await Package.findByIdAndDelete(id)
      .then((deletedPackage) => {
        if (deletedPackage) {
          console.log("Package with id " + id + " removed successfully");
          res.redirect("/route/manage-packages");
        } else {
          console.log("Package with id " + id + " not found");
          res.redirect("/route/manage-packages");
        }
      })
      .catch((err) => {
        console.log("Error occurred while removing:", err);
        res.redirect("/route/manage-packages");
      });
  } else {
    console.log("No session");
    res.redirect("/");
  }
};

const edit_package_page = async (req, res) => {
  if (req.session.userName) {
    let id = req.params.id;
    await Package.findById(id)
      .then((result) => {
        res.render("admin/editPackage", { Package: result, userName: req.session.userName });
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    console.log("No session");
    res.redirect("/");
  }
};

const updatePackage = (req, res) => {
  if (req.session.userName) {

    upload.single("image")(req, res, function (err) {
      if (err) {
        res.send(err);
        console.log(err);
      } else {
        console.log("image uploaded successfully");

        const updatedData = {
          ...req.body,
          imagePath: req.file.path,
        };

        const id = req.params.id;
        Package.findByIdAndUpdate(id, updatedData, { new: true }) // { new: true } returns the updated document
          .then((result) => {
            if (result) {
              console.log("edited!", result);
              res.redirect("/route/manage-packages");
            } else {
              console.log("Package (" + id + ") not found");
              res.redirect("/route/manage-packages");
            }
          })
          .catch((err) => {
            console.log("Error occurred while updating:", err);
            res.redirect("/route/manage-packages");
          });

      }});
      
  } else {
    console.log("No session");
    res.redirect("/");
  }
};

module.exports = {
  add_package,
  show_packages,
  showPProfile,
  payPage,
  allPackages,
  removePackage,
  updatePackage,
  edit_package_page,
};
