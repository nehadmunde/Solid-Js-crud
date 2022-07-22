const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.get("/", userController.getuserData);
//http://localhost:9001/solid-js

router.post("/", userController.createuser);

router.get("/edit/:id", userController.edituser);

router.put("/edit/:id", userController.updateuser);

router.delete("/delete/:id", userController.deleteuser);

module.exports = router;
