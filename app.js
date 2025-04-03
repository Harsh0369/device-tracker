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
    socket.on("send-location", function (data) {
      io.emit("recieve-location",{id:socket.id, ...data})
    })
  console.log("New user connected");
  socket.on("disconnect", function () {
    io.emit("user-disconnected", { id: socket.id });
    console.log("User disconnected");
  });
});

app.get("/", (req, res) => {
  res.render("index"); 
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
