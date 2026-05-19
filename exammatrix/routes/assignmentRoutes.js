const express = require("express");
const router = express.Router();
const multer = require("multer");

const assignmentController = require("../controllers/assignmentController");


// MULTER STORAGE
const storage = multer.diskStorage({

    destination: function(req, file, cb) {
        cb(null, "uploads");
    },

    filename: function(req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }

});

const upload = multer({
    storage: storage
});


// ROUTES
router.get("/upload-assignment",
    assignmentController.assignmentPage
);

router.post(
    "/create-assignment",
    upload.single("file"),
    assignmentController.createAssignment
);

router.get(
    "/assignments",
    assignmentController.viewAssignments
);


module.exports = router;