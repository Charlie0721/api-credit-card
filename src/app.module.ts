import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseConnectionModule } from './database-connection/database-connection.module';
import { CardApplicationService } from './card_application/card_application.service';
import { CardApplicationModule } from './card_application/card_application.module';
import * as dotenv from 'dotenv';
dotenv.config();
@Module({
  imports: [DatabaseConnectionModule, UsersModule, DatabaseConnectionModule, CardApplicationModule],
  controllers: [AppController],
  providers: [AppService, CardApplicationService],
})
export class AppModule { }
