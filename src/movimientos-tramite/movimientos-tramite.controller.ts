import { Controller, Get, Post, Body, Patch, Param, Delete, Put, NotFoundException, Req } from '@nestjs/common';
import { MovimientosTramiteService } from './movimientos-tramite.service';
import { CreateMovimientoTramiteDto } from './dto/create-movimiento-tramite.dto';
import { UpdateMovimientoTramiteDto } from './dto/update-movimiento-tramite.dto';
import { MovimientoTramite } from './entities/movimiento-tramite.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Sector } from 'src/sectores/entities/sector.entity';
import { Repository } from 'typeorm';
import { Request } from 'express';


@Controller('movimientos-tramite')
export class MovimientosTramiteController {
  constructor(
    private readonly movimientosTramiteService: MovimientosTramiteService,
    @InjectRepository(Sector)
    private readonly sectorRepository: Repository<Sector>,
    ) {}

  
  @Get()
  findAll() {
    return this.movimientosTramiteService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    
    
    return this.movimientosTramiteService.findOne(+id);
  }

  @Post()
  create(
    @Body() 
    data: CreateMovimientoTramiteDto
    ) {    
    //cargar datos por defecto
    data.sector_destino_id= 1;
    data.fecha_ingreso = new Date();    
    data.enviado= false;

    return this.movimientosTramiteService.create(data);
  }

  @Post('recibir-tramite')
  async recibir_tramite (
    @Body() 
    data: CreateMovimientoTramiteDto
  ): Promise<MovimientoTramite> {    
   
    //buscar movimiento anterior
    let movimiento_anterior: MovimientoTramite;
    try{
      movimiento_anterior= await this.movimientosTramiteService.findUltimoXNumTramite(data.tramite_numero);
      //controles en el ultimo movimiento del tramite
      if(!movimiento_anterior.enviado){
        throw new NotFoundException ("El tramite no fue enviado por el último sector que lo recibió");
      }

      if(movimiento_anterior.sector_destino_id != data.sector_id){
        throw new NotFoundException ("Sólo el sector destino puede recibir el tramite");
      }
    }catch (error){
      throw new NotFoundException('Error buscando: ',error.message);
    }
    
    //guardar/recibir tramite
    let movimiento_nuevo: MovimientoTramite;
    //cargar datos por defecto
    data.sector_destino_id= 1;
    data.fecha_ingreso = new Date();    
    data.enviado= false;
    data.recibido= false;
    try{
      movimiento_nuevo= await this.movimientosTramiteService.create(data);
      console.log("respuesta recibr tramite", movimiento_nuevo);

      //actualizar como recibido el movimiento anterior
      movimiento_anterior.recibido=true;
      try{
        this.movimientosTramiteService.update(movimiento_anterior.id_movimiento_tramite, movimiento_anterior);
      }catch(error){
        throw new NotFoundException('Error al cambiar estado recibido del tramite: ',error.message);
      }
      
    }catch (error){
      throw new NotFoundException('Error al recibir el tramite: ',error.message);
    }

    // return this.movimientosTramiteService.create(data);
    return movimiento_nuevo;
  }



  @Put(':id')
  update(
    @Param('id') id: string, 
    @Body() updateMovimientosTramiteDto: UpdateMovimientoTramiteDto
    ) {
    return this.movimientosTramiteService.update(+id, updateMovimientosTramiteDto);
  }

  @Put('/tramite-salida/:num_movimiento')
  async movimiento_salida(
    @Param('num_movimiento') 
    num_movimiento: string, 
    @Body() 
    data: UpdateMovimientoTramiteDto
    ) {
    
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
