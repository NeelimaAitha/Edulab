const { EntitySchema } = require('typeorm');

module.exports.Speaker = new EntitySchema({
  name: 'Speaker',
  tableName: 'speakers',
  columns: {
    id: { type: 'int', primary: true, generated: true },
    name: { type: 'varchar' },
    topic: { type: 'varchar' },
  },
  relations: {
    session: {
      target: 'Session',
      type: 'many-to-one',
      inverseSide: 'speakers',
    },
  },
});
