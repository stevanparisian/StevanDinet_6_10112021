const express = require('express');
const morgan = require('morgan');
require('./database/dbConfig');
const path = require('path');
const usersRoutes = require('./routes/usersRoutes')
const saucesRoutes = require('./routes/saucesRoutes')

const app = express();

app.use(morgan('dev'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/auth", usersRoutes)
app.use("/api/sauces", saucesRoutes)



module.exports = app;