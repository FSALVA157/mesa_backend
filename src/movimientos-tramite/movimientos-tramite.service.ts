import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovimientoTramiteDto } from './dto/create-movimiento-tramite.dto';
import { UpdateMovimientoTramiteDto } from './dto/update-movimiento-tramite.dto';
import { Repository } from 'typeorm';
import { MovimientoTramite } from './entities/movimiento-tramite.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MovimientosTramiteService {
  constructor(
    @InjectRepository(MovimientoTramite)
    private readonly movimientosTramiteRepository: Repository<MovimientoTramite>
  ){}

  async findAll() {
    
    return await this.movimientosTramiteRepository.find(
      {
          order:{
              num_movimiento_tramite: "ASC"
          }
      }
    );
  }

  async findOne(id: number) {
    //const respuesta = await this.movimientosTramiteRepository.findOneOrFail(id);
    const respuesta = await this.movimientosTramiteRepository.findOne(id);
    if (!respuesta) throw new NotFoundException("No se encontró el registro de movimiento de tramite solicitado.");
    return respuesta;
  }

  //CREAR TRAMITE
  async create(data: CreateMovimientoTramiteDto): Promise<MovimientoTramite> {
    let num_nuevo:number = 0;
    
    //obtener año actual
    let fecha_hoy: Date = new Date();    
    let anio:number= fecha_hoy.getFullYear(); 

    const num_max = await this.movimientosTramiteRepository.createQueryBuilder('movimientos_tramite')
      .select('MAX(movimientos_tramite.numero_tramite)','numero_max')
      .getRawOne();
    
    if(!num_max) {
      num_max.numero_max = 0;
    }
      
    num_nuevo = num_max.numero_max + 1;    
    data.num_movimiento_tramite = num_nuevo; 

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

  }
  //FIN CREAR TRAMITE..................................................................................

  //ACTUALIZAR TRAMITE
  async update(id: number, data: UpdateMovimientoTramiteDto) {
    const respuesta = await this.movimientosTramiteRepository.update(id, data);
    if((await respuesta).affected == 0) throw new NotFoundException("No se modificó el registro de movimiento de tramite.");
    return respuesta;
  }

  async remove(id: number) {
    const respuesta = await this.movimientosTramiteRepository.findOne(id);
    if(!respuesta) throw new NotFoundException("No existe el registro de movimiento de tramite que intenta eliminar");
    return await this.movimientosTramiteRepository.remove(respuesta);
  }
  //FIN ACTUALIZAR TRAMITE..............................................................................
}
