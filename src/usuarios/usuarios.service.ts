import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class UsuariosService {

  constructor(
      @InjectRepository(Usuario)
      private readonly usuarioRepository: Repository<Usuario>
  ){}

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    const nuevo =  await this.usuarioRepository.create(createUsuarioDto);
    return await this.usuarioRepository.save(nuevo);
  }

  async findAll(): Promise<[Usuario[], number]> {
    return await this.usuarioRepository.findAndCount();
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
      const respuesta = await this.usuarioRepository.update(id, updateUsuarioDto);

      if (respuesta.affected == 0){ 
        throw new Error('No se ha Editado Ningún Registro');
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
      }
    } catch (error) {
      throw new BadRequestException('Error al Eliminar el Registro', error.message);
    }
  }
}
