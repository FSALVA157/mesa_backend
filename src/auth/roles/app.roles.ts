import { RolesBuilder } from "nest-access-control";

export enum AppRoles {
    ADMIN = 'ADMIN',
    NORMAL = 'NORMAL',
  }
  export enum AppResources {
      USUARIO = "USUARIO"
  }
  
  export const roles: RolesBuilder = new RolesBuilder();
  
  
  //roles
   // .grant(AppRoles.NORMAL) // define new or modify existing role. also takes an array.
      //.createOwn('usuario') // equivalent to .createOwn('video', ['*'])
      //.deleteOwn('usuario')
//      .updateOwn([AppResources.USUARIO])
//      .readOwn([AppResources.USUARIO])
//    .grant(AppRoles.ADMIN) // switch to another role without breaking the chain
//      .extend(AppRoles.NORMAL) // inherit role capabilities. also takes an array
//      .updateAny([AppResources.USUARIO]) // explicitly defined attributes
//      .deleteAny([AppResources.USUARIO])
//      .createAny([AppResources.USUARIO])
//      .readAny([AppResources.USUARIO])
roles
  .grant("ADMIN")
      .readAny("USUARIO")