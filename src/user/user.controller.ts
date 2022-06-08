import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Put,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { GetUser } from 'src/decorator';
import { JwtGuard } from 'src/guard';
import { UpdateUserDto } from './dto';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  async GetUser(@GetUser('id') userId: string) {
    return this.userService.getUser(userId);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Put()
  async UpdateUser(@GetUser('id') userId: string, @Body() dto: UpdateUserDto) {
    return this.userService.updateUser(userId, dto);
  }
}
