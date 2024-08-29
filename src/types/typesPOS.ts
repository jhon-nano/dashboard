import { ModuloBase } from "./baseModulo";

interface Permiso {
  code: string;
  label: string;
}

interface CategoriaPermisos {
  [categoria: string]: Record<string, Permiso>;
}

class TypesPOS extends ModuloBase  {

  constructor(router: any, parentPath: string) {
    super(
      false,     // visible
      'receipt',  // icon
      'Cajas Registradoras', // nombreModulo
      `${parentPath}/pos`, // path
      'Gestión de Cajas Registradoras.', // detalle
      true,     // maneja_almacenes
      true,      // maneja_consecutivos
      router
    );

    
  }
 



  static StoreConstants: Record<string, string> = {
    LOADING_COTIZACION: "LOADING_COTIZACION",
    QUERY_COTIZACIONES: "QUERY_COTIZACIONES",
    FILTRO_COTIZACIONES: "FILTRO_COTIZACIONES",
    FILTERING_COTIZACIONES: "FILTERING_COTIZACIONES",
    FILTERING_FECHA_COTIZACIONES:"FILTERING_FECHA_COTIZACIONES",
    FILTERING_ALMACENES_COTIZACIONES:"FILTERING_ALMACENES_COTIZACIONES",
    GROUPING_COTIZACIONES: "GROUPING_COTIZACIONES",
    FILTER_TABLE_COTIZACIONES: "FILTER_TABLE_COTIZACIONES",
  };

  static StoreSelectors: Record<string, string> = {
    SHOW_ALL_COTIZACIONES: "SHOW_ALL_COTIZACIONES",
    SHOW_COTIZACIONES_ANULADAS: "SHOW_COTIZACIONES_ANULADAS",

  };


  static Permisos: CategoriaPermisos = {
    Cotizacion: {
      AGREGAR_COTIZACION: {code: "AGREGAR_COTIZACION", label: 'Crear Cotización'},
      VER_COTIZACION: {code: "VER_COTIZACION", label: 'Ver Cotización'},
    },
  };

}

export default TypesPOS;