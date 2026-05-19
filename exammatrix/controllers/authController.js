const fs = require("fs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");


// REGISTER USER
exports.registerUser = async function(req, res) {
    try {
        let user = req.body;

        // Password hashing using bcrypt
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;

        // Save in users.json
        let data = fs.readFileSync("./data/users.json");
        let users = JSON.parse(data);

        users.push(user);

        fs.writeFileSync(
            "./data/users.json",
            JSON.stringify(users, null, 2)
        );

        // Save in MongoDB
        await User.create(user);

        // Redirect to login page
        res.redirect("/login.html");

    } catch (err) {
        res.send("Registration Error");
    }
};


// LOGIN USER
exports.loginUser = async function(req, res) {
    let email = req.body.email;
    let password = req.body.password;

    // Read users from JSON
    let data = fs.readFileSync("./data/users.json");
    let users = JSON.parse(data);

    let found = users.find(function(u) {
        return u.email == email;
    });

    if (!found) {
        return res.send("User Not Found");
    }

    // Compare password using bcrypt
    const match = await bcrypt.compare(password, found.password);

    if (match) {

        // Store logged-in username in session
        req.session.user = found.name;

        // JWT token generation
        const token = jwt.sign(
            { email: email },
            "jwtsecret"
        );

        console.log("JWT Token Generated:", token);

        // Role-based redirect
        if (found.role === "student") {
            res.redirect("/student-dashboard");
        }
        else if (found.role === "teacher") {
            res.redirect("/teacher-dashboard");
        }
        else {
            res.redirect("/dashboard");
        }

    } else {
        res.send("Invalid Password");
    }
};


// VIEW ALL STUDENTS
exports.viewStudents = function(req, res) {
    let data = fs.readFileSync("./data/users.json");
    let users = JSON.parse(data);

    res.send(users);
};