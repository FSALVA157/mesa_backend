import { IsBoolean, IsInt, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateSectorDto {

    @IsString()
    @IsNotEmpty()        
    @MaxLength(50)
    @MinLength(2)
    sector: string;
   
    @IsBoolean()
    es_mesa_entrada: boolean;
   
    @IsBoolean()
    tiene_sistema: boolean;

    @IsInt()
    @IsNotEmpty()
    organismo_id: string;
}
