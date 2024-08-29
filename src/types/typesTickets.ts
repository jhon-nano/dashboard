import { ModuloBase } from "./baseModulo";

interface Permiso {
  code: string;
  label: string;
}

interface CategoriaPermisos {
  [categoria: string]: Record<string, Permiso>;
}

class TypesTickets extends ModuloBase  {

  constructor(router: any) {
    super(
      true,     // visible
      'confirmation_number',  // icon (puedes cambiar el icono si lo deseas)
      'Tickets', // nombreModulo
      '/tickets', // path
      'Gestión de Tickets.', // detalle
      true,     // maneja_almacenes (ajusta según sea necesario)
      true,      // maneja_consecutivos (ajusta según sea necesario)
      router
    );
  }

  static StoreConstants: Record<string, string> = {
    FILTRO_TICKETS: "FILTRO_TICKETS",
    LOADING_TICKETS: "LOADING_TICKETS",
    QUERY_TICKETS: "QUERY_TICKETS",
    FILTERING_FECHA_TICKETS: "FILTERING_FECHA_TICKETS",
    FILTERING_TICKETS: "FILTERING_TICKETS",
    GROUPING_TICKETS: "GROUPING_TICKETS",
    
    TICKETS_TERCEROS:"TICKETS_TERCEROS",
    TICKETS_ALMACENES:"TICKETS_ALMACENES",
    FILTERING_TERCEROS_TICKETS:"FILTERING_TERCEROS_TICKETS",
    FILTERING_ALMACENES_TICKETS:"FILTERING_ALMACENES_TICKETS",
    FILTER_TABLE_TICKETS:"FILTER_TABLE_TICKETS",
  };

  static StoreSelectors: Record<string, string> = {
    SHOW_ALL: "SHOW_ALL",
    SHOW_ALL_TRASLADOS: "SHOW_ALL_TRASLADOS",
    SHOW_ALL_TICKET: "SHOW_ALL_TICKET",
    SHOW_ALL_TICKET_FISICO: "SHOW_ALL_TICKET_FISICO",
    SHOW_TICKETS_INACTIVOS: "SHOW_TICKETS_INACTIVOS",
  };

  static Permisos: CategoriaPermisos = {
    Tickets: {
      VER_TICKET: {code: "VER_TICKET", label: 'Ver Ticket'},
      UPDATE_TICKET: {code: "UPDATE_TICKET", label: 'Actualizar Ticket'},
      CREATE_TICKET: {code: "CREATE_TICKET", label: 'Crear Tickets'},
      DELETE_TICKET: {code: "DELETE_TICKET", label: 'Eliminar Tickets'},
    },
  };
}

export default TypesTickets;
