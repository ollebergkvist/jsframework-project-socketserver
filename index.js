// Dotenv
require("dotenv").config(); // Requires and configs dotenv

// Express server
const express = require("express");
const app = express();

// Socket.io
const server = require("http").createServer(app);
const io = require("socket.io")(server);
io.origins([process.env.SOCKET_ORIGIN]); // Allows defined client to communicate with server

// Imitate stocks
const rate = require("./models/stock");

// Data
var apple = {
  label: "Apple Inc",
  rate: 1.002,
  variance: 1.9,
  startingPoint: 120,
  data: [],
  borderWidth: 2,
  borderColor: "#0275d8",
  labels: [],
};

var walmart = {
  label: "Walmart Inc",
  rate: 1.001,
  variance: 0.2,
  startingPoint: 122,
  data: [],
  borderWidth: 2,
  borderColor: "#5cb85c",
  labels: [],
};

var stocks = [apple, walmart];

setInterval(() => {
  stocks.map((stock) => {
    if (stock.data.length > 12) {
      stock.data.shift();
    }
    if (stock.labels.length > 12) {
      stock.labels.shift();
    }
    stock.labels.push(new Date().toLocaleTimeString("sv-SE"));
    stock.data.push(rate.getStockPrice(stock));

    return stock;
  });
  console.log(stocks);
  io.emit("stocks", stocks);
}, 5000);

// Creates socket.io connection
io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", function () {
    console.log("user disconnected");
  });
});

// Starts server and sets what port to listen to
server.listen(process.env.EXPRESS_PORT, () => {
  console.log("Express server is up and running"); // Prints server message
});