const http = require("http");
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const socketIo = require("socket.io");

const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");

// ROUTES
const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const testRoutes = require("./routes/testRoutes");
const resultRoutes = require("./routes/resultRoutes");

// ST3 ROUTE
const assignmentRoutes = require("./routes/assignmentRoutes");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// EJS
app.set("view engine", "ejs");

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(session({
    secret: "examsecret",
    resave: false,
    saveUninitialized: true
}));

app.use(logger);

// STATIC FILES
app.use("/materials", express.static("materials"));
app.use(express.static("public"));

// ST3 UPLOADS FOLDER
app.use("/uploads", express.static("uploads"));

// MONGODB CONNECTION
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log("MongoDB Connected");
})
.catch((err) => {
    console.log("MongoDB Error:", err);
});

// ROUTES
app.use("/", authRoutes);
app.use("/", dashboardRoutes);
app.use("/", testRoutes);
app.use("/", resultRoutes);

// ST3 ROUTES
app.use("/", assignmentRoutes);

// SOCKET.IO
io.on("connection", function(socket) {

    console.log("User Connected");

    socket.on("chat message", function(msg) {

        io.emit("chat message", msg);

    });

});

// ERROR HANDLER
app.use(errorHandler);

// SERVER START
const PORT = process.env.PORT || 3000;

server.listen(PORT, function() {
    console.log("Server Started on Port " + PORT);
});