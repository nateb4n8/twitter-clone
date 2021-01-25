import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty, IsUUID, Length } from 'class-validator';
import { Document } from 'mongoose';
import { classValidator } from 'src/schema.hooks';
import { User } from 'src/user/user.model';
import { v4 as uuidv4 } from 'uuid';

@Schema()
@ObjectType()
export class Tweet {
  @Prop({ default: uuidv4 })
  @Field(() => ID)
  @IsUUID(4)
  id: string;

  @Prop()
  @Field((_type) => User)
  @IsUUID(4)
  @IsNotEmpty()
  author: string;

  @Prop()
  @Length(1, 256)
  body: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ type: [String], default: [] })
  @Field((_type) => [User])
  @IsUUID(4, { each: true })
  favoritedBy: string[];
}

export type TweetDocument = Tweet & Document;

export const TweetSchema = SchemaFactory.createForClass(Tweet);
TweetSchema.pre('validation', classValidator(Tweet));

export const TweetModelDefinition: ModelDefinition = {
  name: Tweet.name,
  schema: TweetSchema,
};
