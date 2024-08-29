import { ModuloBase } from "./baseModulo";

interface Permiso {
  code: string;
  label: string;
}

interface CategoriaPermisos {
  [categoria: string]: Record<string, Permiso>;
}


class TypesConsecutivos extends ModuloBase  {

  constructor(router: any) {
    super(
      false,     // visible
      'format_list_numbered',  // icon
      'Consecutivos', // nombreModulo
      '/consecutivos', // path
      'Modulos y Codigos', // detalle
      false,     // maneja_almacenes
      false,      // maneja_consecutivos
      router
    );
  }
 


  static StoreConstants: Record<string, string> = {
    LOADING_COMPRA: "LOADING_COMPRA",

  };

  static StoreSelectors: Record<string, string> = {

  };
  
  static Permisos: CategoriaPermisos = {
    SS: {
      VER_COMPRA: {code: "VER_COMPRA", label: 'Ver COMPRA'},

      },

  };

}

export default TypesConsecutivos;