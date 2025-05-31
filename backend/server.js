const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./Routes/auth');
const stationRoutes = require('./Routes/stations');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/stations', stationRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("MongoDB connected");
  app.listen(process.env.PORT || 5000, () => {
    console.log("Server running on port 5000");
  });
})
.catch(err => console.error(err));
