import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ){}

    @UseGuards(AuthGuard('local'))
    @Post('login')
    login(
        @Req()
        req: any
    ){
        //return this.authService.validateUser(req.query.user.toString(), req.query.pass.toString());
        return req.user;

    }

     

    @Get('profile')
    profile(){
        return {
            message: "DATOS DE PROFILE"
        };
    }

}