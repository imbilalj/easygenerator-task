import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { User } from 'src/common/types/user';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Get user data' })
  @ApiResponse({ status: 200, description: 'Return user data' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get()
  async getUser(@GetUser() user: User) {
    return await this.usersService.findUserById(user._id);
  }
}
