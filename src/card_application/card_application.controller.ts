import { Body, Controller, Post } from '@nestjs/common';
import{CardApplicationService} from './card_application.service'
import{CardApplicationDto} from './dto/card_application.dto'
@Controller('card-application')
export class CardApplicationController {
   constructor(private readonly cardApplicationService: CardApplicationService){} 
    @Post()
    async create(@Body()cardApplicationDto: CardApplicationDto){
        return await this.cardApplicationService.create(cardApplicationDto)
    }

}
