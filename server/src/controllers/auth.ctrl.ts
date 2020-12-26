import Joi from '@hapi/joi';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { pick } from 'lodash';
import winston from 'winston';
import { FixMeLater } from '..';
import { User, userSchema } from '../models/user.model';
import { config } from '../startup/config';

const { cookieOptions } = config;

function getUserResponse(userDoc: User) {
  const result = pick(userDoc, [
    'name',
    'handle',
    'location',
    'website',
    'followingCount',
    'followerCount',
    'joinDate',
    'profileImageSrc',
  ]);

  return result;
}

export const signup: FixMeLater = async (req: Request, res: Response) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).send({
      error: error.details[0].message,
    });
  }

  const { email, name, password } = req.body;
  const { db } = res.app.locals;

  let user = await db.users.findOne({ email });
  if (user) {
    return res.status(400).send({
      error: 'Account with email already exist',
    });
  }

  user = new User({ name, email, password });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  const { insertedId: id } = await db.users.insertOne(user);

  user._id = id;
  const token = user.generateAuthToken();
  res.cookie('sid', token, cookieOptions);

  return res.status(201).send(getUserResponse(user));
};

function validateCreds(user: User) {
  const schema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string()
      .regex(/^[a-zA-Z0-9]{5,30}$/)
      .required(),
  });
  return schema.validate(user);
}

export const signin: FixMeLater = async (req: Request, res: Response) => {
  const { error } = validateCreds(req.body);
  if (error) {
    winston.error(error);
    return res.status(400).send({ error: 'Invalid email or password' });
  }

  const { email, password } = req.body;
  const { db } = res.app.locals;

  let user = await db.users.findOne({ email });
  if (!user) {
    winston.error('signin failed: email not found');
    return res.status(400).send({ error: 'Invalid email or password' });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    winston.error('signing failed: invalid password');
    return res.status(400).send({ error: 'Invalid email or password' });
  }

  user = new User(user);
  const token = user.generateAuthToken();
  res.cookie('sid', token, cookieOptions);

  return res.send(getUserResponse(user));
};
