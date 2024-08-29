import { DataStore } from "@aws-amplify/datastore";
import {
  Estado,
  LazyUsuario,
  ModuloUserAlmacenes,
  ModuloUserPermiso
} from "../models";
import CustomNotification from "../models/CustomNotification";
import { IModuloService } from "./interface/IModuloService";


export default class ModuloService implements IModuloService {




  
//-----------------------------AYUDADORES---------------------------------------------


  async getModuloUserAlmacenes(usuario: LazyUsuario,path: any): Promise<ModuloUserAlmacenes[] | null> {

 
      const model_almacenes = await DataStore.query(ModuloUserAlmacenes, (c) => c.and((c) => [
          c.moduloUserAlmacenesUsuarioId.eq(usuario.id),
          c.estado.eq(Estado.ACTIVO),
        ])
      );

      if(model_almacenes.length == 0){
        throw new CustomNotification("No tiene Almacenes Autorizados.", 404);
      }

      return model_almacenes.filter((e) => e.ModuloNew?.path == path)
}
  
  
  async getModuloUserPermisos(usuario: LazyUsuario): Promise<ModuloUserPermiso[] | null> {
   
        const model_permisos = await DataStore.query(ModuloUserPermiso, (c) =>
          c.and((c) => [
            c.moduloUserPermisoUsuarioId.eq(usuario.id),
            c.estado.eq(Estado.ACTIVO),
          ])
        );
      
        return model_permisos;

  }
}



