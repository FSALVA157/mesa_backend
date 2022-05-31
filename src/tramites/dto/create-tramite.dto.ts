import { IsDateString, isDateString, IsInt, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateTramiteDto {

    @IsInt()
    @IsNotEmpty()
    numero_tramite: number;
    
    @IsString()
    @IsNotEmpty()        
    @MaxLength(100)
    @MinLength(1)
    asunto: string;
    
    @IsString()        
    @MaxLength(50)
    @MinLength(0)
    expediente_nota: string;
    
    @IsString()        
    @MaxLength(50)
    @MinLength(1)
    persona_referencia: string;

    @IsString()
    @IsNotEmpty()        
    @MaxLength(500)
    @MinLength(1)
    descripcion: string;

    @IsDateString()
    fecha: Date;

    @IsInt()
    @IsNotEmpty()
    anio: number;

    @IsInt()
    @IsNotEmpty()
    tipo_tramite_id: number;

    @IsInt()
    @IsNotEmpty()
    sector_id: number;

    @IsInt()
    @IsNotEmpty()
    usuario_id: number;

}
