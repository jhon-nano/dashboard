import { ModuloBase } from "./baseModulo";

interface Permiso {
  code: string;
  label: string;
}

interface CategoriaPermisos {
  [categoria: string]: Record<string, Permiso>;
}

class TypesInventarios extends ModuloBase  {

  constructor(router: any) {
    super(
      true,     // visible
      'import_export',  // icon
      'Inventarios', // nombreModulo
      '/inventarios', // path
      'Inventario, Kardex & Ajustes.', // detalle
      true,     // maneja_almacenes
      true,      // maneja_consecutivos
      router
    );
  }


  static StoreConstants: Record<string, string> = {
    LOADING_INVENTARIOS: "LOADING_INVENTARIOS",
    QUERY_INVENTARIOS: "QUERY_INVENTARIOS",
    FILTERING_INVENTARIOS: "FILTERING_INVENTARIOS",
    GROUPING_INVENTARIOS: "GROUPING_INVENTARIOS",
    FILTER_TABLE_INVENTARIOS: "FILTER_TABLE_INVENTARIOS",
    FILTRO_INVENTARIOS: "FILTRO_INVENTARIOS",
    FILTERING_ALMACENES_INVENTARIOS: "FILTERING_ALMACENES_INVENTARIOS",
    FILTERING_COMPRAITEM_PRODUCTOS: "FILTERING_COMPRAITEM_PRODUCTOS",
    OPEN_AJUSTE:"OPEN_AJUSTE",
    OPEN_UPDATE_PRECIO:"OPEN_UPDATE_PRECIO",
    OPEN_UPDATE_UBICACION:"OPEN_UPDATE_UBICACION",
    FILTERING_LINEAS_INVENTARIOS:'FILTERING_LINEAS_INVENTARIOS',
    FILTERING_CATEGORIAS_INVENTARIOS:'FILTERING_CATEGORIAS_INVENTARIOS',
    FILTERING_MARCAS_INVENTARIOS: 'FILTERING_MARCAS_INVENTARIOS',
  };

  static StoreSelectors: Record<string, string> = {
    SHOW_ALL: "SHOW_ALL",
    SHOW_INVENTARIOS_DISPONIBLE: "SHOW_INVENTARIOS_DISPONIBLE",
    SHOW_INVENTARIOS_SEPARADO: "SHOW_INVENTARIOS_SEPARADO",
    SHOW_INVENTARIOS_SIN_SALDO: "SHOW_INVENTARIOS_SIN_SALDO",
    SHOW_INVENTARIOS_NEGATIVOS: "SHOW_INVENTARIOS_NEGATIVOS",

    SHOW_INVENTARIOS_PROVEEDOR:"SHOW_INVENTARIOS_PROVEEDOR",
    SHOW_INVENTARIOS_UBICACION:"SHOW_INVENTARIOS_UBICACION",
    SHOW_INVENTARIOS_INACTIVOS: "SHOW_INVENTARIOS_INACTIVOS",
  };


  static Permisos: CategoriaPermisos = {
    Inventarios:{
      VER_INVENTARIO: {code: "VER_INVENTARIO", label: 'Ver Inventario'},
      VER_UBICACION: {code: "VER_UBICACION", label: 'Ver Ubicación'},
      UPDATE_PRECIO: {code: "UPDATE_PRECIO", label: 'Actualizar Precio'},
      UPDATE_UBICACION: {code: "UPDATE_UBICACION", label: 'Actualizar Ubicaciónes'},

      FILTROS_TABLA:{code:"FILTROS_TABLA",label:"Filtrar Tabla"},
      INFORMES_INVENTARIOS: {code: "INFORMES_INVENTARIOS", label: 'Ver Informes'},

   
    },
    AjusteInventario: {
      AGREGAR_AJUSTE: {code: "AGREGAR_AJUSTE", label: 'Crear Ajuste'},
      AGREGAR_AJUSTE_RAPIDO: {code: "AGREGAR_AJUSTE_RAPIDO", label: 'Crear Ajuste Rápido'},


      INACTIVAR_INVENTARIO: {code: 'INACTIVAR_INVENTARIO', label: 'Inactivar Inventario'},
      ACTIVAR_INVENTARIO: {code: 'ACTIVAR_INVENTARIO', label: 'Activar Inventario'},
    },
    Traslado:{
      AGREGAR_TRASLADO: {code: "AGREGAR_TRASLADO", label: 'Crear Traslado'},
    }
  };





}

export default TypesInventarios;