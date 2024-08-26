const { AppDataSource } = require('../config/database');
const { Event } = require('../models/Event');
const { validateParticipant } = require('../utils/validation');

class EventService {
  constructor() {
    this.eventRepository = AppDataSource.getRepository(Event);
  }

  async createEvent(eventData) {
    const event = this.eventRepository.create(eventData);
    return await this.eventRepository.save(event);
  }

  async getEventById(eventId) {
    return await this.eventRepository.findOne({
      where: { id: eventId },
      relations: ['sessions', 'sessions.speakers', 'participants'],
    });
  }

  async updateEvent(eventId, updateData) {
    await this.eventRepository.update(eventId, updateData);
    return this.getEventById(eventId);
  }

  async deleteEvent(eventId) {
    // Fetch the event with its related sessions and participants
    const event = await this.getEventById(eventId);
    if (!event) {
        throw new Error('Event not found');
    }

    // Start a transaction to ensure atomicity
    await AppDataSource.transaction(async transactionalEntityManager => {
        // Step 1: Delete all participants related to the event
        if (event.participants && event.participants.length > 0) {
            await Promise.all(event.participants.map(participant => 
                transactionalEntityManager.delete('Participant', participant.id)
            ));
        }

        // Step 2: Delete all sessions related to the event
        if (event.sessions && event.sessions.length > 0) {
            await Promise.all(event.sessions.map(session => 
                transactionalEntityManager.delete('Session', session.id)
            ));
        }

        // Step 3: Delete the event itself
        await transactionalEntityManager.delete('Event', eventId);
    });

    return { message: `Event with ID ${eventId} and all related data have been deleted.` };
}

  async registerParticipant(eventId, name, email) {
    const errors = await validateParticipant(name, email);
    if (errors.length > 0) {
      throw new Error('Validation failed: ' + JSON.stringify(errors));
    }

    const event = await this.getEventById(eventId);
    if (!event) throw new Error('Event not found');
    
    if (event.participants.length >= 100) { // Example limit
      throw new Error('Event is full');
    }

    event.participants.push({ name, email });
    await this.eventRepository.save(event);
  }
}

module.exports = EventService;
