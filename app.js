const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const notesRoute = require("./routes/notesRoutes");
const mentorRoute = require("./routes/mentorRoute");
const userRoute = require("./routes/userRoute");
const calenderRoute = require("./routes/calenderRouts");
const tnpRoute = require("./routes/t&pRoute");
const globalErrorHandler = require("./controller/errorController");
const AppError = require("./utility/catchAsync");
const chatRoute = require("./routes/chatRoute");
const messageRoute = require("./routes/messageRoute");
const adminRoute = require("./routes/adminRoute");

const app = express();
app.use(cors());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.cookies);
  next();
});

app.use("/api/v1/notes", notesRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/calender", calenderRoute);
app.use("/api/v1/internship", tnpRoute);
app.use("/api/v1/chat", chatRoute);
app.use("/api/v1/messages", messageRoute);
app.use("/api/v1/admin", adminRoute);
app.use("/api/v1/mentor", mentorRoute);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.use(globalErrorHandler);

module.exports = app;
