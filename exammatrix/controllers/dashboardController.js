const path = require("path");


// HOME PAGE
exports.homePage = function(req, res) {
    res.sendFile(path.join(__dirname, "../public", "index.html"));
};


// LOGIN PAGE
exports.loginPage = function(req, res) {
    res.sendFile(path.join(__dirname, "../public", "login.html"));
};


// OLD DASHBOARD PAGE
exports.dashboardPage = function(req, res) {
    res.sendFile(path.join(__dirname, "../public", "dashboard.html"));
};


// STUDENT DASHBOARD(dynamic username)
exports.studentDashboard = function(req, res) {
    res.render("studentDashboard", {
        username: req.session.user
    });
};


// TEACHER DASHBOARD
exports.teacherDashboard = function(req, res) {
    res.render("teacherDashboard", {
        username: req.session.user
    });
};


// PROFILE PAGE
exports.profilePage = function(req, res) {
    res.render("profile", {
        username: req.session.user || "Student"//send username to EJS page
    });
};


// COOKIE PAGE
exports.setCookie = function(req, res) {
    res.cookie("username", "student");
    res.render("cookie");
};


// SESSION PAGE
exports.setSession = function(req, res) {
    req.session.user = "student";
    res.render("session");
};


// BLOCKING CODE
exports.blockingExample = function(req, res) {
    for (let i = 0; i < 1000000000; i++) {}

    res.send("Blocking Code Example Executed");
};


// NON-BLOCKING CODE
exports.nonBlockingExample = function(req, res) {
    setTimeout(() => {
        res.send("Non-Blocking Code Example Executed");
    }, 1000);
};