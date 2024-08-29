import { ModuloBase } from "./baseModulo";

interface Permiso {
  code: string;
  label: string;
}

interface CategoriaPermisos {
  [categoria: string]: Record<string, Permiso>;
}

class TypesInformePedidos extends ModuloBase {

  submodulos: Record<string, ModuloBase> = {};

  constructor(router: any) {
    super(
      true,               // visible
      'local_shipping',   // icon
      'INFORMES PEDIDOS', // nombreModulo
      '/informes-pedidos',// path
      'Informes sobre Pedidos.', // detalle
      false,              // maneja_almacenes (ajusta según necesidad)
      false,              // maneja_consecutivos (ajusta según necesidad)
      router
    );

 }

  static StoreConstants: Record<string, string> = {
    LOADING_INFORME_PEDIDOS: "LOADING_INFORME_PEDIDOS",
    QUERY_INFORMES_PEDIDOS: "QUERY_INFORMES_PEDIDOS",
    FILTERING_INFORMES_PEDIDOS: "FILTERING_INFORMES_PEDIDOS",
    GROUPING_INFORMES_PEDIDOS: "GROUPING_INFORMES_PEDIDOS",
    FILTER_TABLE_INFORMES_PEDIDOS: "FILTER_TABLE_INFORMES_PEDIDOS",
    FILTRO_INFORMES_PEDIDOS: "FILTRO_INFORMES_PEDIDOS",
  };

  static StoreSelectors: Record<string, string> = {
    SHOW_ALL_INFORMES_PEDIDOS: "SHOW_ALL_INFORMES_PEDIDOS",
    SHOW_INFORMES_PEDIDOS_DETALLE: "SHOW_INFORMES_PEDIDOS_DETALLE",
  };

  static Permisos: CategoriaPermisos = {
    InformePedidos: {
      GENERAR_INFORME_PEDIDOS: {code: "GENERAR_INFORME_PEDIDOS", label: 'Generar Informe de Pedidos'},
      VER_INFORME_PEDIDOS: {code: "VER_INFORME_PEDIDOS", label: 'Ver Informe de Pedidos'},
      FILTROS_TABLA_INFORME_PEDIDOS: {code: "FILTROS_TABLA_INFORME_PEDIDOS", label: 'Filtros de Informe de Pedidos'},
    },
  };
}

export default TypesInformePedidos;
