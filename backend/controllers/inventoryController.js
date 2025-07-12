const Medicine = require('../models/Medicine');

const getInventory = async (req, res) => {
    const meds = await Medicine.find({});
    res.json(meds);
};

const addMedicine = async (req, res) => {
    const { name, stock, expiry } = req.body;
    const newMed = new Medicine({ name, stock, expiry });
    await newMed.save();
    res.json(newMed);
};

module.exports = { getInventory, addMedicine };
