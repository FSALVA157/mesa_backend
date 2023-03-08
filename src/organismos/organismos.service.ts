import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
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
  
  //NUEVO ORGANISMO
  async create(createOrganismoDto: CreateOrganismoDto): Promise<Organismo> {
    
    const nuevo = await this.organismoRepository.create(createOrganismoDto);
    try{
      return await this.organismoRepository.save(nuevo);
    }
    catch(error){
      if(error.code=='ER_DUP_ENTRY'){
        const existe = await this.organismoRepository.findOne({organismo: createOrganismoDto.organismo});
        if(existe) throw new InternalServerErrorException ("El organismo que intenta crear ya existe");
      }
      throw new InternalServerErrorException ("No se realizó el registro", error.message);    
    }
  }
  //FIN NUEVO ORGANISMO...........................

  //BUSCAR TODOS LOS ORGANISMOS
  async findAll() {
    return await this.organismoRepository.find(
      {
          order:{
              organismo: "ASC"
          }
      }
    );
  }
  //FIN BUSCAR TODOS LOS ORGANISMOS.................

  //BUSCAR UN ORGANISMO X ID
  async findOne(id: number) {    
    const respuesta = await this.organismoRepository.findOne(id);
    if (!respuesta) throw new NotFoundException("El registro solicitado no existe.");
    return respuesta;
  }  
  //FIN BUSCAR UN ORGANISMO X ID...................................

  //MODIFICAR UN ORGANISMO X ID
  async update(id: number, updateOrganismoDto: UpdateOrganismoDto) {
    try{
      const respuesta = await this.organismoRepository.update(id, updateOrganismoDto);
      if((await respuesta).affected == 0){
        await this.findOne(id);
        throw new InternalServerErrorException("No se modificó el registro.");
      } 
      return respuesta;
    }
    catch(error){
      if(error.code=='ER_DUP_ENTRY'){
        throw new InternalServerErrorException ("El organismo ingresado ya existe.", error.message);
      }
      throw new InternalServerErrorException (error.message);
    }    
  }
  //FIN MODIFICAR UN ORGANISMO X ID...........................

  //ELIMINAR UN ORGANISMO X ID
  async remove(id: number) {
    const respuesta = await this.organismoRepository.findOne(id);
    if(!respuesta) throw new NotFoundException("No existe el registro de organismo que intenta eliminar");

    return await this.organismoRepository.remove(respuesta);
  }
  //ELIMINAR UN ORGANISMO X ID...............................
}
