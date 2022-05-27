import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Organismo } from '../../organismos/entities/organismo.entity';

@Entity('sectores')
export class Sector {
    @PrimaryGeneratedColumn()
    id_sector: number;

    @Column({
        type: "varchar",
        length: 50,
        nullable:false,
        unique: true
    })
    sector: string;

    @Column({
        type: "boolean",
        nullable: false
    })
    es_mesa_entrada: boolean;



    //ORGANISMO
    @Column({
        type: "int",
        nullable:false
    })
    organismo_id: string;

    @ManyToOne(type => Organismo,{eager : true})
    @JoinColumn({
        name : 'organismo_id',
        referencedColumnName : 'id_organismo'
    })
    organismo : Organismo;
    //FIN ORGANISMO

    @CreateDateColumn()
    alta: Date;

    @DeleteDateColumn()
    baja: Date;

    @UpdateDateColumn()
    actualizado: Date;    

}
