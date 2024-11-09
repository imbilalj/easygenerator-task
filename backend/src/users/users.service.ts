import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { SignupDto } from 'src/auth/dto/signup.dto';

@Injectable()
export class UsersService {
  private readonly logger: Logger = new Logger(UsersService.name);

  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(signUpDto: SignupDto) {
    this.logger.log(`createUser: Creating user with email ${signUpDto.email}`);

    try {
      const newUser = new this.userModel(signUpDto);

      const createdUser = await newUser.save();

      this.logger.log(
        `createUser: User with email: ${signUpDto.email} created successfuly in DB`,
      );

      return createdUser;
    } catch (error) {
      this.logger.error(
        `createUser: User creation with email: ${signUpDto.email} failed`,
      );

      throw new InternalServerErrorException();
    }
  }

  async findUserById(id: string) {
    return await this.userModel.findById(id, { password: 0 }).lean();
  }

  async findUserByEmail(email: string) {
    return await this.userModel.findOne({ email }).lean();
  }
}
