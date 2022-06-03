import { BadRequestException, Injectable } from '@nestjs/common';
import { UsuariosService } from "src/usuarios/usuarios.service";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsuariosService
    ){}

    async validate(usuario: string, password: string){
        try {
          const usuarioData = await  this.userService.findOneByUser(usuario);
          if(usuarioData && usuarioData.clave === password){
                const {clave, ...resultado} = usuarioData;
                return resultado;
          }else{
              return null;
          }
          
        } catch (error) {
            throw new BadRequestException('Error en petición de login', error.message);
        }
        
    }
}
