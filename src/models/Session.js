const { EntitySchema } = require('typeorm');

module.exports.Session = new EntitySchema({
  name: 'Session',
  tableName: 'sessions',
  columns: {
    id: { type: 'int', primary: true, generated: true },
    title: { type: 'varchar' },
    duration: { type: 'int' },
    eventId: { type: 'int' }, 
  },
  relations: {
    event: {
      target: 'Event',
      type: 'many-to-one',
      inverseSide: 'sessions',
      joinColumn: { name: 'eventId' },
    },
    speakers: {
      target: 'Speaker',
      type: 'one-to-many',
      inverseSide: 'session',
      cascade: true,
    },
  },
});
