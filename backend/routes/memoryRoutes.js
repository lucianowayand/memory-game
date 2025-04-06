const express = require('express');
const { saveGameData, getGameDataByUserId } = require('../controllers/memoryController');
const router = express.Router();

// Route to save game data
router.post('/save', saveGameData);

// Route to get game data by user ID
router.get('/user/:userId', getGameDataByUserId);

module.exports = router;
