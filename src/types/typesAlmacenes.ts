import { ModuloBase } from "./baseModulo";

interface Permiso {
  code: string;
  label: string;
}

interface CategoriaPermisos {
  [categoria: string]: Record<string, Permiso>;
}

class TypesAlmacenes extends ModuloBase  {


  constructor(router: any) {
    super(
      false,     // visible
      'business',  // icon
      'Almacenes', // nombreModulo
      '/configuracion', // path
      '& consecutivos', // detalle
      false,     // maneja_almacenes
      false,      // maneja_consecutivos
      router
    );
  }
 



  static StoreConstants: Record<string, string> = {
    LOADING_ALMACEN: "LOADING_ALMACEN",
    QUERY_ALMACENES: "QUERY_ALMACENES",
    FILTERING_ALMACENES: "FILTERING_ALMACENES",
    GROUPING_ALMACENES: "GROUPING_ALMACENES",
    FILTER_TABLE_ALMACENES: "FILTER_TABLE_ALMACENES",
    FILTRO_ALMACENES: "FILTRO_ALMACENES",

  };

  static StoreSelectors: Record<string, string> = {
    SHOW_ALL_ALMACENES: "SHOW_ALL_ALMACENES",
    SHOW_ALMACENES_ACTIVE: "SHOW_ALMACENES_ACTIVE",
    SHOW_ALMACENES_INACTIVE: "SHOW_ALMACENES_INACTIVE",
  };


  static Permisos: CategoriaPermisos = {
    Almacen: {
      AGREGAR_ALMACEN: {code: "AGREGAR_ALMACEN", label: 'Crear Almacen'},
      VER_ALMACEN: {code: "VER_ALMACEN", label: 'Ver Almacen'},
      INACTIVAR_ALMACEN: {code: "INACTIVAR_ALMACEN", label: 'Inactivar Almacen'},
    },
  };

}

export default TypesAlmacenes;