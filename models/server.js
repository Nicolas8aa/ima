const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../db/config");
const path = require("path");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    // Endpoints
    this.endpoints = {
      auth: "/api/auth",
      employees: "/api/employees",
      store: "/api/store",
      products: "/api/products",
    };
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
    this.app.use(this.endpoints.auth, require("../routes/auth"));
    this.app.use(this.endpoints.employees, require("../routes/employees"));
    this.app.use(this.endpoints.store, require("../routes/store"));
    this.app.use(this.endpoints.products, require("../routes/products"));

    // Any other endpoint call
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
