require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const sequelize = require("./config/database");

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

// Import routes
const userRoutes = require("./routes/users");


// Use routes
app.use("/api/users", userRoutes);

const server = app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
);

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;


