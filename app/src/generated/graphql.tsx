export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type Follow = {
  __typename?: 'Follow';
  id: Scalars['ID'];
  follower: Scalars['String'];
  followee: Scalars['String'];
  createdAt: Scalars['DateTime'];
};

export type Tweet = {
  __typename?: 'Tweet';
  id: Scalars['ID'];
  author: User;
  favoritedBy: Array<User>;
  body: Scalars['String'];
  createdAt: Scalars['DateTime'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  favoriteTweets: Array<Tweet>;
  username: Scalars['String'];
  location: Scalars['String'];
  createdAt: Scalars['DateTime'];
  followers: Array<User>;
  following: Array<User>;
  followingCount: Scalars['Float'];
  followerCount: Scalars['Float'];
  tweetCount: Scalars['Float'];
  tweets: Array<Tweet>;
};

export type Login = {
  __typename?: 'Login';
  accessToken: Scalars['String'];
  user: User;
};

export type Query = {
  __typename?: 'Query';
  user: User;
  tweet: Tweet;
};

export type QueryUserArgs = {
  username: Scalars['String'];
};

export type QueryTweetArgs = {
  id: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser: User;
  createTweet: Tweet;
  createFollow: Follow;
  deleteFollow: Follow;
  login: Login;
};

export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};

export type MutationCreateTweetArgs = {
  createTweetInput: CreateTweetInput;
};

export type MutationCreateFollowArgs = {
  id: Scalars['String'];
};

export type MutationDeleteFollowArgs = {
  id: Scalars['String'];
};

export type MutationLoginArgs = {
  loginUserInput: LoginUserInput;
};

export type CreateUserInput = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type CreateTweetInput = {
  body: Scalars['String'];
};

export type LoginUserInput = {
  username: Scalars['String'];
  password: Scalars['String'];
};
