const { DataSource } = require('typeorm');
const { Event } = require('../models/Event');
const { Session } = require('../models/Session');
const { Speaker } = require('../models/Speaker');
const { Participant } = require('../models/Participant');

const AppDataSource = new DataSource({
  type: 'sqlite',
  database: '../databases/event_management.db',
  synchronize: true,
  logging: false,
  entities: [Event, Session, Speaker, Participant],
});

module.exports = { AppDataSource };
