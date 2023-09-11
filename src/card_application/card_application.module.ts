import { Module } from '@nestjs/common';
import { CardApplicationService } from './card_application.service';
import { CardApplicationController } from './card_application.controller';
import { DatabaseConnectionModule } from '../database-connection/database-connection.module';
@Module({
  imports:[DatabaseConnectionModule],
  providers: [CardApplicationService],
  controllers: [CardApplicationController]
})
export class CardApplicationModule {}
