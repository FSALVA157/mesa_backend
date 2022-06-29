import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { TramitesService } from './tramites.service';
import { CreateTramiteDto } from './dto/create-tramite.dto';
import { UpdateTramiteDto } from './dto/update-tramite.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Tramite } from 'src/tramites/entities/tramite.entity';

@Controller('tramites')
export class TramitesController {
  constructor(private readonly tramitesService: TramitesService) {}

  

  // @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.tramitesService.findAll();
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

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTramiteDto: UpdateTramiteDto) {
    return this.tramitesService.update(+id, updateTramiteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tramitesService.remove(+id);
  }
}
