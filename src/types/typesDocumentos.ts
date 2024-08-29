import { ModuloBase } from "./baseModulo";
import TypesCotizacion from "./typesCotizacion";
import TypesCredito from "./typesCreditos";
import TypesFacturacion from "./typesFacturacion";
import TypesPagos from "./typesPagos";
import TypesPedido from "./typesPedido";
import TypesPOS from "./typesPOS";
import TypesRecaudos from "./typesRecaudos";

interface Permiso {
  code: string;
  label: string;
}

interface CategoriaPermisos {
  [categoria: string]: Record<string, Permiso>;
}

class TypesDocumentos extends ModuloBase  {

  submodulos: Record<string, ModuloBase> = {};


  constructor(router: any) {
    super(
      true,     // visible
      'assignment',  // icon
      'DOCUMENTOS', // nombreModulo
      '/documentos', // path
      '', // detalle
      true,     // maneja_almacenes
      true,      // maneja_consecutivos
      router
    );


    // Inicializar submódulos con el path del módulo padre
    this.submodulos["pagos"] = new TypesPagos(router, this.path);


  }
 


  static StoreConstants: Record<string, string> = {
    LOADING_VENTA: "LOADING_VENTA",
    QUERY_VENTAS: "QUERY_VENTAS",
    FILTERING_VENTAS: "FILTERING_VENTAS",
    GROUPING_VENTAS: "GROUPING_VENTAS",
    FILTER_TABLE_VENTAS: "FILTER_TABLE_VENTAS",
    FILTRO_VENTAS: "FILTRO_VENTAS",
    VENTAS_ALMACENES: "VENTAS_ALMACENES",
    VENTAS_TERCEROS:"VENTAS_TERCEROS"

  };

  static StoreSelectors: Record<string, string> = {
    SHOW_ALL: "SHOW_ALL",
    SHOW_ALL_VENTAS: "SHOW_ALL_VENTAS",
    SHOW_ALL_SEPARADOS: "SHOW_ALL_SEPARADOS",
    SHOW_VENTAS_ENTREGAR: "SHOW_VENTAS_ENTREGAR",
    SHOW_VENTAS_VENTAR: "SHOW_VENTAS_VENTAR",
    SHOW_VENTAS_ANULADAS: "SHOW_VENTAS_ANULADAS",

  };

  static Permisos: CategoriaPermisos = {
    Venta: {
      AGREGAR_VENTA: {code: "AGREGAR_VENTA", label: 'Crear Venta'},
      VER_VENTA: {code: "VER_VENTA", label: 'Ver Venta'},
      FILTROS_TABLA_VENTA: {code: "FILTROS_TABLA", label: 'Filtros de Venta'},
      INFORMES_VENTAS: {code: "INFORMES_VENTAS", label: 'Ver Informes Venta'},
    },
  };

}

export default TypesDocumentos;