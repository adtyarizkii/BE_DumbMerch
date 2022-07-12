const express = require("express");

const router = express.Router();

const {uploadFile} = require("../middleware/uploadFile")

// validate token
const {auth} = require("../middleware/auth")

// Controller Import
const {getUsers, register, login, deleteUser, updateUser, getUser} = require("../controllers/user");
const {getProduct, addProduct, detailProduct, updateProduct, deleteProduct} = require("../controllers/product");
const {addTransaction } = require("../controllers/transaction");

// router User
router.get("/user", getUsers);
router.post("/register", register);
router.get("/login", login);
router.get("/user/:id", getUser);
router.delete("/user/:id", deleteUser);
router.patch("/user/:id", updateUser);

//router Product
router.get("/product", auth, getProduct);
router.post("/product", auth, uploadFile("image"), addProduct);
router.get("/product/:id", auth, detailProduct);
router.patch("/product/:id",  auth, uploadFile("image"), updateProduct);
router.delete("/product/:id", auth, deleteProduct);

//router Transaction
router.post("/transaction", auth, addTransaction);

module.exports = router;
