import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards, Req, NotFoundException } from '@nestjs/common';
import { TramitesService } from './tramites.service';
import { CreateTramiteDto } from './dto/create-tramite.dto';
import { UpdateTramiteDto } from './dto/update-tramite.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Tramite } from 'src/tramites/entities/tramite.entity';
import { CreateMovimientoTramiteDto } from 'src/movimientos-tramite/dto/create-movimiento-tramite.dto';
import { Request } from 'express';

@Controller('tramites')
export class TramitesController {
  constructor(private readonly tramitesService: TramitesService) {} 

  // @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.tramitesService.findAll();
  }

  @Get('tramite-movimientos')
  findTramiteConMovimientos() {
    return this.tramitesService.findTramitesConMovimientos();
  }

  @Get('tramite-movimientos-sector')  
  async findTramiteConMovimientosXSector(
    @Req()
    req: Request
  ) {
    
    let sector: number = parseInt(req.query.id_sector.toString());
    if(isNaN(sector)) throw new NotFoundException("El id de sector no es un entero");
    if(sector==1) throw new NotFoundException("El id de sector enviado no esta asignado a un sector");
    return this.tramitesService.findTramiteXSector(sector);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tramitesService.findOne(+id);
  }

  @Post()
  create(@Body() data: CreateTramiteDto) {
    //obtener año actual   
    let anio:number= new Date().getFullYear();
    
    //cargar datos por defecto
    data.anio = anio;    
    data.fecha = new Date();
    return this.tramitesService.create(data);
  }

  //PRUEBA DE CREAR EL TRAMITE Y MOVIMIENTO
  @Post('crear-tramite')
  nuevoTramite(
    @Body() 
    tramiteCompleto: any
    // @Body()  
    // movimiento: CreateMovimientoTramiteDto
    ) {
      //let tramite: CreateTramiteDto = tramiteCompleto.tramite
    //obtener año actual   
    let anio:number= new Date().getFullYear();
    
    //cargar datos por defecto
    // tramite.anio = anio;    
    // tramite.fecha = new Date();
    // console.log("tramite", tramite);
    // return this.tramitesService.create(tramite);
  }
  //FIN PRUEBA DE CREAR EL TRAMITE Y MOVIMIENTO

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTramiteDto: UpdateTramiteDto) {
    return this.tramitesService.update(+id, updateTramiteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tramitesService.remove(+id);
  }
}
