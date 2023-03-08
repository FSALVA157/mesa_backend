import { Controller, Get, Post, Body, Patch, Param, Delete, Put, NotFoundException, Req, ParseIntPipe, BadRequestException } from '@nestjs/common';
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

  //CREAR MOVIMIENTO DEL TRAMITE
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
  //FIN CREAR MOVIMIENTO DEL TRAMITE........................................................
  
  //RECIBIR MOVIMIENTO DEL TRAMITE
  @Post('recibir-tramite')
  async recibir_tramite (
    @Body() 
    data: CreateMovimientoTramiteDto,
    @Param('num_mov_anterior', ParseIntPipe) num_mov_anterior: number,
    // @Req()
    // req: Request
  ): Promise<MovimientoTramite> {    
   
    // let num_mov_anterior: number = parseInt(req.query.num_mov_anterior.toString());
    // if(isNaN(num_mov_anterior)) throw new NotFoundException("El número de movimiento no es un entero");
    
    //buscar movimiento anterior
    let movimiento_anterior: MovimientoTramite;
    try{
      movimiento_anterior= await this.movimientosTramiteService.findOneXNumMov(num_mov_anterior);
      
      //controles en el ultimo movimiento del tramite
      if (movimiento_anterior.tramite_numero != data.tramite_numero) throw new NotFoundException("El N° de tramite para el nuevo movimiento es distinto al N° de tramite del movimiento que quiere recibir.");
      
      if(!movimiento_anterior.enviado) throw new NotFoundException ("El tramite no fue enviado por el último sector que lo recibió.");

      if(movimiento_anterior.recibido_destino) throw new NotFoundException ("El tramite ya fue recibido en el destino.");

      if(movimiento_anterior.sector_id != data.sector_origen_id) throw new NotFoundException ("El sector de origen para el nuevo movimiento es distino al sector que envió el movimiento que quiere recibir.");
      
      if(movimiento_anterior.sector_destino_id != data.sector_id) throw new NotFoundException ("Sólo el sector destino puede recibir el tramite");
    
      
    }catch (error){
      throw new NotFoundException('Error buscando el movimiento anterior: ',error.message);
    }
    
    //guardar/recibir tramite
    let movimiento_nuevo: MovimientoTramite;
    //cargar datos por defecto
    data.tramite_numero = movimiento_anterior.tramite_numero;
    data.sector_origen_id = movimiento_anterior.sector_id;
    data.fecha_ingreso = new Date();  
    data.sector_destino_id= 1;    
    data.fecha_salida = null;   
    data.enviado= false;
    data.recibido_destino= false;
    console.log("antes de crear");
    try{
      
      movimiento_nuevo= await this.movimientosTramiteService.create(data);
      console.log("despues de crear");
      //actualizar como recibido el movimiento anterior
      movimiento_anterior.recibido_destino=true;
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
  //FIN RECIBIR MOVIMIENTO DEL TRAMITE.......................................................

  
  //BUSCAR TODOS LOS MOVIMIENTO DEL TRAMITE
  @Get()
  findAll() {
    return this.movimientosTramiteService.findAll();
  }
  //FIN BUSCAR TODOS LOS MOVIMIENTO DEL TRAMITE............................................
  
  //BUSCAR HISTORIAL MOVIMIENTO DEL TRAMITE Xnum tramite
  @Get('/historial-tramite/:num_tramite')
  async findHistorialTramite(
    @Param('num_tramite') 
    num_tramite: string
  ) {
    let numero_tramite: number = parseInt(num_tramite.toString());
    if(isNaN(numero_tramite)) throw new NotFoundException("El número de tramite no es un entero");
    return this.movimientosTramiteService.findHistorial(numero_tramite);
  }
  //BUSCAR HISTORIAL MOVIMIENTO DEL TRAMITE XID......................................................

  //BUSCAR HISTORIAL MOVIMIENTO DEL TRAMITE Xsector
  @Get('historial-por-sector')
  async findHistorialSector(
    // @Param('num_tramite') 
    // num_tramite: string,
    @Req()
    req: Request
  ) {
    let num_tramite: number = parseInt(req.query.num_tramite.toString());
    if(isNaN(num_tramite)) throw new NotFoundException("El número de tramite no es un entero");
    let sector: number = parseInt(req.query.id_sector.toString());
    if(isNaN(sector)) throw new NotFoundException("El id de sector no es un entero");
    return this.movimientosTramiteService.findHistorialXSector(num_tramite, sector);
  }
  //BUSCAR HISTORIAL MOVIMIENTO DEL TRAMITE XID......................................................

  //BUSCAR MOVIMIENTOS PENDIENTES Xsector
  @Get('pendientes')
  async findPendientesXSector(
    @Req()
    req: Request
  ) {
    let sector: number = parseInt(req.query.id_sector.toString());
    if(isNaN(sector)) throw new NotFoundException("El id de sector no es un número entero");
    return this.movimientosTramiteService.findPendientesXSector(sector);
  }
  //BUSCAR MOVIMIENTOS PENDIENTES Xsector.....................................................

  //BUSCAR MOVIMIENTOS RECIBIDOS Xsector
  @Get('recibidos')
  async findRecibidosXSector(
    @Req()
    req: Request
  ) {
    let sector: number = parseInt(req.query.id_sector.toString());
    if(isNaN(sector)) throw new NotFoundException("El id de sector no es un número entero");
    return this.movimientosTramiteService.findRecibidosXSector(sector);
  }
  //BUSCAR MOVIMIENTOS RECIBIDOS Xsector.....................................................

  //BUSCAR MOVIMIENTOS ENVIADOS Xsector
  @Get('enviados')
  async findEnviadosXSector(
    @Req()
    req: Request
  ) {
    let sector: number = parseInt(req.query.id_sector.toString());
    if(isNaN(sector)) throw new NotFoundException("El id de sector no es un número entero");
    return this.movimientosTramiteService.findEnviadosXSector(sector);
  }
  //BUSCAR MOVIMIENTOS ENVIADOS Xsector.....................................................

  //BUSCAR MOVIMIENTOS ENVIADOS Xsector
  @Get('bandeja-entrada')
  async findTodosDestinadosAlSector(
    @Req()
    req: Request
  ) {
    let sector: number = parseInt(req.query.id_sector.toString());
    if(isNaN(sector)) throw new NotFoundException("El id de sector no es un número entero");
    return this.movimientosTramiteService.findTodosDestinadosAlSector(sector);
  }
  //BUSCAR MOVIMIENTOS ENVIADOS Xsector.....................................................

  //BUSCAR MOVIMIENTO DEL TRAMITE XID
  @Get(':id')
  async findOne(@Param('id') id: string) {    
    
    return this.movimientosTramiteService.findOne(+id);
  }
  //BUSCAR MOVIMIENTO DEL TRAMITE XID......................................................
  
  
  //SALIDA MOVIMIENTO DEL TRAMITE
  @Patch('tramite-salida')
  async movimiento_salida(
    // @Param('num_movimiento') 
    // num_movimiento: string, 
    @Body() 
    data: UpdateMovimientoTramiteDto,
    @Req()
    req: Request
    ) {
      let num_mov: number;
      if(req.query.num_movimiento){
        num_mov = parseInt(req.query.num_movimiento.toString())
      }
      else{
        throw new NotFoundException("Debe enviar el parametro número de movimiento.");
      }      
      
      if (isNaN(num_mov)) throw new NotFoundException("El número de movimiento debe ser un entero");

      data.fecha_salida= new Date();
      data.enviado = true;
      //controlar destino
      let movimiento: MovimientoTramite= new MovimientoTramite();
      movimiento = await this.movimientosTramiteService.findOneXNumMov(num_mov);
      
      //RECORDAR VALIDAR SECTOR CON TOKEN......
      const sector_destino = await this.sectorRepository.findOne(data.sector_destino_id);
      const sector_actual = await this.sectorRepository.findOne(data.sector_id);    
      
      if(movimiento.sector_id != sector_actual.id_sector){
        throw new NotFoundException("El tramite no puede ser enviado por este sector.");
      }
      if(movimiento.enviado ){
        throw new NotFoundException("El tramite ya fue enviado por este sector.");
      }          
      
      if(sector_actual.organismo_id != sector_destino.organismo_id){
        if(sector_actual.es_mesa_entrada){
          if(!sector_destino.es_mesa_entrada){
            throw new NotFoundException("El sector destino debe ser mesa de entrada del Organismo destino");
          }
          
        }else{
          throw new NotFoundException("El sector destino debe ser del mismo Organismo de su sector.");
        }
      }
      return this.movimientosTramiteService.tramite_salida(num_mov, data);
  }
  //FIN SALIDA MOVIMIENTO DEL TRAMITE........................................................

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number, 
    @Body() updateMovimientosTramiteDto: UpdateMovimientoTramiteDto
    ) {
    return this.movimientosTramiteService.update(id, updateMovimientosTramiteDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.movimientosTramiteService.remove(id);
  }
}
