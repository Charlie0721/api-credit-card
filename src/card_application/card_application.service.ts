import { Inject, Injectable, HttpException, HttpStatus, } from '@nestjs/common';
import { Connection, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { CardApplication } from './card_application.interface';
import { ApplicationRequestDto, CardApplicationDto } from './dto/card_application.dto';
@Injectable()
export class CardApplicationService implements CardApplication {


    constructor(@Inject('DB_CONNECTION') private readonly connection: Connection) { }

    async getRequest(userId: number, appicationRequestDto: ApplicationRequestDto): Promise<any> {
        try {
            const { applicationId } = appicationRequestDto
            const [response] = await this.connection.query<RowDataPacket[]>(`SELECT 
        ca.full_name , ca.created_at, u.email, ca.monthly_income
        FROM
        card_application ca 
        
        LEFT JOIN
        users u ON ca.userId = u.userId
        WHERE ca.applicationId= ? AND u.userId=?

        ` , [applicationId, userId])

            if (response.length === 0) return new HttpException("No se encuentra solicitud con este número", HttpStatus.NOT_FOUND)

            const newData = response.map((data: any) => {
                const monthly_income = 1160000
                if (data.monthly_income >= monthly_income) {
                    return {
                        ...data,
                        message: `sus ingresos mensuales por valor de ${data.monthly_income} superan el minimo requerido, solicitud aprobada !`
                    }
                } else {
                    return {
                        ...data,
                        message: `sus ingresos mensuales por valor de ${data.monthly_income} no superan el minimo requerido, solicitud negada !`
                    }
                }
            })
            return newData[0];

        } catch (error) {
            console.log(error);
            return new HttpException("Error de servidor", HttpStatus.INTERNAL_SERVER_ERROR, error)
        }
    }

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
