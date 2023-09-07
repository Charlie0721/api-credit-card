
export class SignupDto{

    name: string;
    email: string;
    password: string;
    gender: string;
    address: string;
}

export class LoginDto{
    email:string;
    password:string;    
}

export class UpdateUserDto{
    name?: string;
    email?: string;
    password?: string;
    gender?: string;
    address?: string;
}