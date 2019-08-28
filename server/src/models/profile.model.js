const Joi = require('@hapi/joi');

const schema = Joi.object({
  name: Joi.string().min(1).max(64).required(),
  handle: Joi.string().min(1).max(36).required(),
  // email: Joi.string().email({ minDomainSegments: 2 }).required(),
  
  location: Joi.string().max(128).allow(''),
  website: Joi.string().max(128).allow(''),

}).required();

function validate(user) {
  return Joi.validate(user, schema);
}

// exports.User = User;
exports.validateProfile = validate;