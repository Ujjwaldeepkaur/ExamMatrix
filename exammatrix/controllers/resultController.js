const fs = require("fs");


// SUBMIT TEST
exports.submitTest = function(req, res) {
    let name = req.body.name;
    let roll = req.body.roll;

    let score = 0;

    if (req.body.q1 === "Central Processing Unit") {
        score++;
    }

    if (req.body.q2 === "Random Access Memory") {
        score++;
    }

    if (req.body.q3 === "CSS") {
        score++;
    }

    let result = {
        name: name,
        roll: roll,
        score: score + "/3"
    };

    let data = fs.readFileSync("./data/results.json");
    let results = JSON.parse(data);

    results.push(result);

    fs.writeFileSync(
        "./data/results.json",
        JSON.stringify(results, null, 2)
    );

    res.send("Test Submitted Successfully");
};


// VIEW RESULTS
exports.viewResults = function(req, res) {
    let data = fs.readFileSync("./data/results.json");
    let results = JSON.parse(data);

    res.render("results", {
        results: results
    });
};