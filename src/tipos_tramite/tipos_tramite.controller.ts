import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TiposTramiteService } from './tipos_tramite.service';
import { CreateTipoTramiteDto } from './dto/create-tipo_tramite.dto';
import { UpdateTipoTramiteDto } from './dto/update-tipo_tramite.dto';

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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTiposTramiteDto: UpdateTipoTramiteDto) {
    return this.tiposTramiteService.update(+id, updateTiposTramiteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tiposTramiteService.remove(+id);
  }
}
