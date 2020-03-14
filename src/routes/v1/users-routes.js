const express = require("express");

const usersController = require("../../controllers/v1/users-controller.js");

const router = express.Router();
router.post("/create", usersController.createUser);
router.post("/update", usersController.updateUser);
router.post("/delete", usersController.deleteUser);
router.post("/get-all", usersController.getUsers);
router.post('/login', usersController.login);

module.exports = router;