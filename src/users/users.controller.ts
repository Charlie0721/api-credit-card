import { Controller, Post, Body, Get, ParseIntPipe, Param, Put, Delete } from '@nestjs/common';
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
    @Put(':userId')

    async update(@Param('userId', ParseIntPipe) userId: number, @Body() updateUserDto: UpdateUserDto) {
        return await this.usersService.update(userId, updateUserDto)
    }

    @Delete(':userId')
    async delete(@Param('userId', ParseIntPipe) userId: number) {
        return this.usersService.delete(userId)
    }
}
