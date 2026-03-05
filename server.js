const express = require('express');
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/carbaazaar';

mongoose.connect(MONGODB_URI).then(() => {
  console.log('MongoDB connected successfully');
}).catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

const vehicleSchema = new mongoose.Schema({
  vin: { type: String, required: true, unique: true },
  registrationNumber: { type: String, required: true },
  make: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  services: [{
    serviceCenterId: String,
    mileage: Number,
    serviceType: String,
    totalCost: Number
  }],
  ownerHistory: [mongoose.Schema.Types.Mixed],
  insurance: [mongoose.Schema.Types.Mixed],
  accidents: [mongoose.Schema.Types.Mixed]
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

const app = express();

app.use(express.json());
app.use(express.static('public'));

app.post('/vehicles', async (req, res) => {
  try {
    const { vin, registrationNumber, make, model, year } = req.body;

    // Basic validation
    if (!vin || !registrationNumber || !make || !model || !year) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const vehicle = new Vehicle({ vin, registrationNumber, make, model, year, services: [], ownerHistory: [], insurance: [], accidents: [] });
    await vehicle.save();

    res.status(201).json(vehicle);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/vehicles/:vin/services', async (req, res) => {
  try {
    const { vin } = req.params;
    const vehicle = await Vehicle.findOne({ vin });
    if (!vehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }
    const { serviceCenterId, mileage, serviceType, totalCost } = req.body;
    if (!serviceCenterId || !mileage || !serviceType || !totalCost) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const service = { serviceCenterId, mileage, serviceType, totalCost };
    vehicle.services.push(service);
    await vehicle.save();
    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/vehicles/:vin/history', async (req, res) => {
  try {
    const { vin } = req.params;
    const vehicle = await Vehicle.findOne({ vin });
    if (!vehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }
    const history = {
      ownerHistory: vehicle.ownerHistory,
      serviceRecords: vehicle.services,
      insurance: vehicle.insurance,
      accidents: vehicle.accidents
    };
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/vehicles', async (req, res) => {
  try {
    const vehicles = await Vehicle.find({}, 'vin registrationNumber make model year');
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});