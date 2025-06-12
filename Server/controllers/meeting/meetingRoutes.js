const express = require('express');
const router = express.Router();
const meetingController = require('./meeting'); // <-- this is your current file

// Define RESTful routes
router.post('/', meetingController.add);
router.get('/', meetingController.index);
router.get('/:id', meetingController.view);
router.delete('/:id', meetingController.deleteData);
router.post('/bulk-delete', meetingController.deleteMany);

module.exports = router;
