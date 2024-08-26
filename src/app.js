const express = require('express');
const { AppDataSource } = require('./config/database');
const eventRoutes = require('./routes/eventRoutes');

const app = express();

app.use(express.json());
app.use('/api', eventRoutes);

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
    return AppDataSource.query('PRAGMA foreign_keys = ON;');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });

module.exports = app;
