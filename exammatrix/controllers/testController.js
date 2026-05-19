const fs = require("fs");


// CREATE TEST
exports.createTest = function(req, res) {
    let test = {
        testName: req.body.testName,
        subject: req.body.subject,
        question: req.body.question,
        option1: req.body.option1,
        option2: req.body.option2,
        option3: req.body.option3,
        option4: req.body.option4,
        answer: req.body.answer
    };

    let data = fs.readFileSync("./data/tests.json");
    let tests = JSON.parse(data);

    tests.push(test);

    fs.writeFileSync(
        "./data/tests.json",
        JSON.stringify(tests, null, 2)
    );

    res.send("Test Created Successfully");
};


// VIEW TESTS
exports.viewTests = function(req, res) {
    let data = fs.readFileSync("./data/tests.json");
    let tests = JSON.parse(data);

    res.render("tests", {
        tests: tests
    });
};


// ROUTE PARAMETER
exports.singleTest = function(req, res) {
    let id = req.params.id;

    let data = fs.readFileSync("./data/tests.json");
    let tests = JSON.parse(data);

    res.send(tests[id]);
};