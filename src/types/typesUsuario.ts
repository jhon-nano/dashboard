import { ModuloBase } from "./baseModulo";

interface Permiso {
  code: string;
  label: string;
}

interface CategoriaPermisos {
  [categoria: string]: Record<string, Permiso>;
}

class TypesUsuarios extends ModuloBase  {

  constructor(router: any) {
    super(
      false,     // visible
      'manage_accounts',  // icon
      'Usuarios', // nombreModulo
      '/configuracion', // path
      'Control de Usuarios', // detalle
      false,     // maneja_almacenes
      false,      // maneja_consecutivos
      router
    );
  }


  static StoreConstants: Record<string, string> =  {
    ALMACENES_AUTORIZADOS: "ALMACENES_AUTORIZADOS",
    PERMISOS_AUTORIZADOS: "PERMISOS_AUTORIZADOS",
    SELECT_MODULO: "SELECT_MODULO",
    QUERY_USUARIO: "QUERY_USUARIO",
  };

  static StoreSelectors: Record<string, string>  = {

  };

  static Permisos: CategoriaPermisos = {
    Usuario: {
      AGREGAR_USUARIO: {code: "AGREGAR_USUARIO", label: 'Crear Usuario'},
      VER_USUARIO: {code: "VER_USUARIO", label: 'Ver Usuario'},
      UPDATE_USUARIO: {code: "UPDATE_USUARIO", label: 'Actualizar Usuario'},
    },
  };

}

export default TypesUsuarios;