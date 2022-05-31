import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { TipoTramite } from '../../tipos-tramite/entities/tipo-tramite.entity';
import { Sector } from '../../sectores/entities/sector.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Entity('tramites')
export class Tramite {
    
    @PrimaryGeneratedColumn()
    id_tramite: number;

    @Column({
        type: "int",
        nullable:false,
        unique: true
    })
    numero_tramite: number;

    @Column({
        type: "varchar",
        length: 100,
        nullable:false
    })
    asunto: string;

    @Column({
        type: "varchar",
        length: 50,
        nullable:true
    })
    expediente_nota: string;

    @Column({
        type: "varchar",
        length: 50,
        nullable:true
    })
    persona_referencia: string;

    @Column({
        type: "varchar",
        length: 500,
        nullable:true
    })
    descripcion: string;

    @Column({
        type: "date",
        nullable: false,
           })
    fecha: Date;

    @Column({
        type: "int",
        nullable:false
    })
    anio: number;

    //TIPO TRAMITE
    @Column({
        type: "int",
        nullable:false
    })
    tipo_tramite_id: number;

    @ManyToOne(type => TipoTramite,{eager : true})
    @JoinColumn({
        name : 'tipo_tramite_id',
        referencedColumnName : 'id_tipo_tramite'
    })
    tipo_tramite : TipoTramite;
    //FIN TIPO TRAMITE

    //SECTOR
    @Column({
        type: "int",
        nullable:false
    })
    sector_id: number;

    @ManyToOne(type => Sector,{eager : true})
    @JoinColumn({
        name : 'sector_id',
        referencedColumnName : 'id_sector'
    })
    sector : Sector;
    //FIN SECTOR   

    //USUARIO
    @Column({
        type: "int",
        nullable:false
    })
    usuario_id: number;

    @ManyToOne(type => Usuario,{eager : true})
    @JoinColumn({
        name : 'usuario_id',
        referencedColumnName : 'id_usuario'
    })
    usuario : Usuario;
    //FIN USUARIO

    @CreateDateColumn()
    alta: Date;

    @DeleteDateColumn()
    baja: Date;

    @UpdateDateColumn()
    actualizado: Date;





}
