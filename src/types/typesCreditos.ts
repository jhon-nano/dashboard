import { ModuloBase } from "./baseModulo";

interface Permiso {
  code: string;
  label: string;
}

interface CategoriaPermisos {
  [categoria: string]: Record<string, Permiso>;
}




class TypesCredito extends ModuloBase  {

  constructor(router: any) {
    super(
      true,     // visible
      'assignment',  // icon
      'Creditos', // nombreModulo
      '/creditos', // path
      'Solicitudes de Credito', // detalle
      true,     // maneja_almacenes
      true,      // maneja_consecutivos
      router
    );
  }
 
 

  static StoreConstants: Record<string, string> = {
    LOADING_CREDITO: "LOADING_CREDITO",
    QUERY_CREDITO: "QUERY_CREDITO",
    QUERY_CREDITOS: "QUERY_CREDITOS",
    FILTERING_CREDITOS: "FILTERING_CREDITOS",
    GROUPING_CREDITOS: "GROUPING_CREDITOS",
    FILTER_TABLE_CREDITOS: "FILTER_TABLE_CREDITOS",
    FILTRO_CREDITOS: "FILTRO_CREDITOS",
    FILTERING_ALMACENES_CREDITOS:"FILTERING_ALMACENES_CREDITOS",
    FILTERING_FECHA_SOLICITUD_CREDITOS:"FILTERING_FECHA_SOLICITUD_CREDITOS",
    FILTERING_SOLICITUD_CREDITOS:"FILTERING_SOLICITUD_CREDITOS",
    GROUPING_SOLICITUD_CREDITOS:"GROUPING_SOLICITUD_CREDITOS",
    FILTER_TABLE_SOLICITUD_CREDITOS:"FILTER_TABLE_SOLICITUD_CREDITOS",

    CREDITOS_ALMACENES:"CREDITOS_ALMACENES",
    CREDITOS_CUOTAS:"CREDITOS_CUOTAS"
  };

  static StoreSelectors: Record<string, string> = {
    SHOW_ALL_CREDITOS: "SHOW_ALL_CREDITOS",
    SHOW_CREDITOS_REVISADOS: "SHOW_CREDITOS_REVISADOS",
    SHOW_CREDITOS_PENDIENTES: "SHOW_CREDITOS_PENDIENTES",
    SHOW_CREDITOS_ANULADAS: "SHOW_CREDITOS_ANULADAS",
  };




  
  static Permisos: CategoriaPermisos = {
    SS: {
      AGREGAR_CREDITO: {code: "AGREGAR_CREDITO", label: 'Crear CREDITO'},
      VER_CREDITO:  {code: "VER_CREDITO", label: 'Ver CREDITO'},
      UPDATE_CREDITO:  {code: "UPDATE_CREDITO", label: 'Actualizar CREDITO'},
      UPDATE_DATOS_CREDITO:  {code: "UPDATE_DATOS_CREDITO", label: 'Actualizar Datos de CREDITO'},
      VER_COLUMNAS:  {code: "VER_COLUMNAS", label: 'Ver Columnas Tabla CREDITO'},
      FILTROS_TABLA: {code:  "FILTROS_TABLA", label: 'Filtros de CREDITO'},
      EXPORTAR_TABLA:  {code: "EXPORTAR_TABLA", label: 'Exportar Datos CREDITO'},
      IMPORTAR_TABLA: {code: "IMPORTAR_TABLA" , label: 'Importar Datos CREDITO'},
      INFORMES_CREDITOS: {code: "INFORMES_CREDITOS", label: 'Ver Informes CREDITO'},

      },

  };



}

export default TypesCredito;