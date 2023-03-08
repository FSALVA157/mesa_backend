import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSectorDto } from './dto/create-sector.dto';
import { UpdateSectorDto } from './dto/update-sector.dto';
import { Sector } from './entities/sector.entity';

@Injectable()
export class SectoresService {

  constructor(
    @InjectRepository(Sector)
    private readonly sectorRepository: Repository<Sector>
  ){}
  
  //NUEVO SECTOR
  async create(createSectorDto: CreateSectorDto): Promise<Sector> {
    
    const nuevo = await this.sectorRepository.create(createSectorDto);
    try{
      return await this.sectorRepository.save(nuevo);
    }
    catch(error){
      if(error.code=='ER_DUP_ENTRY'){
        const existe = await this.sectorRepository.findOne({sector: createSectorDto.sector});
        if(existe) throw new InternalServerErrorException ("El sector que intenta crear ya existe");
      }
      throw new InternalServerErrorException ("No se realizó el registro", error.message);    
    }
  }
  //FIN NUEVO SECTOR...........................

  //BUSCAR TODOS LOS SECTORES
  async findAll() {
    return await this.sectorRepository.find(
      {
          order:{
              sector: "ASC"
          }
      }
    );
  }
  //FIN BUSCAR TODOS LOS SECTORES....................

  //BUSCAR UN SECTOR X ID
  async findOne(id: number) {
    const respuesta = await this.sectorRepository.findOne(id);
    if (!respuesta) throw new NotFoundException("El registro solicitado no existe.");
    return respuesta;
  }  
  //FIN BUSCAR UN SECTOR X ID.....................................

  //MODIFICAR UN SECTOR X ID
  async update(id: number, updateSectorDto: UpdateSectorDto) {
    try{
      const respuesta = await this.sectorRepository.update(id, updateSectorDto);
      if((await respuesta).affected == 0){
        await this.findOne(id);
        throw new InternalServerErrorException("No se modificó el registro.");
      } 
      return respuesta;
    }
    catch(error){
      if(error.code=='ER_DUP_ENTRY'){
        throw new InternalServerErrorException ("El sector ingresado ya existe.", error.message);
      }
      throw new InternalServerErrorException (error.message);
    }    
  }
  //FIN MODIFICAR UN SECTOR X ID........................... 

  async remove(id: number) {
    const respuesta = await this.sectorRepository.findOne(id);
    if(!respuesta) throw new NotFoundException("No existe el registro de sector que intenta eliminar");
    return await this.sectorRepository.remove(respuesta);
  }
}
