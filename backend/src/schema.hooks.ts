import { plainToClass } from 'class-transformer';
import { ClassType } from 'class-transformer/ClassTransformer';
import { validate } from 'class-validator';

export function classValidator(classType: ClassType<unknown>) {
  return async (): Promise<void> => {
    const validationErrors = await validate(plainToClass(classType, this));
    if (validationErrors.length) {
      throw new Error(
        `${classType.name} validation failed ${validationErrors}`,
      );
    }
  };
}
