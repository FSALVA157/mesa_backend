import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import  *  as  bcrypt  from  'bcrypt';

@Injectable()
export class UsuariosService {

  constructor(
      @InjectRepository(Usuario)
      private readonly usuarioRepository: Repository<Usuario>
  ){}

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    try {
      const nuevo = this.usuarioRepository.create(createUsuarioDto);
      return await this.usuarioRepository.save(nuevo);  
    } catch (error) {
      throw new BadRequestException('Error al Crear Usuario Nuevo', error.message);
    }
    
    
  }

  async findAll(): Promise<[Usuario[], number]> {
    try {
      return await this.usuarioRepository.findAndCount(
        // {
        //   relations: ['sector'],
          
        // }
      );
      
    } catch (error) {
      throw new BadRequestException('Error al Listar Usuarios', error.message);
    }
  }

 async findOne(id: number) {
   try {
        return await this.usuarioRepository.findOneOrFail({id_usuario: id});
      
   } catch (error) {
        throw new NotFoundException('No Existe el Usuario', error);
   }
 
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    try {
      if(updateUsuarioDto.clave){
        const salt = await bcrypt.genSalt(10);
        updateUsuarioDto.clave = await bcrypt.hash(updateUsuarioDto.clave, salt);
      }
            
      const respuesta = await this.usuarioRepository.update(id, updateUsuarioDto);
      if (respuesta.affected == 0){ 
        throw new Error('No se ha Editado Ningún Registro');
      }else{
        return {
          message: "Edición de Datos Exitosa"
        };
      }
      
    } catch (error) {
        throw new BadRequestException('Error al Editar', error.message);
    }    
  }

  async remove(id: number) {
    try {
      const respuesta = await this.usuarioRepository.delete({id_usuario: id});
      if(respuesta.affected == 0){
        throw new Error('No se ha eliminado ningún Registro');
      }else{
        return {
          message: "Usuario Eliminado Exitosamente"
        };
      }
    } catch (error) {
      throw new BadRequestException('Error en Petición de Delete', error.message);
    }
  }

  async findOneByUser(user: string){
    try {
      return await this.usuarioRepository
                                        .createQueryBuilder('usuario')
                                        .where({usuario: user})
                                        .addSelect('usuario.clave')
                                        .getOne(); 
      } catch (error) {
      throw new NotFoundException('No existe el Usuario solicitado', error.message);
    }
  }



}
