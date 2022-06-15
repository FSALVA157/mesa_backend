import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, BadRequestException } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ACGuard, UseRoles } from 'nest-access-control';
import { AppResources } from 'src/auth/roles/app.roles';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @UseGuards(JwtAuthGuard)  
  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.create(createUsuarioDto);
  }

  @UseGuards(ACGuard)
  @UseRoles({
    action: 'read',
    possession: 'any',
    resource: 'USUARIO'
  })
  @UseGuards(JwtAuthGuard)  
  @Get()
  findAll() {
    return this.usuariosService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(
    @Param('id')
    id: string
    ) {
      try {
        return this.usuariosService.findOne(+id);
        
      } catch (error) {
        throw new Error(error);
        
      }
  }

    
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id')
       id: string,
    @Body()
        updateUsuarioDto: UpdateUsuarioDto
     ) {
       return this.usuariosService.update(+id, updateUsuarioDto);         
       }

  
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuariosService.remove(+id);
  }  
  
}
