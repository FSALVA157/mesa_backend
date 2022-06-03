import { IsDateString, IsInt, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateMovimientoTramiteDto {
    

    num_movimiento_tramite: number;

    @IsInt()
    @IsNotEmpty()
    tramite_numero: number;
   
    @IsInt()
    @IsNotEmpty()
    sector_origen_id: number;
    
    @IsDateString()
    fecha_ingreso: Date
   
    @IsInt()
    @IsNotEmpty()
    fojas_ingreso: number;
   
    @IsString()
    @IsNotEmpty()        
    @MaxLength(500)
    @MinLength(1)
    descripcion_ingreso: string;

    sector_destino_id: number;
    
    fecha_salida: Date;
    
    fojas_salida: number;
   
    descripcion_salida: string;
    
    impreso: boolean;
    
    @IsInt()
    @IsNotEmpty()
    sector_id: number;    
   
    @IsInt()
    @IsNotEmpty()
    usuario_id: number;
}
