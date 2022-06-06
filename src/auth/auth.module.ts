import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JWT_CONSTANTS } from 'src/config/constants';

@Module({
  imports: [
    PassportModule,
    UsuariosModule,
    JwtModule.register({
      secret: JWT_CONSTANTS.secret,
      signOptions: {
        expiresIn: '60s'
      }
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy
  ],
  controllers: [AuthController]
})
export class AuthModule {}
