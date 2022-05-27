import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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
  

  async findAll() {
    return await this.sectorRepository.find(
      {
          order:{
              sector: "ASC"
          }
      }
    );
  }

  async findOne(id: number) {
    //const respuesta = await this.organismoRepository.findOneOrFail(id);
    const respuesta = await this.sectorRepository.findOne(id);
    if (!respuesta) throw new NotFoundException("No se encontró el registro de sector solicitado");
    return respuesta;
  }

  async create(createSectorDto: CreateSectorDto): Promise<Sector> {
    const existe = await this.sectorRepository.findOne({sector: createSectorDto.sector});
    if(existe) throw new BadRequestException ("El sector que intenta crear ya existe");
    const nuevo = await this.sectorRepository.create(createSectorDto);
    return await this.sectorRepository.save(nuevo);

  }

  async update(id: number, updateSectorDto: UpdateSectorDto) {
    const respuesta = await this.sectorRepository.update(id, updateSectorDto);
    if((await respuesta).affected == 0) throw new NotFoundException("No se modificó el registro de sector.");
    return respuesta;
  }

  async remove(id: number) {
    const respuesta = await this.sectorRepository.findOne(id);
    if(!respuesta) throw new NotFoundException("No existe el registro de sector que intenta eliminar");
    return await this.sectorRepository.remove(respuesta);
  }
}
