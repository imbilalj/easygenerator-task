import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { IsStrongPassword } from 'src/common/decorators/strong-password.decorator';

export class SignupDto {
  @ApiProperty({ example: 'john@gmail.com', description: 'Email of user' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'John Doe', description: 'Name of user' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description:
      'Password with at least 8 character, at least 1 letter, 1 number and 1 special character',
  })
  @IsString()
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
}
