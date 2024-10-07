require("dotenv").config();
const express = require("express");
const app = express();
const sequelize = require("./config/database");
const Event = require('./model/Event');

const { syncCalendlyToGoogleCalendar } = require('./syncCalendlyToGoogle');

// Import and configure node-cron
const cron = require('node-cron');

// Import OAuth routes
const authRoutes = require('./routes/auth');

app.use(express.json());

// Use OAuth routes
app.use('/api/auth', authRoutes);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
    return sequelize.sync(); // Sync all defined models to the DB
  })
  .then(() => {
    console.log("Database synchronized successfully.");
    // Initial synchronization on server startup
    syncCalendlyToGoogleCalendar();

    // Schedule synchronization every hour
    cron.schedule('0 * * * *', () => {
      console.log('Running scheduled synchronization task...');
      syncCalendlyToGoogleCalendar();
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

app.get("/", (req, res) =>
  res.status(200).send("<h1> Welcome api webserver</h1>")
);

app.get("/test", (req, res) => res.status(200).send("test"));

// Import user routes
const userRoutes = require("./routes/users");

// Use user routes
app.use("/api/users", userRoutes);

// Export the app for testing or other uses
module.exports = app;