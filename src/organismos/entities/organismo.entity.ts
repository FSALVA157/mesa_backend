import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('organismos')
export class Organismo {
    @PrimaryGeneratedColumn()
    id_organismo: number;

    @Column({
        type: "varchar",
        length: 50,
        nullable:false,
        unique: true
    })
    organismo: string;

    @CreateDateColumn()
    alta: Date;

    @DeleteDateColumn()
    baja: Date;

    @UpdateDateColumn()
    actualizado: Date;
}
