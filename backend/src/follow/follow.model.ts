import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsUUID } from 'class-validator';
import { Document } from 'mongoose';
import { classValidator } from 'src/schema.hooks';
import { v4 as uuidv4 } from 'uuid';

@Schema()
@ObjectType()
export class Follow {
  @Prop({ default: uuidv4 })
  @Field(() => ID)
  @IsUUID(4)
  id: string;

  @Prop()
  @IsUUID(4)
  follower: string;

  @Prop()
  // @Field((_type) => User)
  @IsUUID(4)
  followee: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export type FollowDocument = Follow & Document;

export const FollowSchema = SchemaFactory.createForClass(Follow);
FollowSchema.pre('validation', classValidator(Follow));

export const FollowModelDefinition: ModelDefinition = {
  name: Follow.name,
  schema: FollowSchema,
};
