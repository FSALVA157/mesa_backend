import { PartialType } from '@nestjs/mapped-types';
import { CreateMovimientoTramiteDto } from './create-movimiento-tramite.dto';

export class UpdateMovimientoTramiteDto extends PartialType(CreateMovimientoTramiteDto) {}
