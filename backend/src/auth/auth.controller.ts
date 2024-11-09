import { Controller, Post, Body, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Login User' })
  @ApiResponse({ status: 200, description: 'Return logged in user data' })
  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    const data = await this.authService.login(loginDto);

    res.cookie('accessToken', data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600 * 1000,
    });

    res.send(data);
  }

  @ApiOperation({ summary: 'Sign up User' })
  @ApiResponse({ status: 201, description: 'Return signed up user data' })
  @Post('signup')
  async signUp(@Body() signUpDto: SignupDto) {
    return await this.authService.signUp(signUpDto);
  }

  @ApiOperation({ summary: 'Log out User' })
  @ApiResponse({ status: 200, description: 'Log out user' })
  @Post('logout')
  async logout(@Res() res: Response) {
    res.clearCookie('accessToken');
    res.send({ message: 'Logged out successfully!' });
  }
}
