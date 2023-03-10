import { PartialType } from '@nestjs/mapped-types';
import { IsInt, IsString, Length, Max, Min } from 'class-validator';
import { CreateMovimientoTramiteDto } from './create-movimiento-tramite.dto';

export class UpdateMovimientoTramiteDto extends PartialType(CreateMovimientoTramiteDto) {
   
    @IsInt({message: "Sector-destino debe ser un número entero"})
    sector_destino_id: number;

    @Max(10000,{message: 'El valor máximo para fojas-salida es 10000(diez mil)'})
    @Min(0,{message: 'El valor mínimo para fojas-salida es 0(cero)'})
    @IsInt({message: "Fojas-salida debe ser un número entero"})
    fojas_salida: number;   

    
    @Length(1,500,{message:'La Descripción salida debe tener entre $constraint1 y $constraint2 caracteres'})
    @IsString({message:'La Descripción salida debe ser formada por texto'}) 
    descripcion_salida: string;
}
