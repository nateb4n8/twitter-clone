const Joi = require('@hapi/joi');
const { ObjectId } = require('mongodb');

function mongoId(value, helpers) {
  if (ObjectId.isValid(value)) {
    return value;
  }
  return helpers.message('mongo ObjectId is invalid')
}

const schema = Joi.object({
  _id: Joi.any().custom(mongoId),
  creatorId: Joi.any().custom(mongoId).required(),
  body: Joi.string().min(1).max(256).required(),
  createdAt: Joi.date().required(),
  favoritedBy: Joi.array().items(Joi.any().custom(mongoId)),
}).required();

class Tweet {
  constructor({ id, creatorId, body, createdAt, favoritedBy }) {
    this._id = id;
    this.creatorId = creatorId;
    this.body = body;
    this.createdAt = createdAt || new Date();
    this.favoritedBy = favoritedBy || [];
  }
}

module.exports = {
  Tweet,
  tweetSchema: schema,
};

