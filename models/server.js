const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../db/config");
const path = require("path");

// Routes / controllers
const userRoutes = require("../routes/users");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    // Load middlewares
    this.middlewares();

    // Routes
    this.routes();

    // Connect to db
    this.connectDB();

    // Running server
    this.listen();
  }

  async connectDB() {
    await dbConnection();
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // Read and parse the body
    this.app.use(express.json());

    // Public path
    this.app.use(express.static("client/build"));
  }

  routes() {
    // Api endpoints
    this.app.use("/api/users", userRoutes);

    // Application routes
    this.app.use("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../client/build/index.html"));
    });
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server running at port", this.port);
    });
  }
}

module.exports = Server;
