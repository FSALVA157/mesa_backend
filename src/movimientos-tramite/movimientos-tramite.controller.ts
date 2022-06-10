import { Controller, Get, Post, Body, Patch, Param, Delete, Put, NotFoundException } from '@nestjs/common';
import { MovimientosTramiteService } from './movimientos-tramite.service';
import { CreateMovimientoTramiteDto } from './dto/create-movimiento-tramite.dto';
import { UpdateMovimientoTramiteDto } from './dto/update-movimiento-tramite.dto';
import { MovimientoTramite } from './entities/movimiento-tramite.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Sector } from 'src/sectores/entities/sector.entity';
import { Repository } from 'typeorm';


@Controller('movimientos-tramite')
export class MovimientosTramiteController {
  constructor(
    private readonly movimientosTramiteService: MovimientosTramiteService,
    @InjectRepository(Sector)
    private readonly sectorRepository: Repository<Sector>,
    ) {}

  @Post()
  create(@Body() data: CreateMovimientoTramiteDto) {
    
    //cargar datos por defecto
    data.sector_destino_id= 1;
    data.fecha_ingreso = new Date();    
    data.enviado= false;

    return this.movimientosTramiteService.create(data);
  }

  @Get()
  findAll() {
    return this.movimientosTramiteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.movimientosTramiteService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateMovimientosTramiteDto: UpdateMovimientoTramiteDto) {
    return this.movimientosTramiteService.update(+id, updateMovimientosTramiteDto);
  }

  @Put('/tramite-salida/:num_movimiento')
  async movimiento_salida(
    @Param('num_movimiento') 
    num_movimiento: string, 
    @Body() 
    data: UpdateMovimientoTramiteDto) {
    
    //data.sector_destino_id = 3;
    data.fecha_salida= new Date();
    data.enviado = true;
    
    //controlar destino
    const sector_destino = await this.sectorRepository.findOne(data.sector_destino_id);
    const sector_actual = await this.sectorRepository.findOne(data.sector_id);    
    
    if(sector_actual.organismo_id != sector_destino.organismo_id){
      if(sector_actual.es_mesa_entrada){
        if(!sector_destino.es_mesa_entrada){
          throw new NotFoundException("El sector destino debe ser mesa de entrada del Organismo destino");
        }
        
      }else{
        throw new NotFoundException("El sector destino debe ser del mismo Organismo de su sector.");
      }
    }
    return this.movimientosTramiteService.tramite_salida(+num_movimiento, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.movimientosTramiteService.remove(+id);
  }
}
