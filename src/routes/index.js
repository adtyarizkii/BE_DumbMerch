const express = require("express");

const router = express.Router();

// Controller Import
const {getUsers, register, login, deleteUser, updateUser, getUser} = require("../controllers/user");

// router User
router.get("/user", getUsers);
router.post("/register", register);
router.get("/login", login);
router.get("/user/:id", getUser);
router.delete("/user/:id", deleteUser);
router.patch("/user/:id", updateUser);

module.exports = router;
