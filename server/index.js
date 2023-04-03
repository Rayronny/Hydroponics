const express = require("express");
const cors = require("cors");
const app = express();
const morgan = require("morgan");

// app level middlweware
app.use(morgan("common"));
app.use(express.json());
app.use(cors("*"));

const port = process.env.PORT || 5557;

// a server for socket io
var server = require("http").createServer(app);
const socketio = require("socket.io");
const WebSockets = require("./helpers/WebSockets");
global.io = socketio(server);
global.io.on("connection", WebSockets.connection);

//
app.use("/", require("./routes/light"));


app.get("/", (req, res) => {
    res.send({
      message: "Hydoponics sever working",
    });
  });
  
  //not found handler
  app.use((req, res, next) => {
    const error = new Error(`Not found - ${req.originalUrl}`);
    res.status(404);
    next(error);
  });
  
  //error handling middleware
  app.use((error, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    console.log(error);
    res.send({
      message: error.message,
      stack:
        process.env.NODE_ENV === "production"
          ? "you are in production"
          : error.stack,
    });
  });
  
  // the listener
  server.listen(port, (err) => {
    if (err) {
      console.log("There was an error :- ", err);
    } else {
      console.log(`Server Up On Port ${port}`);
    }
  });