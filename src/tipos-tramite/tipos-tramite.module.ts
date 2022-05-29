import { Module } from '@nestjs/common';
import { TiposTramiteService } from './tipos-tramite.service';
import { TiposTramiteController } from './tipos-tramite.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoTramite } from './entities/tipo-tramite.entity';

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
