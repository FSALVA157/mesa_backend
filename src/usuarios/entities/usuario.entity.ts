import { IsOptional } from "class-validator";
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import  *  as  bcrypt  from  'bcrypt';
import { AppRoles } from "src/auth/roles/app.roles";
import { APP_FILTER } from "@nestjs/core";

@Entity()
export class Usuario {

    @BeforeUpdate()
    @BeforeInsert()
    async hashClave(){
        if(!this.clave){
            return;
        }
    const salt = await bcrypt.genSalt(10);
    this.clave = await bcrypt.hash(this.clave, salt);
    }

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
        nullable:false,
        select: false  
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

    @Column({
        type: 'simple-array',
        nullable: true,
        default: ()=>['NORMAL'] 
    })
    roles: string[];

    @CreateDateColumn()
    alta: Date;

    @DeleteDateColumn()
    baja: Date;

    @UpdateDateColumn()
    actualizado: Date;

       
    
    
    
    
    
    
    
}
