import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTipoTramiteDto } from './dto/create-tipo-tramite.dto';
import { UpdateTipoTramiteDto } from './dto/update-tipo-tramite.dto';
import { TipoTramite } from './entities/tipo-tramite.entity';

@Injectable()
export class TiposTramiteService {
  constructor(
    @InjectRepository(TipoTramite)
    private readonly tipoTramiteRepository: Repository<TipoTramite>
  ){}
  

  async findAll() {
    return await this.tipoTramiteRepository.find(
      {
          order:{
              tipo_tramite: "ASC"
          }
      }
    );
  }

  async findOne(id: number) {
    //const respuesta = await this.organismoRepository.findOneOrFail(id);
    const respuesta = await this.tipoTramiteRepository.findOne(id);
    if (!respuesta) throw new NotFoundException("No se encontró el registro de tipo de tramite solicitado.");
    return respuesta;
  }

  async create(data: CreateTipoTramiteDto): Promise<TipoTramite> {
    const existe = await this.tipoTramiteRepository.findOne({tipo_tramite: data.tipo_tramite});
    if(existe) throw new BadRequestException ("El tipo de tramit que intenta crear ya existe.");
    const nuevo = await this.tipoTramiteRepository.create(data);
    return await this.tipoTramiteRepository.save(nuevo);

  }

  async update(id: number, data: UpdateTipoTramiteDto) {
    const respuesta = await this.tipoTramiteRepository.update(id, data);
    if((await respuesta).affected == 0) throw new NotFoundException("No se modificó el registro de tipo de tramite.");
    return respuesta;
  }

  async remove(id: number) {
    const respuesta = await this.tipoTramiteRepository.findOne(id);
    if(!respuesta) throw new NotFoundException("No existe el registro de tipo de tramit que intenta eliminar");
    return await this.tipoTramiteRepository.remove(respuesta);
  }
}
