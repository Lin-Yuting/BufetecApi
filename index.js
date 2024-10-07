require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const sequelize = require("./config/database");

// Habilitar CORS para todos los orígenes
app.use(cors());

app.use(express.json());

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
    return sequelize.sync(); // Esta línea sincroniza los modelos con la base de datos.
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

app.get("/", (req, res) =>
  res.send("<h1> Welcome api webserver</h1>").status(200)
);

app.get("/test", (req, res) => res.send("test").status(200));

// Import routes
const userRoutes = require("./routes/users");

// Use routes
app.use("/api/users", userRoutes);

// Exports app to be used in testing, app.js executes the app
module.exports = app;
