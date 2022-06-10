import { Body, Controller, Get, Post, Req, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

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
        //return req.user;
        return this.authService.login(req.user);


    }

     
    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(
        @Request()
        req:any
    ){
        return req.user;
    }


    //TODO: INVALIDAR TOKEN ANTERIOR
    @UseGuards(JwtAuthGuard)
    @Get('refresh')
    async refreshToken(
        @Body()
        user: any
    ){
        const data = await this.authService.login(user);
        return {
            message: "Token Refresh exitoso",
            data            
        }

    }

}
