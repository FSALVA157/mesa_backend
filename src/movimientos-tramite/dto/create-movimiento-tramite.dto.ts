import { IsDateString, IsInt, IsNotEmpty, IsString, MaxLength, MinLength, IsBoolean, IsEmpty } from 'class-validator';

export class CreateMovimientoTramiteDto {
    

    num_movimiento_tramite: number;

    @IsInt()
    @IsNotEmpty()
    tramite_numero: number;
   
    @IsInt()
    @IsNotEmpty()
    sector_origen_id: number;
    
    //@IsDateString()
    fecha_ingreso: Date
   
    @IsInt()
    @IsNotEmpty()
    fojas_ingreso: number;
   
    @IsString()
    @IsNotEmpty()        
    @MaxLength(500)
    @MinLength(1)
    descripcion_ingreso: string;

    @IsInt()
    @IsNotEmpty()
    sector_destino_id: number;
    
    @IsNotEmpty()
    @IsDateString()
    fecha_salida: Date;
    
    @IsInt()
    @IsNotEmpty()
    fojas_salida: number;
   
    @IsString()
    @IsNotEmpty()        
    @MaxLength(500)
    @MinLength(1)
    descripcion_salida: string;
    
    @IsBoolean()
    enviado: boolean;

    @IsBoolean()
    recibido: boolean;

    impreso: boolean;
    
    @IsInt()
    @IsNotEmpty()
    sector_id: number;    
   
    @IsInt()
    @IsNotEmpty()
    usuario_id: number;
}
