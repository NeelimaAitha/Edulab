const express = require('express');
const router = express.Router();
const EventController = require('../controllers/EventController');

router.post('/events', EventController.createEvent);
router.get('/events/:id', EventController.getEvent);
router.put('/events/:id', EventController.updateEvent);
router.delete('/events/:id', EventController.deleteEvent);
router.post('/events/:id/participants', EventController.registerParticipant);
router.get('/events/:id/report', EventController.generateEventReport);

module.exports = router;
