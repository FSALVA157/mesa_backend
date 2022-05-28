import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('tipos_tramite')
export class TipoTramite {
    @PrimaryGeneratedColumn()
    id_tipo_tramite

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
        unique:true
    })
    tipo_tramite


    @CreateDateColumn()
    alta: Date;

    @DeleteDateColumn()
    baja: Date;

    @UpdateDateColumn()
    actualizado: Date;    
}
