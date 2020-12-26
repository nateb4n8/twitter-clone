import { Response, Request } from 'express';
import { ObjectId } from 'mongodb';
import winston from 'winston';
import { FixMeLater } from '..';
import { Tweet, tweetSchema } from '../models/tweet.model';

export const createTweet: FixMeLater = async (req: Request, res: Response) => {
  const { id } = res.locals.auth.token;
  const tweet = new Tweet({
    ...req.body,
    creatorId: id,
  });
  const { error } = tweetSchema.validate(tweet);
  if (error) return res.status(400).send(error.details[0].message);

  const { db } = res.app.locals;
  let result;
  try {
    result = await db.tweets.insertOne(tweet);
  } catch (e) {
    winston.error(e);
    return res.sendStatus(500);
  }

  if (result) {
    return res.send(result.ops[0]);
  }
  return res.status(404).send('What the??');
};

export const getTweetsByUser: FixMeLater = async (req: Request, res: Response) => {
  const { handle } = req.query;
  if (!handle) return res.status(400).send('handle is required');

  const { id } = res.locals.auth.token;
  const { db } = res.app.locals;

  try {
    const user = await db.users.findOne({ handle });
    if (user === null) return res.status(404).send('User not found');

    const { _id: creatorId, name: creatorName } = user;
    const tweets = await db.tweets
      .find({ creatorId })
      .sort({ createdAt: -1 })
      .project({ _id: 1, body: 1, createdAt: 1, favoritedBy: 1 })
      .toArray();

    return res.send({
      tweets: tweets.map(({ _id, favoritedBy = [], ...rest }) => ({
        id: _id,
        creatorName,
        creatorHandle: handle,
        isFavorite: favoritedBy.includes(id),
        ...rest,
      })),
    });
  } catch (error) {
    winston.error(error);
    return res.sendStatus(500);
  }
};

export const deleteTweet: FixMeLater = async (req: Request, res: Response) => {
  const { id } = res.locals.auth.token;
  const tweetId = String(req.query.id);
  if (!ObjectId.isValid(tweetId)) {
    return res.status(400).send('invalid tweet id provided');
  }

  const { db } = res.app.locals;
  let result;
  try {
    result = await db.tweets.deleteOne({
      _id: new ObjectId(tweetId),
      creatorId: id,
    });
  } catch (error) {
    winston.error(error);
    return res.sendStatus(500);
  }
  if (result.deletedCount === 1) {
    return res.send('ok');
  }
  return res.status(404).send('Tweet was not found');
};
