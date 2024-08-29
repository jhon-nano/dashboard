import { ModuloBase } from "./baseModulo";

interface Permiso {
  code: string;
  label: string;
}

interface CategoriaPermisos {
  [categoria: string]: Record<string, Permiso>;
}

class TypesTerceros  extends ModuloBase  {

  constructor(router: any) {
    super(
      true,     // visible
      'emoji_people',  // icon
      'Terceros', // nombreModulo
      '/terceros', // path
      'Clientes & Proveedores.', // detalle
      false,     // maneja_almacenes
      false,      // maneja_consecutivos
      router
    );
  }




  static StoreConstants: Record<string, string> = {
    LOADING_TERCERO: "LOADING_TERCERO",
    QUERY_TERCEROS: "QUERY_TERCEROS",
    FILTERING_TERCEROS: "FILTERING_TERCEROS",
    GROUPING_TERCEROS: "GROUPING_TERCEROS",
    FILTER_TABLE_TERCEROS: "FILTER_TABLE_TERCEROS",
    FILTRO_TERCEROS: "FILTRO_TERCEROS",
    OPEN_TERCERO: "OPEN_TERCERO",
    OPEN_FILTRO:"OPEN_FILTRO",
  };

  static StoreSelectors: Record<string, string> = {
    SHOW_ALL_TERCEROS: "SHOW_ALL_TERCEROS",
    SHOW_TERCEROS_ACTIVE: "SHOW_TERCEROS_ACTIVE",
    SHOW_TERCEROS_INACTIVE: "SHOW_TERCEROS_INACTIVE",
  };


  static Permisos: CategoriaPermisos = {
    Tercero: {
      UPDATE_TERCERO: {code: "UPDATE_TERCERO", label: 'Actualizar Tercero'},
      INACTIVAR_TERCERO: {code: "INACTIVAR_TERCERO", label: 'Inactivar Tercero'},
      AGREGAR_TERCERO: {code: "AGREGAR_TERCERO", label: 'Crear Tercero'},
      VER_COLUMNAS_TERCERO: {code: "VER_COLUMNAS", label: 'Ver Columnas Tabla Tercero'},
      VER_TERCERO: {code: "VER_TERCERO", label: 'Ver Tercero'},
      FILTROS_TABLA_TERCERO: {code: "FILTROS_TABLA", label: 'Filtros de Tercero'},
    },
  };

}

export default TypesTerceros;