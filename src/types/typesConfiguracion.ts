import { ModuloBase } from "./baseModulo";

interface Permiso {
  code: string;
  label: string;
}

interface CategoriaPermisos {
  [categoria: string]: Record<string, Permiso>;
}



class TypesConfiguracion extends ModuloBase  {

  constructor(router: any) {
    super(
      false,     // visible
      'settings',  // icon
      'Configuracion', // nombreModulo
      '/configuracion', // path
      'Control de la Aplicaciones', // detalle
      false,     // maneja_almacenes
      false,      // maneja_consecutivos
      router
    );
  }


  static StoreConstants: Record<string, string> = {
    LOADING_COMPRA: "LOADING_COMPRA",
    OPEN_FILTRO: "OPEN_FILTRO"
  };

  static StoreSelectors: Record<string, string> = {

  };
  
  static Permisos: CategoriaPermisos = {
    SS: {
      VER_COMPRA: {code: "VER_COMPRA", label: 'Ver COMPRA'},

      },

  };

}

export default TypesConfiguracion;