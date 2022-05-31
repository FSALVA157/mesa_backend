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

  async findOne(id: number) {
    //const respuesta = await this.tramitesRepository.findOneOrFail(id);
    const respuesta = await this.tramitesRepository.findOne(id);
    if (!respuesta) throw new NotFoundException("No se encontró el registro de tramite solicitado.");
    return respuesta;
  }

  async create(data: CreateTramiteDto): Promise<Tramite> {
    let num_tramite:number = 0;

    const num_tramite_max = await this.tramitesRepository.createQueryBuilder('tramites')
      .select('MAX(tramites.numero_tramite)','num_max')
      .getRawOne();
    
    if(!num_tramite_max) throw new BadRequestException ("No se encontro tramites registrados.")
    
    console.log("maximo", num_tramite_max);    

    num_tramite = num_tramite_max.num_max + 1;
    console.log("nunumero nuevoevo", num_tramite);
    data.numero_tramite = num_tramite;
    const existe = await this.tramitesRepository.findOne({numero_tramite: data.numero_tramite});
    //if(existe) throw new BadRequestException ("El tramite que intenta crear ya existe.");
    const nuevo = await this.tramitesRepository.create(data);
    console.log("nuevo", nuevo);

    return await this.tramitesRepository.save(nuevo);

  }

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
}
