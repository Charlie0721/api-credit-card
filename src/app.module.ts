import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseConnectionModule } from './database-connection/database-connection.module';
import * as dotenv from 'dotenv';
dotenv.config();
@Module({
  imports: [DatabaseConnectionModule,UsersModule, DatabaseConnectionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
