import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
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
  
  //NUEVO TIPO-TRAMITE
  async create(createTipoTramiteDto: CreateTipoTramiteDto): Promise<TipoTramite> {
    
    const nuevo = await this.tipoTramiteRepository.create(createTipoTramiteDto);
    try{
      return await this.tipoTramiteRepository.save(nuevo);
    }
    catch(error){
      if(error.code=='ER_DUP_ENTRY'){
        const existe = await this.tipoTramiteRepository.findOne({tipo_tramite: createTipoTramiteDto.tipo_tramite});
        if(existe) throw new InternalServerErrorException ("El tipo-tramite que intenta crear ya existe");
      }
      throw new InternalServerErrorException ("No se realizó el registro", error.message);    
    }
  }
  //FIN NUEVO TIPO-TRAMITE.............................................

  //BUSCAR TODOS LOS TIPO-TRAMITE
  async findAll() {
    return await this.tipoTramiteRepository.find(
      {
          order:{
              tipo_tramite: "ASC"
          }
      }
    );
  }
  //FIN BUSCAR TODOS LOS TIPO-TRAMITE...................................

  //BUSCAR UN TIPO-TRAMITE X ID
  async findOne(id: number) {
    const respuesta = await this.tipoTramiteRepository.findOne(id);
    if (!respuesta) throw new NotFoundException("El registro solicitado no existe.");
    return respuesta;
  }
  //FIN BUSCAR UN TIPO-TRAMITE X ID.......................................

  //MODIFICAR UN ORGANISMO X ID
  async update(id: number, updateTipoTramiteDto: UpdateTipoTramiteDto) {
    try{
      const respuesta = await this.tipoTramiteRepository.update(id, updateTipoTramiteDto);
      if((await respuesta).affected == 0){
        await this.findOne(id);
        throw new InternalServerErrorException("No se modificó el registro.");
      } 
      return respuesta;
    }
    catch(error){
      if(error.code=='ER_DUP_ENTRY'){
        throw new InternalServerErrorException ("El tipo-tramite ingresado ya existe.", error.message);
      }
      throw new InternalServerErrorException (error.message);
    }    
  }
  //FIN MODIFICAR UN ORGANISMO X ID...........................

  async remove(id: number) {
    const respuesta = await this.tipoTramiteRepository.findOne(id);
    if(!respuesta) throw new NotFoundException("No existe el registro de tipo de tramit que intenta eliminar");
    return await this.tipoTramiteRepository.remove(respuesta);
  }
}
