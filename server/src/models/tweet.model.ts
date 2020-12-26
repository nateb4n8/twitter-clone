import Joi, { CustomHelpers } from '@hapi/joi';
import { ObjectId } from 'mongodb';

function mongoId(value: string, helpers: CustomHelpers) {
  if (ObjectId.isValid(value)) {
    return helpers.error('Invalid Id');
  }
  return value;
}

export const tweetSchema = Joi.object({
  _id: Joi.any().custom(mongoId),
  creatorId: Joi.any().custom(mongoId).required(),
  body: Joi.string().min(1).max(256).required(),
  createdAt: Joi.date().required(),
  favoritedBy: Joi.array().items(Joi.any().custom(mongoId)),
}).required();

export class Tweet {
  _id: ObjectId;

  creatorId: ObjectId;

  body: string;

  createdAt: Date;

  favoritedBy: ObjectId[];

  constructor({ _id, creatorId, body, createdAt, favoritedBy }: Tweet) {
    this._id = _id;
    this.creatorId = creatorId;
    this.body = body;
    this.createdAt = createdAt || new Date();
    this.favoritedBy = favoritedBy || [];
  }
}
