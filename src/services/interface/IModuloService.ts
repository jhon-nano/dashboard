import { LazyModuloNew, ModuloUserAlmacenes, ModuloUserPermiso, Usuario } from "../../models";


export interface IModuloService  {


  getModuloUserAlmacenes(usuario: Usuario, path: string): Promise<ModuloUserAlmacenes[] | null>;
  getModuloUserPermisos(usuario: Usuario, modulo: LazyModuloNew): Promise<ModuloUserPermiso[] | null>;
  }