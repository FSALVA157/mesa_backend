import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateOrganismoDto {

    @IsString()
    @IsNotEmpty()        
    @MaxLength(50)
    @MinLength(2)
    organismo: string;
}
