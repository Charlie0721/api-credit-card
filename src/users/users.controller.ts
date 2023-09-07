import { Controller, Post, Body, Get,ParseIntPipe, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginDto, SignupDto, UpdateUserDto } from './dto/signup.dto'
@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) { }
    @Post('signup')
    async create(@Body() signupDto: SignupDto) {
        return await this.usersService.create(signupDto)
    }

    @Get()
  async getAll() {
        return await this.usersService.getAll();
    }
    @Get(':userId')
    async getOne(@Param('userId', ParseIntPipe) userId: number) {
        return this.usersService.getOne(userId)

    }
}
