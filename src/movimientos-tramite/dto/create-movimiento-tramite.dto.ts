import { IsDateString, IsInt, IsNotEmpty, IsString, MaxLength, MinLength, IsBoolean, IsEmpty, IsOptional, Length, Min, Max } from 'class-validator';

export class CreateMovimientoTramiteDto {
    
    @IsInt({message: "El campo Número de movimiento debe ser entero"})
    num_movimiento_tramite: number;

    @IsInt({message: "El campo Tramite número salida debe ser entero"})
    tramite_numero: number;
   
    @IsInt({message: "El campo Sector origen debe ser entero"})
    sector_origen_id: number;
    
    //@IsDateString()
    fecha_ingreso: Date
   
    @IsInt({message: "El campo Fojas ingreso debe ser entero"})
    @Min(0,{message: 'Las Fojas ingreso debe ser 0(cero) o mayor'})
    @Max(10000,{message: 'La Fojas ingreso no debe ser mayor a 10000(cero)'})
    fojas_ingreso: number;
   
    
    @IsNotEmpty()        
    @Length(1,500,{message:'La Descripción ingreso debe tener entre $constraint1 y $constraint2 caracteres'})
    @IsString({message:'La Descripción ingreso debe ser formada por texto'})
    descripcion_ingreso: string;

    @IsOptional()
    @IsInt({message: "El campo Sector destino debe ser entero"})
    sector_destino_id: number;
    
    @IsOptional()
    @IsDateString({message: "El formato de Fecha salida no es válido"})
    fecha_salida: Date;
    
    @IsOptional()
    @IsInt({message: "El campo Fojas salida debe ser entero"})
    @Min(0,{message: 'Las Fojas salida debe ser 0(cero) o mayor'})
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
    recibido: boolean;
    
    @IsEmpty({message: "No debe enviar el campo impreso"})
    impreso: boolean;
    
    @IsInt({message: "El campo Sector debe ser entero"})
    sector_id: number;    
   
    @IsInt({message: "El campo Usuario debe ser entero"})
    usuario_id: number;
}
