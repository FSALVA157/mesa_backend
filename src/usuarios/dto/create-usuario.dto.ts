import { IsArray, IsBoolean, IsEmail, IsEmpty, IsEnum, IsIn, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { AppRoles } from "src/auth/roles/app.roles";
import { EnumToString } from "src/helpers/enumToString";

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

    @IsArray()
    @IsEnum(AppRoles, {
        each: true,
        message: `must be a valid role value, ${EnumToString(AppRoles)}`
    })
    roles: string[]

}
