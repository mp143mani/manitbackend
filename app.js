const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/UserRoutes");
const taskRouter = require("./routes/routestask");
const InterviewRouter = require("./routes/routesinterview");
const taskSolutionRouter = require("./routes/routestaskSolution");
const webcodeRouter = require("./routes/routeswebcode");
const queryRouter = require("./routes/query");
const classRouter = require("./routes/classroutes");
const { dbUrl } = require("./database");
const { mongoose } = require("mongoose");

console.log(dbUrl);
mongoose
  .connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(
    (res) => {
      console.log(`Database is Connected`);
    },
    (err) => {
      console.log(err);
    }
  );

const logger = require("morgan");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => res.send(`Server Running`));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/task", taskRouter);
app.use("/taskSolution", taskSolutionRouter);
app.use("/interview", InterviewRouter);
app.use("/webcode", webcodeRouter);
app.use("/query", queryRouter);
app.use("/class", classRouter);

app.use(express.urlencoded({ extended: false }));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
