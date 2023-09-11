import {CardApplicationDto} from './dto/card_application.dto'
export interface CardApplication {
    create(cardApplicationDto:CardApplicationDto):Promise<CardApplicationDto>
}
