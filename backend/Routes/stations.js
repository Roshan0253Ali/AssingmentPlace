const express = require('express');
const auth = require('../Middleware/auth');
// const {
//   getAllStations,
//   createStation,
//   updateStation,
//   deleteStation
// } = require('../controllers/stationController');

const {
  getAllStations,
  createStation,
  updateStation,
  deleteStation
} = require('../StationController/stationController');

const router = express.Router();

router.get('/', auth, getAllStations);
router.post('/', auth, createStation);
router.put('/:id', auth, updateStation);
router.delete('/:id', auth, deleteStation);

module.exports = router;
