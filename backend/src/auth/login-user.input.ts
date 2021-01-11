import { InputType } from '@nestjs/graphql';
import { CreateUserInput } from '../user/create-user.input';

@InputType()
export class LoginUserInput extends CreateUserInput {}
