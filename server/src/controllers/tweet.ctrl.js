const winston = require('winston');
const { ObjectId } = require('mongodb');
const { Tweet, tweetSchema} = require('../models/tweet.model');


async function createTweet(req, res) {
  const { id } = req.token;
  const tweet = new Tweet({
    ...req.body,
    creatorId: new ObjectId(id),
  })
  const { error } = tweetSchema.validate(tweet);
  if (error) return res.status(404).send(error.details[0].message);

  const { db } = req.app.locals;
  let result;
  try {
    result = await db.tweets.insertOne(tweet);
  } catch (error) {
    winston.error(error);
    return res.sendStatus(500);
  }
  
  if (result) {
    res.send(result.ops[0]);
  } else {
    res.status(404).send('What the??');
  }
}

async function getTweetsByUser(req, res) {
  const { handle } = req.query;
  if (!handle) return res.status(400).send('handle is required');

  const { db } = req.app.locals;
  let tweets;
  try {
    const { _id: creatorId, name: creatorName } = await db.users.findOne({ handle });
    tweets = await db.tweets.find({ creatorId })
      .sort({ createdAt: -1 })
      .project({ _id: 1, body: 1, createdAt: 1 })
      .toArray();
    tweets = tweets.map(({ _id: id, ...rest }) => ({
      id,
      creatorName,
      creatorHandle: handle,
      ...rest
    }));
  } catch (error) {
    winston.error(error);
    return res.sendStatus(500);
  }
  
  if (tweets) {
    res.send({ tweets });
  } else {
    res.status(404).send('User not found');
  }
}

async function deleteTweet(req, res) {
  const { id } = req.token;
  const { id: tweetId } = req.query;
  if (!ObjectId.isValid(tweetId)) {
    return res.status(400).send('invalid tweet id provided');
  }

  const { db } = req.app.locals;
  let result;
  try {
    result = await db.tweets.deleteOne({
      _id: ObjectId(tweetId),
      creatorId: ObjectId(id),
    });
  } catch (error) {
    winston.error(error);
    return res.sendStatus(500);
  }
  if (result.deletedCount === 1) {
    res.send('ok');
  } else {
    res.status(404).send('Tweet was not found');
  }
}

module.exports = {
  createTweet,
  getTweetsByUser,
  deleteTweet,
};