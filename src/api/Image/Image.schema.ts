import { IsString, MinLength, MaxLength, IsNotEmpty } from 'class-validator'

export class ImageCreate {
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
