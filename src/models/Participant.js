const { EntitySchema } = require('typeorm');

module.exports.Participant = new EntitySchema({
  name: 'Participant',
  tableName: 'participants',
  columns: {
    id: { type: 'int', primary: true, generated: true },
    name: { type: 'varchar' },
    email: { type: 'varchar' },
    eventId: { type: 'int' },
  },
  relations: {
    event: {
      target: 'Event',
      type: 'many-to-one',
      inverseSide: 'participants',
      joinColumn: { name: 'eventId' },
    },
  },
});
