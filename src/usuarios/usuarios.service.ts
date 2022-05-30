import { Injectable, NotFoundException } from '@nestjs/common';
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

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return `This action updates a #${id} usuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }
}
