import { ModuloBase } from "./baseModulo";

interface Permiso {
  code: string;
  label: string;
}

interface CategoriaPermisos {
  [categoria: string]: Record<string, Permiso>;
}

class TypesPedido extends ModuloBase  {




  constructor(router: any, parentPath: string) {
    super(
      true,     // visible
      'point_of_sale',  // icon
      'Pedidos', // nombreModulo
      `${parentPath}/pedidos`, // path
      'Gestión de Pedidos & Separados', // detalle
      true,     // maneja_almacenes
      true,      // maneja_consecutivos
      router
    );
  }
 

  static DefaultConfig: Record<string, any> = {
    someConfigKey: 'defaultValuePedido',
    maneja_cambio: false,
    // Agrega aquí otras configuraciones predeterminadas según sea necesario
  };



  static StoreConstants: Record<string, string> = {
    LOADING_PEDIDO: "LOADING_PEDIDO",
    QUERY_PEDIDOS: "QUERY_PEDIDOS",
    FILTERING_PEDIDOS: "FILTERING_PEDIDOS",
    GROUPING_PEDIDOS: "GROUPING_PEDIDOS",
    FILTER_TABLE_PEDIDOS: "FILTER_TABLE_PEDIDOS",
    FILTRO_PEDIDOS: "FILTRO_PEDIDOS",
    FILTERING_TERCEROS_PEDIDOS:'FILTERING_TERCEROS_PEDIDOS',
    FILTERING_FECHA_PEDIDOS:'FILTERING_FECHA_PEDIDOS',
    PEDIDOS_TERCEROS:'PEDIDOS_TERCEROS',
    PEDIDOS_ALMACENES:'PEDIDOS_ALMACENES',
    FILTERING_ALMACENES_PEDIDOS:'FILTERING_ALMACENES_PEDIDOS',
    OPEN_DIALOG_CAMBIO:'OPEN_DIALOG_CAMBIO'
  };

  static StoreSelectors: Record<string, string> = {
    SHOW_ALL: "SHOW_ALL",
    SHOW_ALL_PEDIDOS: "SHOW_ALL_PEDIDOS",
    SHOW_ALL_SEPARADOS: "SHOW_ALL_SEPARADOS",
    SHOW_PEDIDOS_ENTREGAR: "SHOW_PEDIDOS_ENTREGAR",
    SHOW_PEDIDOS_FACTURAR: "SHOW_PEDIDOS_FACTURAR",
    SHOW_PEDIDOS_ANULADAS: "SHOW_PEDIDOS_ANULADAS",

  };


  static Permisos: CategoriaPermisos = {
    Pedido: {
      AGREGAR_PEDIDO: {code: "AGREGAR_PEDIDO", label: 'Crear Pedido'},
      VER_PEDIDO: {code: "VER_PEDIDO", label: 'Ver Pedido'},
      FINALIZAR_PEDIDO: {code: "FINALIZAR_PEDIDO", label: 'Finalizar Pedido'},
      UPDATE_PEDIDO: {code: "UPDATE_PEDIDO", label: 'Actualizar Pedido'},
      ANULAR_PEDIDO: {code: "ANULAR_PEDIDO", label: 'Anular Pedido'},
      INFORMES_PEDIDOS: {code: "INFORMES_PEDIDOS", label: 'Ver Informes Pedido'},
      FILTROS_TABLA: {code: "FILTROS_TABLA", label: 'Filtros de Pedido'},
    },
    Tercero: {
      AGREGAR_TERCERO: {code: "AGREGAR_TERCERO", label: 'Crear Tercero'},

    },
  };




}

export default TypesPedido;