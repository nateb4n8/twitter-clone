import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CreateUserInput } from './create-user.input';
import { User, UserDocument } from './user.model';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserInput: CreateUserInput): Promise<UserDocument> {
    const user = new this.userModel(createUserInput);
    user.password = await bcrypt.hash(user.password, 10);
    return user.save();
  }

  async getById(id: string): Promise<User | null> {
    return this.userModel.findOne({ id });
  }

  async getByUsername(username: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ username });
  }

  async getManyByIds(ids: string[]): Promise<UserDocument[]> {
    return this.userModel.find({ id: { $in: ids } });
  }
}
