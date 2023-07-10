import {
    IsEmail,
    IsNotEmpty,
    IsString,
    MinLength,
    MaxLength,
} from 'class-validator'

export class AuthRegister {
    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(50)
    name: string

    @IsNotEmpty()
    @IsEmail()
    @MinLength(8)
    @MaxLength(64)
    email: string

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(20)
    password: string
}

export class AuthLogin {
    @IsNotEmpty()
    @IsEmail()
    @MinLength(8)
    @MaxLength(64)
    email: string

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(20)
    password: string
}
