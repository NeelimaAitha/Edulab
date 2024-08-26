const validator = require('validator');

function validateParticipant(name, email) {
  const errors = [];

  // Check name length
  if (name.length < 3 || name.length > 50) {
    errors.push({ field: 'name', message: 'Name must be between 3 and 50 characters long' });
  }

  // Check if email is valid
  if (!validator.isEmail(email)) {
    errors.push({ field: 'email', message: 'Email must be a valid email address' });
  }

  return errors;
}

module.exports = { validateParticipant };
