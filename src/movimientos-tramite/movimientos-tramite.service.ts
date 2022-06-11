import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovimientoTramiteDto } from './dto/create-movimiento-tramite.dto';
import { UpdateMovimientoTramiteDto } from './dto/update-movimiento-tramite.dto';
import { Repository } from 'typeorm';
import { MovimientoTramite } from './entities/movimiento-tramite.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Tramite } from 'src/tramites/entities/tramite.entity';
import { Sector } from 'src/sectores/entities/sector.entity';

@Injectable()
export class MovimientosTramiteService {
  constructor(
    @InjectRepository(MovimientoTramite)
    private readonly movimientosTramiteRepository: Repository<MovimientoTramite>,
    @InjectRepository(Tramite)
    private readonly tramitesRepository: Repository<Tramite>,
    @InjectRepository(Sector)
    private readonly sectorRepository: Repository<Sector>,

    
  ){}

  //BUSCAR TODOS LOS MOVIMIENTO DEL TRAMITE
  async findAll() {
    
    return await this.movimientosTramiteRepository.find(
      {
          order:{
              num_movimiento_tramite: "ASC"
          }
      }
    );
  }
  //FIN BUSCAR TODOS LOS MOVIMIENTO DEL TRAMITE...........................................................

  //BUSCAR MOVIMIENTO DEL TRAMITE XID
  async findOne(id: number) {
    //const respuesta = await this.movimientosTramiteRepository.findOneOrFail(id);
    const respuesta = await this.movimientosTramiteRepository.findOne(id);
    if (!respuesta) throw new NotFoundException("No se encontró el registro de movimiento de tramite solicitado.");
    return respuesta;
  }
  //FIN BUSCAR MOVIMIENTO DEL TRAMITE XID..................................................................

   //BUSCAR MOVIMIENTO DEL TRAMITE XID
   async findOneXNumMov(num_mov: number) {
    const respuesta = await this.movimientosTramiteRepository.findOne({num_movimiento_tramite: num_mov});
    if (!respuesta) throw new NotFoundException("No se encontró el registro de movimiento de tramite solicitado.");
    return respuesta;
  }
  //FIN BUSCAR MOVIMIENTO DEL TRAMITE XID..................................................................

  //CREAR MOVIMIENTO DEL TRAMITE
  async create(data: Partial<CreateMovimientoTramiteDto>): Promise<MovimientoTramite> {
    let num_nuevo:number = 0;         
    
    //Control de existencia del tramite
    const tramite_existe = await this.tramitesRepository.findOne({numero_tramite: data.tramite_numero});
    if(!tramite_existe) throw new BadRequestException ("El número de tramite ingresado no existe.")
    //FIN Control de existencia del tramite
    
    //obtener numero movimiento maximo
    const num_max = await this.movimientosTramiteRepository.createQueryBuilder('movimientos_tramite')
      .select('MAX(movimientos_tramite.num_movimiento_tramite)','numero_max')
      .getRawOne();
    
    if(!num_max) {
      num_max.numero_max = 0;
    }      
    num_nuevo = num_max.numero_max + 1;    

    //cargar numero de movimiento den data
    data.num_movimiento_tramite = num_nuevo; 
    
    //guardar movimiento
    const nuevo = await this.movimientosTramiteRepository.create(data);
    try {
      return await this.movimientosTramiteRepository.save(nuevo);
    } catch (error) {
      if(error.code=='ER_DUP_ENTRY'){
        const existe = await this.movimientosTramiteRepository.findOne({num_movimiento_tramite: data.num_movimiento_tramite});
        if(existe) throw new BadRequestException ("El número de movimiento de tramite que se intentó crear ya existe. Intente guardar nuevamente");
      }      
      throw new NotFoundException('Error al crear el nuevo movimiento de tramite: ',error.message);  
    }   
    //FIN guardar movimiento 
  }
  //FIN CREAR MOVIMIENTO DEL TRAMITE..................................................................................

  //SALIDA MOVIMIENTO DEL TRAMITE
  async tramite_salida(num_movimiento: number, data: UpdateMovimientoTramiteDto) {
    

    try{
      const respuesta = await this.movimientosTramiteRepository.update({num_movimiento_tramite: num_movimiento}, data);
      if((await respuesta).affected == 0) throw new NotFoundException("No se efectuó la salida del tramite. Intente nuevamente.");
      return respuesta;
    }catch(error){
      throw new NotFoundException('Error al dar salida al tramite: ',error.message);
    }    
  }
  //FIN SALIDA MOVIMIENTO DEL TRAMITE..............................................................................
  
  //ACTUALIZAR MOVIMIENTO DEL TRAMITE
  async update(id: number, data: UpdateMovimientoTramiteDto) {
    const respuesta = await this.movimientosTramiteRepository.update(id, data);
    if((await respuesta).affected == 0) throw new NotFoundException("No se modificó el registro de movimiento de tramite.");
    return respuesta;
  }
  //FIN ACTUALIZAR MOVIMIENTO DEL TRAMITE..............................................................................
  
  //ELIMINAR MOVIMIENTO DEL TRAMITE
  async remove(id: number) {
    const respuesta = await this.movimientosTramiteRepository.findOne(id);
    if(!respuesta) throw new NotFoundException("No existe el registro de movimiento de tramite que intenta eliminar");
    return await this.movimientosTramiteRepository.remove(respuesta);
  }
  //FIN ELIMINAR MOVIMIENTO DEL TRAMITE..............................................................................
}
