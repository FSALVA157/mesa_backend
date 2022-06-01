import { Controller, Get, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {

    @Post('login')
    login(){
        return {
            message: "entraste a la ruta auth/login"
        };
    }

    @Get('profile')
    profile(){
        return {
            message: "DATOS DE PROFILE"
        };
    }

}
