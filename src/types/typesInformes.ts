import { ModuloBase } from "./baseModulo";
// Asegúrate de tener este archivo o módulo

interface Permiso {
  code: string;
  label: string;
}

interface CategoriaPermisos {
  [categoria: string]: Record<string, Permiso>;
}

class TypesInformes extends ModuloBase {



  constructor(router: any) {
    super(
      true,                // visible
      'insert_chart',       // icon
      'INFORMES',           // nombreModulo
      '/informes',          // path
      'Informes, Resúmenes.', // detalle
      true,               // maneja_almacenes (ajusta según necesidad)
      false,               // maneja_consecutivos (ajusta según necesidad)
      router
    );


  }

  static StoreConstants: Record<string, string> = {
    LOADING_INFORME: "LOADING_INFORME",
    QUERY_COMPRAS: "QUERY_COMPRAS",
    QUERY_PEDIDOS: 'QUERY_PEDIDOS',
    QUERY_INVENTARIOS: 'QUERY_INVENTARIOS',
  };

  static StoreSelectors: Record<string, string> = {
    SHOW_ALL_INFORMES: "SHOW_ALL_INFORMES",
    SHOW_INFORMES_VENTAS: "SHOW_INFORMES_VENTAS",
    SHOW_INFORMES_RESUMENES: "SHOW_INFORMES_RESUMENES",
  };

  static Permisos: CategoriaPermisos = {
    Informe: {
      GENERAR_INFORME: {code: "GENERAR_INFORME", label: 'Generar Informe'},
      VER_INFORME: {code: "VER_INFORME", label: 'Ver Informe'},
      FILTROS_TABLA_INFORME: {code: "FILTROS_TABLA", label: 'Filtros de Informe'},
    },
  };
}

export default TypesInformes;
