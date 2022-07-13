const express = require("express");

const router = express.Router();

const {uploadFile} = require("../middleware/uploadFile")

// token validate
const {auth} = require("../middleware/auth")

// import controller
const {getUsers, register, login, deleteUser, updateUser, getUser} = require("../controllers/user");
const {getProduct, addProduct, detailProduct, updateProduct, deleteProduct} = require("../controllers/product");
const { addCategory, getCategories, getCategory, deleteCategory, updateCategory } = require("../controllers/category");
const {addTransaction, getTransaction } = require("../controllers/transaction");

// login&register router 
router.get("/user", getUsers);
router.post("/register", register);
router.get("/login", login);
router.get("/user/:id", getUser);
router.delete("/user/:id", deleteUser);
router.patch("/user/:id", updateUser);

// product router
router.get("/product", auth, getProduct);
router.post("/product", auth, uploadFile("image"), addProduct);
router.get("/product/:id", auth, detailProduct);
router.patch("/product/:id",  auth, uploadFile("image"), updateProduct);
router.delete("/product/:id", auth, deleteProduct);

// category router
router.get("/category", auth, getCategories);
router.post("/category", auth, addCategory);
router.get("/category/:id", auth, getCategory);
router.patch("/category/:id", auth, updateCategory);
router.delete("/category/:id", auth, deleteCategory);

// transaction router
router.post("/transaction", auth, addTransaction);
router.get("/transactions", auth, getTransaction);

module.exports = router;
