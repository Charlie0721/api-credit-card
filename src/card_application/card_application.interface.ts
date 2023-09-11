import {CardApplicationDto, ApplicationRequestDto} from './dto/card_application.dto'
export interface CardApplication {
    create(cardApplicationDto:CardApplicationDto):Promise<CardApplicationDto>
    getRequest(userId, appicationRequestDto:ApplicationRequestDto):Promise<any>
}
