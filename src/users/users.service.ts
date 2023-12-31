import { Injectable, Inject, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { Connection, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { IAllUsers, IUsers } from './interface/users.interface';
import { SignupDto, LoginDto, UpdateUserDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService implements IUsers {

    constructor(@Inject('DB_CONNECTION') private readonly connection: Connection) { }

    async hashPassword(password: string): Promise<string> {
        const saltRounds = 10;
        return bcrypt.hash(password, saltRounds);
    }
    async create(signupDto: SignupDto): Promise<any> {
        try {
            const { name, email, password, gender, address } = signupDto;
            const hashedPassword = await this.hashPassword(password);
            const [userFound] = await this.connection.query<RowDataPacket[]>(`
            SELECT * FROM users WHERE email = ?
            `, [email])
            if (userFound.length > 0) {
                return new HttpException("Usuario ya existe", HttpStatus.FOUND)
            }
            const [user] = await this.connection.query<ResultSetHeader>(`
            INSERT INTO users (name, email, password, gender, address) VALUES (?,?,?,?,?)
            `, [name, email, hashedPassword, gender, address])
            return { userId: user.insertId, name, email, gender, address }
        } catch (error) {
            console.log(error)
            return new HttpException("Error de servidor", HttpStatus.INTERNAL_SERVER_ERROR, error)
        }
    }
    private async comparePasswords(plainPassword: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(plainPassword, hashedPassword);
    }
    async login(login: LoginDto): Promise<LoginDto | any> {
        try {
            const { email, password } = login;
            const [users] = await this.connection.query<RowDataPacket[]>(
                'SELECT * FROM users WHERE email = ?',
                [email],
            );

            if (users.length === 0) {
                return new HttpException("No se encontro usuario en la base de datos", HttpStatus.NOT_FOUND)
            }

            const user = users[0];
            const isPasswordValid = await this.comparePasswords(password, user.password);
            if (!isPasswordValid) {
                return null;
            }
            return {
                userId: user.userId,
                name: user.name,
                email: user.email

            }

        } catch (error) {
            console.log(error)
            return new HttpException("Error de servidor", HttpStatus.INTERNAL_SERVER_ERROR, error)

        }
    }
    async getAll(): Promise<IAllUsers[] | null | any> {

        try {
            const [users] = await this.connection.query<RowDataPacket[]>(`SELECT userId, name, email, gender, address 
        FROM
        users`)
            if (users.length === 0) {
                return new HttpException("No se encontraron usuarios en la base de datos", HttpStatus.NOT_FOUND)
            }
            return users

        } catch (error) {
            console.log(error)
            return new HttpException("Error de servidor", HttpStatus.INTERNAL_SERVER_ERROR, error)
        }

    }
    async getOne(userId: number): Promise<IAllUsers | any> {
        try {
            const [user] = await this.connection.query<RowDataPacket[]>(`SELECT
            userId, name, email, gender, address 
        FROM
        users WHERE userId = ${userId}`)
            if (user.length === 0) {
                return new HttpException("No se encontraron usuarios en la base de datos", HttpStatus.NOT_FOUND)
            }
            return user[0]

        } catch (error) {
            console.log(error)
            return new HttpException("Error de servidor", HttpStatus.INTERNAL_SERVER_ERROR, error)
        }
    }
    async update(userId: number, updateUserDto: UpdateUserDto): Promise<UpdateUserDto | any> {
        try {

            const { name, email, gender, address, password } = updateUserDto
            const hashedPassword = await this.hashPassword(password);
            const [user] = await this.connection.query(`UPDATE users
             SET 
             name=?, email=?, address=?,password =?, gender=? WHERE userId =?`,
                [name, email, address, hashedPassword, gender, userId])

            return {
                user,
                name,
                email
            }

        } catch (error) {
            console.log(error)
            return new HttpException("Error de servidor", HttpStatus.INTERNAL_SERVER_ERROR, error)
        }
    }
    async delete(userId: number): Promise<any> {
        try {
            const [userDeleted] = await this.connection.query(`DELETE FROM users WHERE userId=${userId}`)
            return userDeleted
        } catch (error) {
            console.log(error)
            return new HttpException("Error de servidor", HttpStatus.INTERNAL_SERVER_ERROR, error)
        }
    }


}
