import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UsuariosService } from "src/usuarios/usuarios.service";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsuariosService,
        private readonly jwtService: JwtService
    ){}

    async validate(usuario: string, password: string){
        try {
          const usuarioData = await  this.userService.findOneByUser(usuario);
          if(usuarioData && await compare(password,usuarioData.clave)){
                const {clave, ...resultado} = usuarioData;
                return resultado;
          }else{
              return null;
          }
          
        } catch (error) {
            throw new BadRequestException('Error en petición de login', error.message);
        }
        
    }
    async login(usuario: any){
        const payload = {
            username: usuario.nombre,
            roles: ["NORMAL","USUARIO"],
            sub: usuario.id_usuario
        };
        return {
            access_token: this.jwtService.sign(payload)
        };
    }
}
