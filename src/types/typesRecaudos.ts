import { ModuloBase } from "./baseModulo";

interface Permiso {
  code: string;
  label: string;
}

interface CategoriaPermisos {
  [categoria: string]: Record<string, Permiso>;
}

class TypesRecaudos extends ModuloBase  {

  constructor(router: any, parentPath: string) {
    super(
      true,     // visible
      'savings',  // icon
      'RECIBOS CAJA', // nombreModulo
      `${parentPath}/recaudo`, // path
      'Recaudo de Cartera.', // detalle
      true,     // maneja_almacenes
      true,      // maneja_consecutivos
      router
    );
  }

  static StoreConstants: Record<string, string> = {
    FILTRO_RECAUDO: "FILTRO_RECAUDO",
    LOADING_RECAUDO: "LOADING_RECAUDO",
    QUERY_RECAUDO: "QUERY_RECAUDO",
    FILTERING_RECAUDO: "FILTERING_RECAUDO",
    GROUPING_RECAUDO: "GROUPING_RECAUDO",
    FILTERING_FECHA_RECAUDO: "FILTERING_FECHA_RECAUDO",
  };

  static StoreSelectors: Record<string, string> = {
    SHOW_ALL: "SHOW_ALL",
    SHOW_RECAUDO_INACTIVOS: "SHOW_RECAUDO_INACTIVOS",
  };

  static Permisos: CategoriaPermisos = {
    Inventario:{
      VER_RECAUDO: {code: "VER_RECAUDO", label: 'Ver '},
      UPDATE_RECAUDO: {code: "UPDATE_RECAUDO", label: 'Actualizar Recaudo'},
      CREATE_RECAUDO: {code: "CREATE_RECAUDO", label: 'Crear Recaudo'},
      DELETE_RECAUDO: {code: "DELETE_RECAUDO", label: 'Eliminar Recaudo'},
    },
  };

}

export default TypesRecaudos;