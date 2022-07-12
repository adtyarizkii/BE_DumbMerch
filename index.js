const express = require("express");
const app = express();
require("dotenv").config()


const port = 5000;

app.use("/uploads", express.static("uploads"))

const router = require("./src/routes")

app.use(express.json());

app.listen(port, () => {
    console.log('Server running on Port:', port);
});

app.use("/api/v1/", router)
