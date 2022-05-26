import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateOrganismoDto } from './dto/create-organismo.dto';
import { UpdateOrganismoDto } from './dto/update-organismo.dto';
import { Organismo } from './entities/organismo.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OrganismosService {
  constructor(
    @InjectRepository(Organismo)
    private readonly organismoRepository: Repository<Organismo>
  ){}

  

  async findAll() {
    return await this.organismoRepository.find(
      {
          order:{
              organismo: "ASC"
          }
      }
    );
  }

  async findOne(id: number) {
    //const respuesta = await this.organismoRepository.findOneOrFail(id);
    const respuesta = await this.organismoRepository.findOne(id);
    if (!respuesta) throw new NotFoundException("No se encontró el registro solicitado");
    return respuesta;
  }

  async create(createOrganismoDto: CreateOrganismoDto): Promise<Organismo> {
    const existe = await this.organismoRepository.findOne({organismo: createOrganismoDto.organismo});
    if(existe) throw new BadRequestException ("El organismo que intenta crear ya existe");
    const nuevo = await this.organismoRepository.create(createOrganismoDto);
    return await this.organismoRepository.save(nuevo);

  }

  async update(id: number, updateOrganismoDto: UpdateOrganismoDto) {
    const respuesta = await this.organismoRepository.update(id, updateOrganismoDto);
    if((await respuesta).affected == 0) throw new NotFoundException("No se modificó el registro.");
    return respuesta;
  }

  async remove(id: number) {
    const respuesta = await this.organismoRepository.findOne(id);
    if(!respuesta) throw new NotFoundException("No existe el registro de organismo que intenta eliminar");

    return await this.organismoRepository.remove(respuesta);
  }
}
