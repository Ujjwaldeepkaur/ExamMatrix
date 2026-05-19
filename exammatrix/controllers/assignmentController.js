const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


// SHOW ASSIGNMENT PAGE
exports.assignmentPage = function(req, res) {
    res.render("uploadAssignment");
};


// CREATE ASSIGNMENT
exports.createAssignment = async function(req, res) {

    try {

        const assignment = await prisma.assignment.create({
            data: {
                title: req.body.title,
                subject: req.body.subject,
                description: req.body.description,
                fileUrl: req.file.filename
            }
        });

        res.send(`
            <html>
            <head>
                <title>Assignment Uploaded</title>
            </head>

            <body style="
                font-family: Arial;
                text-align:center;
                background:#e8f5e9;
                padding-top:100px;
            ">

                <h1>Assignment Uploaded Successfully</h1>

                <h2>${assignment.title}</h2>

                <a href="/assignments">
                    View Assignments
                </a>

            </body>
            </html>
        `);

    } catch(err) {

        console.log(err);
        res.send("Assignment Upload Error");

    }
};


// VIEW ASSIGNMENTS
exports.viewAssignments = async function(req, res) {

    const assignments = await prisma.assignment.findMany();

    res.render("assignments", {
        assignments: assignments
    });

};