import { ConfigService } from "@nestjs/config";
import { Usuario } from "src/usuarios/entities/usuario.entity";
import { getRepository } from "typeorm";

export const setDefaultUser = async(config: ConfigService) => {
    const userRepository = getRepository<Usuario>(Usuario);

    const defaultUser = await userRepository
                                    .createQueryBuilder()
                                    .where('correo = :correo', {correo: config.get<string>('DEFAULT_USER_EMAIL')})
                                    .getOne()

    if(!defaultUser){
        
    }


} 
