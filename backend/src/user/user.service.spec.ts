import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { Model, Query } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './user.model';
import { UserService } from './user.service';

type SetupItems = {
  userService: UserService;
  userModel: Model<UserDocument>;
};

async function setup(): Promise<SetupItems> {
  const module = await Test.createTestingModule({
    providers: [
      UserService,
      {
        provide: getModelToken(User.name),
        useFactory: jest.fn().mockReturnValue(jest.fn()),
      },
    ],
  }).compile();
  const userService = await module.get(UserService);
  const userModel = await module.get(getModelToken(User.name));
  return { userService, userModel };
}

describe('UserService', () => {
  describe('create', () => {
    const user = { username: 'a', password: 'b' };
    it('encrypts users password before saving', async () => {
      let passwordWhenSaved = '';
      const { userService, userModel } = await setup();
      jest
        .spyOn(userModel.prototype, 'constructor')
        .mockImplementationOnce(() => ({
          ...user,
          save: function Save(): void {
            passwordWhenSaved = this.password;
          },
        }));

      await userService.create(user);

      const rounds = bcrypt.getRounds(passwordWhenSaved);
      expect(rounds).toBeGreaterThanOrEqual(1);
    });

    it('returns created user', async () => {
      const { userService, userModel } = await setup();
      jest
        .spyOn(userModel.prototype, 'constructor')
        .mockImplementationOnce(() => ({
          ...user,
          save: jest.fn().mockResolvedValueOnce(user),
        }));

      const actual = await userService.create(user);

      expect(actual).toEqual(user);
    });
  });

  describe('getById', () => {
    it('returns a user', async () => {
      const expected = ('a' as unknown) as Query<UserDocument, UserDocument>;
      const { userService, userModel } = await setup();
      userModel.findOne = jest.fn().mockResolvedValueOnce(expected);

      const actual = await userService.getById('');

      expect(actual).toBe(expected);
    });
  });

  describe('getByUsername', () => {
    it('returns a user', async () => {
      const expected = ('a' as unknown) as Query<UserDocument, UserDocument>;
      const { userService, userModel } = await setup();
      userModel.findOne = jest.fn().mockResolvedValueOnce(expected);

      const actual = await userService.getByUsername('');

      expect(actual).toBe(expected);
    });
  });

  describe('getManyByIds', () => {
    it('returns an array of users', async () => {
      const { userService, userModel } = await setup();
      const expected = ['a', 'b'];
      userModel.find = jest.fn().mockResolvedValueOnce(expected);

      const actual = await userService.getManyByIds([]);

      expect(actual).toEqual(expected);
    });
  });
});
