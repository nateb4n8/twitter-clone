import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DeleteWriteOpResultObject } from 'mongodb';
import { Model, Query } from 'mongoose';
import { User } from 'src/user/user.model';
import { Follow, FollowDocument } from './follow.model';

@Injectable()
export class FollowService {
  constructor(
    @InjectModel(Follow.name) private followModel: Model<FollowDocument>,
  ) {}

  async create(follower: string, followee: string): Promise<FollowDocument> {
    const followFound = await this.followModel.findOne({ followee, follower });
    if (followFound) {
      throw new ConflictException('Follow already exist');
    }
    const follow = new this.followModel();
    follow.followee = followee;
    follow.follower = follower;
    return follow.save();
  }

  async delete(follower: string, followee: string): Promise<FollowDocument> {
    const follow = await this.followModel.findOneAndDelete({
      followee,
      follower,
    });
    if (follow === null) {
      throw new NotFoundException('Follow does not exist');
    }
    return follow;
  }

  async getFollowers(followee: string): Promise<User[]> {
    return this.followModel.aggregate([
      {
        $match: {
          followee,
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'follower',
          foreignField: 'id',
          as: 'follower',
        },
      },
      {
        $unwind: {
          path: '$follower',
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $replaceRoot: {
          newRoot: '$follower',
        },
      },
    ]);
  }

  async getFollowing(follower: string): Promise<User[]> {
    return this.followModel.aggregate([
      {
        $match: {
          follower,
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'followee',
          foreignField: 'id',
          as: 'followee',
        },
      },
      {
        $unwind: {
          path: '$followee',
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $replaceRoot: {
          newRoot: '$followee',
        },
      },
    ]);
  }

  async getFollowerCount(followee: string): Promise<number> {
    return this.followModel.countDocuments({ followee });
  }

  async getFollowingCount(follower: string): Promise<number> {
    return this.followModel.countDocuments({ follower });
  }
}
