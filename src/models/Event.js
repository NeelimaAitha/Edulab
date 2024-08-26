const { EntitySchema } = require('typeorm');

module.exports.Event = new EntitySchema({
  name: 'Event',
  tableName: 'events',
  columns: {
    id: { type: 'int', primary: true, generated: true },
    name: { type: 'varchar' },
    description: { type: 'varchar' },
    date: { type: 'date' },
  },
  relations: {
    sessions: {
      target: 'Session',
      type: 'one-to-many',
      inverseSide: 'event',
      cascade: true,
      onDelete: 'CASCADE',
    },
    participants: {
      target: 'Participant',
      type: 'one-to-many',
      inverseSide: 'event',
      cascade: true,
      onDelete: 'CASCADE',
    },
  },
});
