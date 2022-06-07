import { Controller, Get, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Post()
  async register() {}

  @Post()
  async login() {}
}
