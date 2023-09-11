import { Inject, Injectable, HttpException, HttpStatus, } from '@nestjs/common';
import { Connection, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { CardApplication } from './card_application.interface';
import { CardApplicationDto } from './dto/card_application.dto';
@Injectable()
export class CardApplicationService implements CardApplication {


    constructor(@Inject('DB_CONNECTION') private readonly connection: Connection) { }

    async create(cardApplicationDto: CardApplicationDto): Promise<CardApplicationDto | any> {
        try {
            const [responseApplication] = await this.connection.query<ResultSetHeader>(`
        INSERT INTO card_application SET?`, [cardApplicationDto])
            return {
                cardAppicationId: responseApplication.insertId,
                cardApplicationDto
            }
        }

        catch (err) {
            console.log(err)
            return new HttpException("Error de servidor", HttpStatus.INTERNAL_SERVER_ERROR, err)
        }
    }


}
