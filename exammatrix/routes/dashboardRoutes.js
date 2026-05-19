const express = require("express");
const router = express.Router();

const dashboardController = require("../controllers/dashboardController");


// HOME PAGE
router.get("/", dashboardController.homePage);


// LOGIN PAGE
router.get("/login-page", dashboardController.loginPage);


// OLD DASHBOARD PAGE
router.get("/dashboard", dashboardController.dashboardPage);


// STUDENT DASHBOARD
router.get("/student-dashboard", dashboardController.studentDashboard);


// TEACHER DASHBOARD
router.get("/teacher-dashboard", dashboardController.teacherDashboard);


// PROFILE PAGE
router.get("/profile", dashboardController.profilePage);


// COOKIE PAGE
router.get("/set-cookie", dashboardController.setCookie);


// SESSION PAGE
router.get("/set-session", dashboardController.setSession);


// BLOCKING CODE
router.get("/blocking", dashboardController.blockingExample);


// NON-BLOCKING CODE
router.get("/non-blocking", dashboardController.nonBlockingExample);


module.exports = router;