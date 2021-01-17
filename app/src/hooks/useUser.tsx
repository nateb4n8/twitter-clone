import { gql, useQuery } from '@apollo/client';
import { plainToClass } from 'class-transformer';
import { IsDate, IsUUID, Length, validateSync } from 'class-validator';

class User {
  @IsUUID(4)
  id!: string;

  @Length(1, 64)
  username!: string;

  @Length(0, 256)
  location!: string;

  @IsDate()
  createdAt!: Date;
}

const QUERY = gql`
  query User {
    user(username: "logic") {
      id
      username
      location
      createdAt
    }
  }
`;

export function useUser() {
  const { loading, error, data } = useQuery<User>(QUERY);
  if (loading || error) return { loading, error, data };

  const validationErrors = validateSync(plainToClass(User, data));
  if (validationErrors.length) {
    return {
      loading,
      error: new Error(`User validation failed ${validationErrors}`),
      data,
    };
  }

  return { loading, error, data };
}
