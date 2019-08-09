// const winston = require('winston');
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
const winston = require('winston');
const { jwtSecret } = require('../../startup/config');

const schema = Joi.object({
  name: Joi.string().min(1).max(30).required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
}).required();

function validateUser(user) {
  return Joi.validate(user, schema);
}

class User {
  constructor({ name, email, password, _id }) {
    this.name = name;
    this.email = email;
    this.password = password;
    this._id = _id;
  }

  generateAuthToken() {
    if (!this._id) {
      return winston.error('cannot make auth token with undefined id');
    }

    const token = jwt.sign({ id: this._id }, jwtSecret);
    return token;
  }
}

exports.User = User;
exports.validate = validateUser;