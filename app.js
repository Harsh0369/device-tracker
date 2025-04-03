const express = require("express");
const http = require("http");
const path = require("path");
const socketIo = require("socket.io");
const ejs = require("ejs");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

io.on("connection", function (socket) {
  console.log("A user connected");
});

app.get("/", (req, res) => {
  res.render("index"); 
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
