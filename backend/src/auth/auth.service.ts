import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { UsersService } from 'src/users/users.service';
import { IJwtPayload } from './interfaces/jwt-payload.interface';
import { hashPassword, comparePasswords } from 'src/common/functions';

@Injectable()
export class AuthService {
  private readonly logger: Logger = new Logger(AuthService.name);

  constructor(
    private configService: ConfigService,
    private readonly usersService: UsersService,
  ) {}

  async login(loginDto: LoginDto) {
    this.logger.log(`Login: Logging in user with email: ${loginDto.email}`);

    const user = await this.usersService.findUserByEmail(loginDto.email);

    if (!user) {
      this.logger.error(
        `Login: User with email: ${loginDto.email} does not exist`,
      );

      throw new HttpException(
        'Invalid email or password',
        HttpStatus.BAD_REQUEST,
      );
    }

    const isPasswordValid = await comparePasswords(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      this.logger.error(
        `Login: User with email: ${loginDto.email} entered incorrect password`,
      );

      throw new HttpException(
        'Invalid email or password',
        HttpStatus.BAD_REQUEST,
      );
    }

    const payload: IJwtPayload = {
      _id: user._id.toString(),
      email: user.email,
    };

    const accessToken = await this.generateAccessToken(payload);

    this.logger.log(
      `Login: User with email: ${user.email} and ID: ${user._id} logged in successfuly. Access token generated`,
    );

    return { _id: user._id, name: user.name, email: user.email, accessToken };
  }

  async signUp(signUpDto: SignupDto) {
    this.logger.log(`Signup: Signing up user with email: ${signUpDto.email}`);

    const user = await this.usersService.findUserByEmail(signUpDto.email);

    if (user) {
      this.logger.error(
        `Signup: User with email: ${signUpDto.email} already exists`,
      );

      throw new HttpException(
        'User already registered',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashedPassword = await hashPassword(signUpDto.password);

    const newUser = await this.usersService.createUser({
      ...signUpDto,
      password: hashedPassword,
    });

    this.logger.log(
      `Signup: User with email: ${newUser.email} and ID: ${newUser._id} signed up successfuly`,
    );

    return { _id: newUser._id, name: newUser.name, email: newUser.email };
  }

  async generateAccessToken(payload: IJwtPayload) {
    const accessToken: string = jwt.sign(
      payload,
      this.configService.get<string>('jwtSecretKey'),
      { expiresIn: this.configService.get<string>('jwtExpiresIn') },
    );

    return accessToken;
  }
}
