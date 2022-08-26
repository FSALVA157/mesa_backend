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
    //esta función es usada por local Strategy para verificar la existencia del usuario y devolver sus datos
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
            throw new BadRequestException('Error al Validar Usuario', error.message);
        }
        
    }
    
    async login(usuario: any){
        const payload = {
            username: usuario.nombre,
            roles: usuario.roles,
            sub: usuario.id_usuario,
            sector: usuario.sector_id
        };
        return {
            access_token: this.jwtService.sign(payload)
        };
    }
}
