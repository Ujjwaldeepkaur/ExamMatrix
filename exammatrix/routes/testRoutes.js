const express = require("express");
const router = express.Router();

const testController = require("../controllers/testController");


// CREATE TEST
router.post("/createTest", testController.createTest);


// VIEW TESTS
router.get("/tests", testController.viewTests);


// SINGLE TEST
router.get("/test/:id", testController.singleTest);


module.exports = router;