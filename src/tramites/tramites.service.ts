import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTramiteDto } from './dto/create-tramite.dto';
import { UpdateTramiteDto } from './dto/update-tramite.dto';
import { Tramite } from './entities/tramite.entity';

@Injectable()
export class TramitesService {
  constructor(
    @InjectRepository(Tramite)
    private readonly tramitesRepository: Repository<Tramite>
  ){}

  async findAll() {
    
    return await this.tramitesRepository.find(
      {
          order:{
              numero_tramite: "ASC"
          }
      }
    );
  }

  async findTramitesConMovimientos(){
    const tramites = await this.tramitesRepository.createQueryBuilder('tramites')
    .leftJoinAndSelect("movimientos_tramite.tramite_numero", "tramites.numero_tramite")
    .getMany()

    console.log("movimientos", tramites);
  }

  async findOne(id: number) {
    //const respuesta = await this.tramitesRepository.findOneOrFail(id);
    const respuesta = await this.tramitesRepository.findOne(id);
    if (!respuesta) throw new NotFoundException("No se encontró el registro de tramite solicitado.");
    return respuesta;
  }

  //CREAR TRAMITE
  async create(data: CreateTramiteDto): Promise<Tramite> {
    let num_tramite_nuevo:number = 0;
    
    //obtener año actual   
    let anio:number= new Date().getFullYear(); 

    //obtener numero de tramite maximo
    const num_tramite_max = await this.tramitesRepository.createQueryBuilder('tramites')
      .select('MAX(tramites.numero_tramite)','num_max')
      .getRawOne();
    
    if(!num_tramite_max) {
      num_tramite_max.num_max = 0;
    }      
    num_tramite_nuevo = num_tramite_max.num_max + 1;

    //cargar datos por defecto
    data.numero_tramite = num_tramite_nuevo;
    
    //guardar tramite
    const nuevo = await this.tramitesRepository.create(data);
    try {
      return await this.tramitesRepository.save(nuevo);
    } catch (error) {
      if(error.code=='ER_DUP_ENTRY'){
        const existe = await this.tramitesRepository.findOne({numero_tramite: data.numero_tramite});
        if(existe) throw new BadRequestException ("El número de tramite que se intentó crear ya existe. Intente guardar nuevamente");
      }      
      throw new NotFoundException('Error al crear el nuevo tramite: ',error.message);  
    }    

  }
  //FIN CREAR TRAMITE..................................................................................

  //ACTUALIZAR TRAMITE
  async update(id: number, data: UpdateTramiteDto) {
    const respuesta = await this.tramitesRepository.update(id, data);
    if((await respuesta).affected == 0) throw new NotFoundException("No se modificó el registro de tramite.");
    return respuesta;
  }

  async remove(id: number) {
    const respuesta = await this.tramitesRepository.findOne(id);
    if(!respuesta) throw new NotFoundException("No existe el registro de tramite que intenta eliminar");
    return await this.tramitesRepository.remove(respuesta);
  }
  //FIN ACTUALIZAR TRAMITE..............................................................................
}
