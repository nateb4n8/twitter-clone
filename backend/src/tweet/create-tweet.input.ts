import { InputType } from '@nestjs/graphql';
import { Length } from 'class-validator';

@InputType()
export class CreateTweetInput {
  @Length(1, 256)
  body: string;
}
