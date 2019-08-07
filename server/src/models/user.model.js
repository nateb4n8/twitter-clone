// const winston = require('winston');
const Joi = require('@hapi/joi');

const schema = Joi.object({
  name: Joi.string().min(1).max(30).required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
}).required();

function validateUser(user) {
  return Joi.validate(user, schema);
}

class User {
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
  }
}

exports.User = User;
exports.validate = validateUser;