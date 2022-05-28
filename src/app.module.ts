import { Module } from '@nestjs/common';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { OrganismosModule } from './organismos/organismos.module';
import { SectoresModule } from './sectores/sectores.module';
import { TiposTramiteModule } from './tipos_tramite/tipos_tramite.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        //host: config.get<string>(DATABASE_HOST),
        host: "bix9xc7auhahumrogdey-mysql.services.clever-cloud.com",
        //port: parseInt(config.get<string>(DATABASE_PORT),10),
        port: 3306,
        //username: config.get<string>(DATABASE_USERNAME),
        username:"uxdbj17rjebal3qa",
        //password: config.get<string>(DATABASE_PASSWORD),
        password:"ymauNZUwI7Cq5gkKrIMQ",
        //database: config.get<string>(DATABASE_NAME),
        database: "bix9xc7auhahumrogdey",
        entities: [__dirname + "./**/**/*.entity{.ts,.js}"],
        autoLoadEntities: true,
        synchronize: true
    })
  }),
  ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env'
  }),
  UsuariosModule,
  OrganismosModule,
  SectoresModule,
  TiposTramiteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
