import { Type } from 'class-transformer';
import { IsDateString, IsInt, IsString, MaxLength, MinLength, IsBoolean, IsEmpty, IsOptional, Length, Min, Max,} from 'class-validator';



export class CreateMovimientoTramiteDto {
    
    //@IsInt({message: "El campo Número de movimiento debe ser entero"})
    num_movimiento_tramite: number;

    @IsInt({message: "Número-tramite debe ser un número entero"})
    tramite_numero: number;
   
    @IsInt({message: "Sector-origen debe ser un número entero"})
    sector_origen_id: number;
    
    //@IsDateString()
    fecha_ingreso: Date
    
    //@Matches(/^[0-9]*$/,{message:'Fojas ingreso debe ser un número entero'})
    
    @Max(10000,{message: 'El valor máximo para fojas-ingreso es 10000(diez mil)'})
    @Min(0,{message: 'El valor mínimo para fojas-ingreso es 0(cero)'})    
    @IsInt({message: "Fojas-ingreso debe ser un número entero"})
    fojas_ingreso: number;
           
    @Length(1,500,{message:'Descripción-ingreso debe tener entre $constraint1 y $constraint2 caracteres'})
    descripcion_ingreso: string;

    @IsOptional()
    @IsInt({message: "Sector-destino debe ser un número entero"})
    sector_destino_id: number;
    
    @IsOptional()
    @IsDateString({message: "El formato de fecha-salida no es válido"})
    fecha_salida: Date;
        
    // @Max(10000,{message: 'El valor máximo para fojas-salida es 10000(diez mil)'})
    // @Min(0,{message: 'El valor mínimo para fojas-salida es 0(cero)'})
    // @IsInt({message: "Fojas-salida debe ser un número entero"})    
    //@IsOptional()
    fojas_salida: number;   
    
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
