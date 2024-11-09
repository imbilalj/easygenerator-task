import { registerDecorator, ValidationOptions } from 'class-validator';
import { IsStrongPasswordValidator } from '../validators/strong-password.validator';

export function IsStrongPassword(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsStrongPasswordValidator,
    });
  };
}
