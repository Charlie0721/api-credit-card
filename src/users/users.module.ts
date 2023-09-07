import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseConnectionModule } from '../database-connection/database-connection.module';
@Module({
  imports:[DatabaseConnectionModule],
  providers: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
