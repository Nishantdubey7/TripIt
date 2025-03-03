const express = require("express");
const userController = require("../controllers/userController");
const adminController = require("../controllers/adminController");
const packageController = require("../controllers/packageController");
const router = express.Router();
router.use(express.static("public"));

//admin
router.post('/admin-sign-up', adminController.admin_login )
router.post('/admin-regis', adminController.adminRegistration )

//package routes
router.get("/add-package", (req, res) => {
  res.render("admin/addPackage", { userName: req.session.userName });
});
router.get('/manage-packages', packageController.allPackages);

router.post('/addPackage', packageController.add_package)

router.get('/package-profile/:id', packageController.showPProfile)
router.get('/book-package/:id', packageController.payPage)

router.get('/remove-package/:id', packageController.removePackage)

router.get('/edit-package/:id', packageController.edit_package_page)
router.post('/editPackage/:id', packageController.updatePackage)
//users
router.post('/user-regis', userController.userRegistration)
router.post('/user-sign-up', userController.user_login)


//logout
router.get('/logout', adminController.admin_logout)

router.use((req, res) => {
    res.status(404).redirect("/404");
  })

module.exports = router;