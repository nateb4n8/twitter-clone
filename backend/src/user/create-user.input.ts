import { InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, Length } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Length(1, 64)
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
