import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";



@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy,"local"){

    constructor (
        private  authService: AuthService
    ){
        super({
            usernameField: 'user',
            passwordField: 'password',
        })
    }

    async validate(user: string, password: string){
        let usuario = null;
        usuario = await this.authService.validate(user, password);
        if(!usuario) throw new UnauthorizedException('El usuario o la contreseña no son válidos');
        return usuario;
    }
    

    
}