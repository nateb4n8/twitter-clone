const Joi = require('@hapi/joi');
const Jimp = require('jimp');

const schema = Joi.object({
  name: Joi.string().min(1).max(64).required(),
  handle: Joi.string().min(1).max(36).required(),
  // email: Joi.string().email({ minDomainSegments: 2 }).required(),
  
  location: Joi.string().max(128).allow(''),
  website: Joi.string().max(128).allow(''),
  profileImage: Joi.object({
    data: Joi.string().min(1).required(),
    mimetype: Joi.string().valid(Jimp.MIME_JPEG).required(),
  }),
}).required();


// exports.User = User;
exports.profileSchema = schema