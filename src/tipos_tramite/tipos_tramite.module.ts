import { Module } from '@nestjs/common';
import { TiposTramiteService } from './tipos_tramite.service';
import { TiposTramiteController } from './tipos_tramite.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoTramite } from './entities/tipo_tramite.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TipoTramite
    ])
  ],
  controllers: [TiposTramiteController],
  providers: [TiposTramiteService]
})
export class TiposTramiteModule {}
