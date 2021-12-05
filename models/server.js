const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../db/config");
const path = require("path");

// Routes | controllers
const usersRoute = require("../routes/users");
const authRoute = require("../routes/auth");
const employeesRoute = require("../routes/employees");
const marketRoute = require("../routes/market");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    // Connect to db
    this.connectDB();
    // Middlewares
    this.middlewares();
    // Routes
    this.routes();
  }

  async connectDB() {
    await dbConnection();
  }
  middlewares() {
    // Cors
    this.app.use(cors());

    // Read and parse the body
    this.app.use(express.json());

    // Public path
    this.app.use(express.static(path.resolve(__dirname, "../client/build")));
  }

  routes() {
    this.app.use("/api/users", usersRoute);
    this.app.use("/api/auth", authRoute);
    this.app.use("/api/employees", employeesRoute); // next feature
    this.app.use("/api/market", marketRoute);
    this.app.use("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../client/build", "index.html"));
    });
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server running at port", this.port);
    });
  }
}

module.exports = Server;
