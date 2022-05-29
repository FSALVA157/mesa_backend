import { Module } from '@nestjs/common';
import { TramitesService } from './tramites.service';
import { TramitesController } from './tramites.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tramite } from './entities/tramite.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
        Tramite
    ])
  ],
  controllers: [TramitesController],
  providers: [TramitesService]
})
export class TramitesModule {}
