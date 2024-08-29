import { ModuloBase } from "./baseModulo";

interface Permiso {
  code: string;
  label: string;
}

interface CategoriaPermisos {
  [categoria: string]: Record<string, Permiso>;
}

class TypesFacturacion extends ModuloBase {

  constructor(router: any, parentPath: string) {
    super(
      false,     // visible
      'receipt_long',  // icon
      'Facturación', // nombreModulo
      `${parentPath}/facturacion`, // path
      'Gestión de Facturación.', // detalle
      true,     // maneja_almacenes
      true,      // maneja_consecutivos
      router
    );
  }

  static StoreConstants: Record<string, string> = {
    LOADING_FACTURACION: "LOADING_FACTURACION",
    QUERY_FACTURACIONES: "QUERY_FACTURACIONES",
    FILTRO_FACTURACIONES: "FILTRO_FACTURACIONES",
    FILTERING_FACTURACIONES: "FILTERING_FACTURACIONES",
    GROUPING_FACTURACIONES: "GROUPING_FACTURACIONES",
    FILTER_TABLE_FACTURACIONES: "FILTER_TABLE_FACTURACIONES",
  };

  static StoreSelectors: Record<string, string> = {
    SHOW_ALL_FACTURACIONES: "SHOW_ALL_FACTURACIONES",
    SHOW_FACTURACIONES_ANULADAS: "SHOW_FACTURACIONES_ANULADAS",
  };

  static Permisos: CategoriaPermisos = {
    Facturacion: {
      AGREGAR_FACTURACION: {code: "AGREGAR_FACTURACION", label: 'Crear Facturación'},
      VER_FACTURACION: {code: "VER_FACTURACION", label: 'Ver Facturación'},
    },
  };

}

export default TypesFacturacion;
