import { Almacen, Estado, ModuloNew, ModuloUserAlmacenes, ModuloUserPermiso, Usuario } from "../../models";


export interface IUsuarioService {
    getUsuarioBySub(sub: string): Promise<any | null>;
    getUsuarioPermisos(usuario: Usuario): Promise<any[]>;

    gestionarModulos(modulo: [ModuloNew],usuario : Usuario): Promise<Usuario | null>;


    autorizarAlmacenModulo(modulo: ModuloNew,usuario : Usuario, almacen: Almacen): Promise<ModuloUserAlmacenes>;


    actualizarEstadoAlmacenModulo(id: string,estado: Estado): Promise<ModuloUserAlmacenes | null>;




    autorizarPermisoModulo(modulo: ModuloNew,usuario : Usuario, code: string): Promise<ModuloUserPermiso>;

    actualizarEstadoPermisoModulo(id: string,estado: Estado): Promise<ModuloUserPermiso | null>;

  
  }