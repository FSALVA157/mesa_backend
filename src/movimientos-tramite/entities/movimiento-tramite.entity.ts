import { Repository, Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Tramite } from '../../tramites/entities/tramite.entity';
import { Sector } from '../../sectores/entities/sector.entity';
import { type } from 'os';
import { Type } from 'class-transformer';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Entity('movimientos_tramite')
export class MovimientoTramite {
    
    @PrimaryGeneratedColumn()
    id_movimiento_tramite: number;

    @Column({
        type: 'int',
        nullable: false,
        unique: true
    })
    num_movimiento_tramite: number;

    //TRAMITE
    @Column({
        type: 'int',
        nullable: false,
        unique: false
    })
    tramite_numero: number;
   
    @ManyToOne(type => Tramite,{eager : true})
    @JoinColumn({
        name: 'tramite_numero',
        referencedColumnName: 'numero_tramite'
    })
    tramite: Tramite;
    //FIN TRAMITE

    //SECTOR PROCEDENCIA
    @Column({
        type: 'int',
        nullable: false,

    })
    sector_origen_id: number;

    @ManyToOne(type => Sector,{eager : true})
    @JoinColumn({
        name: 'sector_origen_id',
        referencedColumnName: 'id_sector'
    })
    sector_origen: Sector;

    //FIN SECTOR PROCEDENCIA

    @Column({
        type: 'date',
        nullable: false
    })
    fecha_ingreso: Date

    @Column({
        type: 'int',
        nullable: false
    })
    fojas_ingreso: number;

    @Column({
        type: 'varchar',
        length: 500,
        nullable: true
    })
    descripcion_ingreso: string;

    //SECTOR DESTINO    
    @Column({
        type: 'int',
        nullable: false
    })
    sector_destino_id: number;

    @ManyToOne(type => Sector,{eager : true})
    @JoinColumn({
        name: 'sector_destino_id',
        referencedColumnName: 'id_sector'
    })
    sector_destino: Sector;
    //FIN SECTOR DESTINO

    @Column({
        type: 'date',
        nullable: true
    })
    fecha_salida: Date;

    @Column({
        type: 'int',
        default: 0,
        nullable: false
        
    })
    fojas_salida: number;

    @Column({
        type: 'varchar',
        length: 500,
        nullable: true
    })
    descripcion_salida: string;

    @Column({
        type: 'bool',
        default: false,
        nullable: false
    })
    impreso: boolean;


    //SECTOR
    @Column({
        type: 'int',
        nullable: false
    })
    sector_id: number;
    
    @ManyToOne(type => Sector,{eager : true})
    @JoinColumn({
        name: 'sector_id',
        referencedColumnName: 'id_sector'
    })
    sector: Sector;

    //FIN SECTOR

    //USUARIO
    @Column({
        type: 'int',
        nullable: false
    })
    usuario_id: number;

    @ManyToOne(type => Usuario,{eager : true})
    @JoinColumn({
        name: 'usuario_id',
        referencedColumnName: 'id_usuario'
    })
    usuario: Usuario;
    //FIN USUARIO

    @CreateDateColumn()
    alta: Date;

    @UpdateDateColumn()
    actualizado: Date;

}
