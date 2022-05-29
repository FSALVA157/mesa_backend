import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateTipoTramiteDto {
    
    @IsString()
    @IsNotEmpty()        
    @MaxLength(100)
    @MinLength(2)
    tipo_tramite: string;
}
