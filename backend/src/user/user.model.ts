import { Field, HideField, ID, ObjectType } from '@nestjs/graphql';
import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty, IsUUID, Length } from 'class-validator';
import { Document } from 'mongoose';
import { classValidator } from 'src/schema.hooks';
import { Tweet } from 'src/tweet/tweet.model';
import { v4 as uuidv4 } from 'uuid';

@Schema()
@ObjectType()
export class User {
  @Prop({ default: uuidv4 })
  @Field(() => ID)
  @IsUUID(4)
  id: string;

  @Prop()
  @Length(1, 64)
  username: string;

  @Prop()
  @IsNotEmpty()
  @HideField()
  password: string;

  @Prop({ default: '' })
  @Length(0, 256)
  location: string;

  @Prop({ type: [String], default: [] })
  @Field((_type) => [Tweet])
  @IsUUID(4, { each: true })
  favoriteTweets: string[];

  @Prop({ default: Date.now })
  createdAt: Date;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.pre('validation', classValidator(User));

export const UserModelDefinition: ModelDefinition = {
  name: User.name,
  schema: UserSchema,
};
