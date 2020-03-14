const express = require("express");
const { isAuth } = require("../../middlerwares/auth.js");
const usersController = require("../../controllers/v1/users-controller.js");

const router = express.Router();
router.post("/create", usersController.createUser);
router.post("/update",isAuth, usersController.updateUser);
router.post("/delete", usersController.deleteUser);
router.post("/get-all", usersController.getUsers);
router.post("/login", usersController.login);

module.exports = router;
