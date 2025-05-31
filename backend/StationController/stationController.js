const Station = require('../Models/Station');

exports.getAllStations = async (req, res) => {
  const stations = await Station.find();
  res.json(stations);
};

exports.createStation = async (req, res) => {
  const station = await Station.create(req.body);
  res.status(201).json(station);
};

exports.updateStation = async (req, res) => {
  const station = await Station.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(station);
};

exports.deleteStation = async (req, res) => {
  await Station.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted successfully' });
};
