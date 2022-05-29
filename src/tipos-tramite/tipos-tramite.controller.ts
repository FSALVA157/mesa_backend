import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { TiposTramiteService } from './tipos-tramite.service';
import { CreateTipoTramiteDto } from './dto/create-tipo-tramite.dto';
import { UpdateTipoTramiteDto } from './dto/update-tipo-tramite.dto';

@Controller('tipos-tramite')
export class TiposTramiteController {
  constructor(private readonly tiposTramiteService: TiposTramiteService) {}

  @Post()
  create(@Body() createTiposTramiteDto: CreateTipoTramiteDto) {
    return this.tiposTramiteService.create(createTiposTramiteDto);
  }

  @Get()
  findAll() {
    return this.tiposTramiteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tiposTramiteService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTiposTramiteDto: UpdateTipoTramiteDto) {
    return this.tiposTramiteService.update(+id, updateTiposTramiteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tiposTramiteService.remove(+id);
  }
}
function put(arg0: string) {
  throw new Error('Function not implemented.');
}

