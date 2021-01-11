import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTweetInput } from './create-tweet.input';
import { Tweet, TweetDocument } from './tweet.model';

@Injectable()
export class TweetService {
  constructor(
    @InjectModel(Tweet.name) private tweetModel: Model<TweetDocument>,
  ) {}

  async create(
    createTweetInput: CreateTweetInput,
    author: string,
  ): Promise<Tweet> {
    const tweet = new this.tweetModel(createTweetInput);
    tweet.author = author;
    return tweet.save();
  }

  async getById(id: string): Promise<Tweet> {
    return this.tweetModel.findOne({ id });
  }

  async getCountByAuthor(author: string): Promise<number> {
    return this.tweetModel.countDocuments({ author });
  }

  async getByAuthor(author: string): Promise<Tweet[]> {
    return this.tweetModel.find({ author });
  }
}
