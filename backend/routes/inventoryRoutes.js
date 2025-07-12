const express = require('express');
const router = express.Router();
const { getInventory, addMedicine } = require('../controllers/inventoryController');
const Medicine = require('../models/Medicine');

router.get('/', getInventory);
router.post('/', addMedicine);

// ➕ Add these routes:
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, stock, expiry } = req.body;

  try {
    const updated = await Medicine.findByIdAndUpdate(
      id,
      { name, stock, expiry },
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    console.error('Error updating medicine:', error);
    res.status(500).json({ error: 'Failed to update medicine' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Medicine.findByIdAndDelete(id);
    res.json({ message: 'Medicine deleted successfully' });
  } catch (error) {
    console.error('Error deleting medicine:', error);
    res.status(500).json({ error: 'Failed to delete medicine' });
  }
});

module.exports = router;

