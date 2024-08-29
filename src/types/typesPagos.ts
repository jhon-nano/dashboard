import { ModuloBase } from "./baseModulo";

interface Permiso {
  code: string;
  label: string;
}

interface CategoriaPermisos {
  [categoria: string]: Record<string, Permiso>;
}

class TypesPagos extends ModuloBase  {

  constructor(router: any, parentPath: string) {
    super(
      true,     // visible
      'payment',  // icon
      'Pagos', // nombreModulo
      `${parentPath}/pagos`, // path
      'Comprobantes de Egreso.', // detalle
      true,     // maneja_almacenes
      true,      // maneja_consecutivos
      router
    );
  }

  static StoreConstants: Record<string, string> = {
    LOADING_PAGOS: "LOADING_PAGOS",
    QUERY_PAGOS: "QUERY_PAGOS",
    FILTERING_PAGOS: "FILTERING_PAGOS",
    GROUPING_PAGOS: "GROUPING_PAGOS",
    FILTRO_PAGOS: "FILTRO_PAGOS",
    FILTERING_FECHA_PAGOS: "FILTERING_FECHA_PAGOS",
  };

  static StoreSelectors: Record<string, string> = {
    SHOW_ALL: "SHOW_ALL",
    SHOW_PAGO_INACTIVOS: "SHOW_PAGO_INACTIVOS",
  };

  static Permisos: CategoriaPermisos = {
    Inventario:{
      VER_PAGO: {code: "VER_PAGO", label: 'Ver '},
      UPDATE_PAGO: {code: "UPDATE_PAGO", label: 'Actualizar Pago'},
      CREATE_PAGO: {code: "CREATE_PAGO", label: 'Crear Pago'},
      DELETE_PAGO: {code: "DELETE_PAGO", label: 'Eliminar Pago'},
    },
  };

}

export default TypesPagos;