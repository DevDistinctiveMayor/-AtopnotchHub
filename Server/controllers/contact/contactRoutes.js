const express = require('express');
const router = express.Router();
const { getAllContacts } = require('./contactController');

router.get('/', getAllContacts); // GET /api/contact

module.exports = router;
