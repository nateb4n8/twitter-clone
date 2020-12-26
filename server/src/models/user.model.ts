import Joi from '@hapi/joi';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import winston from 'winston';
import { config } from '../startup/config';

const { jwtSecret, imageAssetsPath } = config;

export const userSchema = Joi.object({
  name: Joi.string().min(1).max(30).required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string()
    .regex(/^[a-zA-Z0-9]{5,30}$/)
    .required(),

  handle: Joi.string().min(1).max(30),
  location: Joi.string().min(1).max(64),
  followingCount: Joi.number().min(0),
  followerCount: Joi.number().min(0),
  profileImageSrc: Joi.string().min(9),
  followers: Joi.array().items(Joi.string().min(1).max(30)),
  following: Joi.array().items(Joi.string().min(1).max(30)),
  favoriteTweets: Joi.array().items(Joi.string().min(1).max(30)),
}).required();

export class User {
  _id?: any;

  name: any;

  email: any;

  password: any;

  handle?: any;

  location?: any;

  followingCount?: any;

  followerCount?: any;

  profileImageSrc?: any;

  followers?: any;

  following?: any;

  favoriteTweets?: ObjectId[];

  joinDate?: Date;

  constructor({
    _id,
    name,
    email,
    password,
    handle,
    location,
    followingCount,
    followerCount,
    profileImageSrc,
    followers,
    following,
    favoriteTweets,
    joinDate,
  }: Partial<User>) {
    this._id = _id;
    this.name = name;
    this.email = email;
    this.password = password;

    this.handle = handle || email.split('@')[0];
    this.location = location || '';
    this.followingCount = followingCount || 0;
    this.followerCount = followerCount || 0;
    this.profileImageSrc = profileImageSrc || `${imageAssetsPath}/profileImages/${this.handle}`;
    this.followers = followers || [];
    this.following = following || [];
    this.favoriteTweets = favoriteTweets || [];
    this.joinDate = joinDate || new Date();
  }

  generateAuthToken() {
    if (!this._id) {
      return winston.error('cannot make auth token with undefined id');
    }

    const token = jwt.sign(
      {
        id: this._id,
        handle: this.handle,
      },
      jwtSecret,
    );
    return token;
  }
}
