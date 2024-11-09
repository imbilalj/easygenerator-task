import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { IsStrongPassword } from 'src/common/decorators/strong-password.decorator';

export class LoginDto {
  @ApiProperty({ example: 'john@gmail.com', description: 'Email of user' })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Password of user',
  })
  @IsString()
  @IsNotEmpty()
  @IsStrongPassword({ message: 'Invalid Password' })
  password: string;
}
