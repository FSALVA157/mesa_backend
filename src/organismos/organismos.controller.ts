import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { OrganismosService } from './organismos.service';
import { CreateOrganismoDto } from './dto/create-organismo.dto';
import { UpdateOrganismoDto } from './dto/update-organismo.dto';

@Controller('organismos')
export class OrganismosController {
  constructor(private readonly organismosService: OrganismosService) {}

  @Post()
  create(@Body() createOrganismoDto: CreateOrganismoDto) {
    return this.organismosService.create(createOrganismoDto);
  }

  @Get()
  findAll() {
    return this.organismosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.organismosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateOrganismoDto: UpdateOrganismoDto) {
    return this.organismosService.update(+id, updateOrganismoDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.organismosService.remove(id);
  }
}
