import { IsOptional } from "class-validator";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Usuario {

    @PrimaryGeneratedColumn()
    id_usuario: number;

    @Column({
        type: "varchar",
        length: 50,
        nullable:false,
        unique: true
    })
    usuario: string;

    @Column({
        type: "varchar",
        length: 50,
        nullable: false,
        unique: true
    })
    correo: string;

    @Column({
        type: "varchar",
        nullable:false        
    })
    clave: string;

    @Column({
        type: "int",
        nullable:false,
        unique: true
    })
    legajo: number;

    @Column({
        type: "varchar",
        length: 50,
        nullable:false,
    })
    apellido: string;

    @Column({
        type: "varchar",
        length: 50,
        nullable:false,
    })
    nombre: string;

    @Column({
        default: true,
        nullable: true
    })
    @IsOptional()
    vigente: boolean;

    @Column({
        type: "int",
        nullable: false
    })
    sector_id: number;

    @CreateDateColumn()
    alta: Date;

    @DeleteDateColumn()
    baja: Date;

    @UpdateDateColumn()
    actualizado: Date;
}
