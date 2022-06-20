import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

    handleRequest(err, user, info) {
        // You can throw an exception based on either "info" or "err" arguments
        if (err || !user) {
          //console.log('MENSAJE', err.message);
          throw err || new UnauthorizedException('Falla en la Autenticación');
        }
        console.log(user);
        return user;
      }
}
