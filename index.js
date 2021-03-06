// Dotenv
require("dotenv").config(); // Requires and configs dotenv

// Express server
const express = require("express");
const app = express();
const server = require("http").createServer(app);

// Cors
const cors = require("cors");

// Rate calculation
const rate = require("./models/stock");

// Socket.io
const io = require("socket.io")(server, {
  handlePreflightRequest: (req, res) => {
    const headers = {
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Allow-Origin": req.headers.origin,
      "Access-Control-Allow-Credentials": true,
    };
    res.writeHead(200, headers);
    res.end();
  },
});

app.use(cors());

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

// Creates socket.io connection
io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", function () {
    console.log("user disconnected");
  });
});

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

// Starts server and sets what port to listen to
server.listen(process.env.EXPRESS_PORT, () => {
  console.log("Express server is up and running"); // Prints msg
});
