import { AppDataSource } from '../config/database.js';
import { Participant } from '../models/Participant.js';
import { ParticipantValidation } from '../utils/validation.js';


export class ParticipantService {
  constructor() {
    this.participantRepository = AppDataSource.getRepository(Participant);
  }

  async registerParticipant(event, participantData) {
    await ParticipantValidation.validate(participantData);

    const participantCount = await this.participantRepository.count({
      where: { event: event.id },
    });

    if (participantCount >= event.participantLimit) {
      throw new Error('Participant limit reached for this event.');
    }

    const participant = this.participantRepository.create({ ...participantData, event });
    return await this.participantRepository.save(participant);
  }
}
