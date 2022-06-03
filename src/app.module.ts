import { Module } from '@nestjs/common';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { OrganismosModule } from './organismos/organismos.module';
import { SectoresModule } from './sectores/sectores.module';
import { TiposTramiteModule } from './tipos-tramite/tipos-tramite.module';
import { TramitesModule } from './tramites/tramites.module';
import { MovimientosTramiteModule } from './movimientos-tramite/movimientos-tramite.module';
import { TYPEORM_CONFIG } from './config/constants';
import { AuthModule } from './auth/auth.module';
import databaseConfig from './config/database.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.get<TypeOrmModuleOptions>(TYPEORM_CONFIG)
       
                                                            
  }),
  ConfigModule.forRoot({
    isGlobal: true,
    load: [databaseConfig],
    envFilePath: '.env'
  }),
  UsuariosModule,
  OrganismosModule,
  SectoresModule,
  TiposTramiteModule,
  TramitesModule,
  MovimientosTramiteModule,
  AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
