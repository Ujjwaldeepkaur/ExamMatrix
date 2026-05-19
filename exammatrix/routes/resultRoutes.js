const express = require("express");
const router = express.Router();

const resultController = require("../controllers/resultController");


// SUBMIT TEST
router.post("/submitTest", resultController.submitTest);


// VIEW RESULTS
router.get("/results", resultController.viewResults);


module.exports = router;