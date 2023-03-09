import { Transform, Type } from 'class-transformer';
import { IsDateString, IsInt, IsNotEmpty, IsString, MaxLength, MinLength, IsBoolean, IsEmpty, IsOptional, Length, Min, Max, Matches, IsNumber, IsDivisibleBy, IsNumberString, IsDecimal } from 'class-validator';
import { ParseIntPipe } from '@nestjs/common';



export class CreateMovimientoTramiteDto {
    
    //@IsInt({message: "El campo Número de movimiento debe ser entero"})
    num_movimiento_tramite: number;

    @IsInt({message: "Número de tramite debe ser un número entero"})
    tramite_numero: number;
   
    @IsInt({message: "Sector origen debe ser un número entero"})
    sector_origen_id: number;
    
    //@IsDateString()
    fecha_ingreso: Date
    
    //@Matches(/^[0-9]*$/,{message:'Fojas ingreso debe ser un número entero'})
    
    // @Max(10000,{message: 'El valor máximo para fojas-ingreso es 10000(diez mil)'})
    // @Min(0,{message: 'El valor mínimo para fojas-ingreso es 0(cero)'})  
    @IsInt({ message: 'myInt debe ser un número entero' }) // Validar entero
    fojas_ingreso: number;
           
    @Length(1,500,{message:'La Descripción ingreso debe tener entre $constraint1 y $constraint2 caracteres'})
    descripcion_ingreso: string;

    @IsOptional()
    @IsInt({message: "Sector destino debe ser un número entero"})
    sector_destino_id: number;
    
    @IsOptional()
    @IsDateString({message: "El formato de Fecha salida no es válido"})
    fecha_salida: Date;
    
    @IsOptional()
    @IsInt({message: "Fojas salida debe ser un número entero"})
    @Min(0,{message: 'Fojas salida debe ser 0(cero) o mayor'})
    @Max(10000,{message: 'La Fojas salida no debe ser mayor a 10000(cero)'})
    fojas_salida: number;   

    @IsOptional()     
    @Length(1,500,{message:'La Descripción salida debe tener entre $constraint1 y $constraint2 caracteres'})
    @IsString({message:'La Descripción salida debe ser formada por texto'}) 
    descripcion_salida: string;
    
    @IsEmpty({message: "No debe enviar el campo enviado"})
    enviado: boolean;

    @IsEmpty({message: "No debe enviar el campo recibido"})
    //@IsBoolean()
    recibido_destino: boolean;
    
    @IsEmpty({message: "No debe enviar el campo impreso"})
    impreso: boolean;
    
    @IsInt({message: "Sector debe ser un número entero"})
    sector_id: number;    
   
    @IsInt({message: "Usuario debe ser un número entero"})
    usuario_id: number;
}
