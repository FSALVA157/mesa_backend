import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { MovimientosTramiteService } from './movimientos-tramite.service';
import { CreateMovimientoTramiteDto } from './dto/create-movimiento-tramite.dto';
import { UpdateMovimientoTramiteDto } from './dto/update-movimiento-tramite.dto';
import { MovimientoTramite } from './entities/movimiento-tramite.entity';

@Controller('movimientos-tramite')
export class MovimientosTramiteController {
  constructor(private readonly movimientosTramiteService: MovimientosTramiteService) {}

  @Post()
  create(@Body() createMovimientoTramiteDto: CreateMovimientoTramiteDto) {
    return this.movimientosTramiteService.create(createMovimientoTramiteDto);
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
    return this.movimientosTramiteService.tramite_salida(+num_movimiento, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.movimientosTramiteService.remove(+id);
  }
}
