import { Body, Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CardApplicationService } from './card_application.service'
import { CardApplicationDto, ApplicationRequestDto } from './dto/card_application.dto'
@Controller('card-application')
export class CardApplicationController {
    constructor(private readonly cardApplicationService: CardApplicationService) { }
    @Post()
    async create(@Body() cardApplicationDto: CardApplicationDto) {
        return await this.cardApplicationService.create(cardApplicationDto)
    }
    @Post('request/:userId')
    async getOne(@Param('userId', ParseIntPipe) userId: number,
        @Body() applicationRequestDto: ApplicationRequestDto) {
        return this.cardApplicationService.getRequest(userId, applicationRequestDto)
    }
}
