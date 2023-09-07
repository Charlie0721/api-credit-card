import { SignupDto, LoginDto,UpdateUserDto } from '../dto/signup.dto'
export interface IUsers {

    create(signupDto: SignupDto): Promise<SignupDto | any>
    hashPassword(password: string): Promise<string>
    login(login: LoginDto): Promise<LoginDto | null>
    getAll(): Promise<IAllUsers[] | null>
    getOne(userId: number): Promise<IAllUsers | null>
    update(userId:number, updateUserDto:UpdateUserDto): Promise<UpdateUserDto | null>
    delete(userId:number): Promise<any>
}
export interface IAllUsers {
    userId: number;
    name:string;
    email:string;
    gender:string;
    address:string;
}


