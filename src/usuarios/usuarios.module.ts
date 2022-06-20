import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { roles } from 'src/auth/roles/app.roles';
import { AccessControlModule } from 'nest-access-control';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Usuario
    ]),
    AccessControlModule.forRoles(roles),
  ],
  controllers: [UsuariosController],
  providers: [UsuariosService],
  exports: [UsuariosService]
})
export class UsuariosModule {}
