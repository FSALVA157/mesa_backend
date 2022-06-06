import { Module } from '@nestjs/common';
import { MovimientosTramiteService } from './movimientos-tramite.service';
import { MovimientosTramiteController } from './movimientos-tramite.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovimientoTramite } from './entities/movimiento-tramite.entity';
import { Tramite } from 'src/tramites/entities/tramite.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MovimientoTramite,
      Tramite
    ])
  ],
  controllers: [MovimientosTramiteController],
  providers: [MovimientosTramiteService]
})
export class MovimientosTramiteModule {}
