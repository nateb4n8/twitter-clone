import { INestApplication } from '@nestjs/common';
import { getApolloServer } from '@nestjs/graphql';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { createTestClient } from 'apollo-server-testing';
import gql from 'graphql-tag';
import { pick } from 'lodash';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/user/user.model';
import { AppModule } from '../src/app.module';

describe('UserResolver (e2e)', () => {
  let app: INestApplication;
  let UserModel: Model<UserDocument>;
  let client: ReturnType<typeof createTestClient>;

  beforeEach(async () => {
    process.env.MONGO_DB = __filename.split('/').pop().split('.').join('-');
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    UserModel = await moduleFixture.get(getModelToken(User.name));
    await UserModel.db.dropDatabase();

    app = moduleFixture.createNestApplication();
    await app.init();

    const apolloServerBase = getApolloServer(app);
    client = createTestClient(apolloServerBase);
  });

  afterEach(async () => {
    await UserModel.db.dropDatabase();
    await app.close();
  });

  describe('user', () => {
    const USER = gql`
      query {
        user(username: "a") {
          id
          username
          createdAt
        }
      }
    `;

    it('returns a single user', async () => {
      const user = new UserModel({ username: 'a' });
      await user.save();
      const pickedProps = 'id username createdAt'.split(' ');
      const expected = pick(user, pickedProps);

      const { data } = await client.query({ query: USER });

      const actual = pick(new UserModel(data.user), pickedProps);
      expect(actual).toEqual(expected);
    });

    it('returns an error when user not found', async () => {
      const { errors, data } = await client.query({ query: USER });

      expect(data).toBeNull();
      expect(errors).toHaveLength(1);
      expect(errors[0].message).toMatch('not found');
    });
  });
});
