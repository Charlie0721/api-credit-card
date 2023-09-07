import { Module } from '@nestjs/common';
import { createConnection } from 'mysql2/promise'

@Module({
    providers: [

        {
            provide: 'DB_CONNECTION',
            useFactory: async () => {
             
                const connection = await createConnection({
                    host: process.env.DB_HOST,
                    user: process.env.DB_USERNAME,
                    password: process.env.DB_PASSWORD,
                    database: process.env.DB_DATABASE,
                });
                return connection
            },
        },

    ],
    exports: ['DB_CONNECTION']
})
export class DatabaseConnectionModule {}
