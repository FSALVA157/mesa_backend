import { IsDateString, isDateString, IsInt, IsNotEmpty, IsOptional, IsString, Length, MaxLength, MinLength } from "class-validator";

export class CreateTramiteDto {

    // @IsInt()
    // @IsNotEmpty()
    numero_tramite: number;
    
    @IsString()
    @IsNotEmpty({message:'El asunto no puede ser vacío'}) 
    @Length(1,100,{message:'El asunto debe tener entre $constraint1 y $constraint2 caracteres'})
    asunto: string;
    
    
    @IsString()        
    @Length(0,50,{message:'El expediente/nota debe tener entre $constraint1 y $constraint2 caracteres'})
    expediente_nota: string;
    
    @IsString()        
    @Length(1,50,{message:'La persona de referencia debe tener entre $constraint1 y $constraint2 caracteres'})
    persona_referencia: string;

    @IsString()
    @IsNotEmpty({message:'La descripción no puede ser vacía'}) 
    @Length(1,500,{message:'La descripción debe tener entre $constraint1 y $constraint2 caracteres'})
    descripcion: string;

    // @IsDateString()
    fecha: Date;

    // @IsInt()
    // @IsNotEmpty()
    anio: number;

    @IsInt({message:'El tipo de tramite debe ser un número.'})
    @IsNotEmpty({message:'El tipo de tramite no debe ser vacío.'})
    tipo_tramite_id: number;

    @IsInt({message:'El sector debe ser un número.'})
    @IsNotEmpty({message:'El sector no debe ser vacío.'})
    sector_id: number;

    @IsInt({message:'El usuario debe ser un número.'})
    @IsNotEmpty({message:'El usuario no debe ser vacío.'})
    usuario_id: number;

}
