const EventService = require('../services/EventService');
const PDFService = require('../services/PDFService');
const path = require('path');
const fs = require('fs');

const eventService = new EventService();
const pdfService = new PDFService();

class EventController {
  static async createEvent(req, res) {
    try {
      const event = await eventService.createEvent(req.body);
      res.status(201).json(event);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getEvent(req, res) {
    try {
      const event = await eventService.getEventById(req.params.id);
      res.status(200).json(event);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateEvent(req, res) {
    try {
      const event = await eventService.updateEvent(req.params.id, req.body);
      res.status(200).json(event);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteEvent(req, res) {
    try {
      const { id } = req.params;
      await eventService.deleteEvent(id); // Use the service to delete the event
      res.status(204).send(); // Send a 204 No Content response
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async registerParticipant(req, res) {
    try {
      await eventService.registerParticipant(req.params.id, req.body.name, req.body.email);
      res.status(201).json({ message: 'Participant registered' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async generateEventReport(req, res) {
    try {
      const event = await eventService.getEventById(req.params.id);
      const filePath = pdfService.generateEventReport(event);
      
      res.setHeader('Content-Disposition', `attachment; filename=${path.basename(filePath)}`);
      fs.createReadStream(filePath).pipe(res);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = EventController;
