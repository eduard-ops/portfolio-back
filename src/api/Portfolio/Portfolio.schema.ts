import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator'

export class PortfolioCreate {
    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(50)
    name: string

    @IsString()
    @MinLength(8)
    @MaxLength(64)
    description: string
}
