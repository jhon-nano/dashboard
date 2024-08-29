import { ModuloBase } from "./baseModulo";

interface Permiso {
  code: string;
  label: string;
}

interface CategoriaPermisos {
  [categoria: string]: Record<string, Permiso>;
}



class TypesReservas extends ModuloBase {

  constructor(router: any) {
    super(
      true,     // visible
      'two_wheeler',  // icon
      'Reservas', // nombreModulo
      '/reservas', // path
      'Documentos Levantamiento Dominio.', // detalle
      true,     // maneja_almacenes
      true,      // maneja_consecutivos
      router
    );
  }
 



  static StoreConstants: Record<string, string> = {
    LOADING_RESERVA: "LOADING_RESERVA",
    QUERY_RESERVAS: "QUERY_RESERVAS",
    FILTERING_RESERVAS: "FILTERING_RESERVAS",
    GROUPING_RESERVAS: "GROUPING_RESERVAS",
    FILTER_TABLE_RESERVAS: "FILTER_TABLE_RESERVAS",
    FILTRO_RESERVAS: "FILTRO_RESERVAS",

  };

  static StoreSelectors: Record<string, string> = {
    SHOW_ALL_RESERVAS: "SHOW_ALL_RESERVAS",
    SHOW_RESERVAS_ACTIVE: "SHOW_RESERVAS_ACTIVE",
    SHOW_RESERVAS_INACTIVE: "SHOW_RESERVAS_INACTIVE",
  };


  static Permisos: CategoriaPermisos = {
    RESERVAS: {
      AGREGAR_RESERVA: {code: "AGREGAR_RESERVA", label: 'Crear Reserva'},
      VER_RESERVA:  {code: "VER_RESERVA", label: 'Ver Reserva'},
      UPDATE_RESERVA:  {code: "UPDATE_RESERVA", label: 'Actualizar Reserva'},
      UPDATE_DATOS_RESERVA:  {code: "UPDATE_DATOS_RESERVA", label: 'Actualizar Datos de Reserva'},
      VER_COLUMNAS:  {code: "VER_COLUMNAS", label: 'Ver Columnas Tabla Reserva'},
      FILTROS_TABLA: {code:  "FILTROS_TABLA", label: 'Filtros de Reserva'},
      EXPORTAR_TABLA:  {code: "EXPORTAR_TABLA", label: 'Exportar Datos Reserva'},
      IMPORTAR_TABLA: {code: "IMPORTAR_TABLA" , label: 'Importar Datos Reserva'},
      INFORMES_RESERVAS: {code: "INFORMES_RESERVAS", label: 'Ver Informes Reserva'},

      },

  };


}

export default TypesReservas;