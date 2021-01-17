import { ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/user.model';

@ObjectType()
export class Login {
  accessToken: string;

  user: User;
}
