import { IsBoolean, IsEmail, IsEmpty, IsIn, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUsuarioDto {

   
    @IsString()
    @IsNotEmpty()        
    @MaxLength(50)
    @MinLength(2)
    usuario: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    @MaxLength(50)
    correo: string;

    @IsString()
    @IsNotEmpty()    
    clave: string;

    @IsInt()
    @IsNotEmpty()
    legajo: number;

    @IsString()
    @IsNotEmpty()    
    @MaxLength(50)
    @MinLength(2)    
    apellido: string;

    @IsString()
    @IsNotEmpty()    
    @MaxLength(50)
    @MinLength(2)    
    nombre: string;

    @IsBoolean()
    @IsOptional()
    vigente: boolean;

    @IsInt()
    @IsOptional()
    sector_id: number;   


}
