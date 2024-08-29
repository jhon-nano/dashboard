import { ModuloBase } from "./baseModulo";

interface Permiso {
  code: string;
  label: string;
}

interface CategoriaPermisos {
  [categoria: string]: Record<string, Permiso>;
}

class TypesAjustes extends ModuloBase  {

  constructor(router: any) {
    super(
      true,     // visible
      'difference',  // icon
      'Ajustes ', // nombreModulo
      '/ajustes', // path
      'Ajustes de Inventario.', // detalle
      true,     // maneja_almacenes
      true,      // maneja_consecutivos
      router
    );
  }


  static StoreConstants: Record<string, string> = {
    FILTRO_AJUSTES: "FILTRO_AJUSTES",
    LOADING_AJUSTES: "LOADING_AJUSTES",
    QUERY_AJUSTES: "QUERY_AJUSTES",
    FILTERING_FECHA_AJUSTES: "FILTERING_FECHA_AJUSTES",
    FILTERING_AJUSTES: "FILTERING_AJUSTES",
    GROUPING_AJUSTES: "GROUPING_AJUSTES",
    
    AJUSTES_TERCEROS:"AJUSTES_TERCEROS",
    AJUSTES_ALMACENES:"AJUSTES_ALMACENES",
    FILTERING_TERCEROS_AJUSTES:"FILTERING_TERCEROS_AJUSTES",
    FILTERING_ALMACENES_AJUSTES:"FILTERING_ALMACENES_AJUSTES",
    FILTER_TABLE_AJUSTES:"FILTER_TABLE_AJUSTES",
  };

  static StoreSelectors: Record<string, string> = {
    SHOW_ALL: "SHOW_ALL",
    SHOW_ALL_TRASLADOS: "SHOW_ALL_TRASLADOS",
    SHOW_ALL_AJUSTE_INVENTARIO: "SHOW_ALL_AJUSTE_INVENTARIO",
    SHOW_ALL_INVENTARIO_FISICO: "SHOW_ALL_INVENTARIO_FISICO",
    SHOW_AJUSTES_INACTIVOS: "SHOW_AJUSTES_INACTIVOS",
  };


  static Permisos: CategoriaPermisos = {
    Inventario:{
      VER_AJUSTE: {code: "VER_AJUSTE", label: 'Ver '},
      UPDATE_AJUSTE: {code: "UPDATE_AJUSTE", label: 'Actualizar Ajuste'},
      CREATE_AJUSTE: {code: "CREATE_AJUSTE", label: 'Crear Ajustes'},
      DELETE_AJUSTE: {code: "DELETE_AJUSTE", label: 'Eliminar Ajustes'},
    },

  };





}

export default TypesAjustes;