import { ModuloBase } from "./baseModulo";

interface Permiso {
  code: string;
  label: string;
}

interface CategoriaPermisos {
  [categoria: string]: Record<string, Permiso>;
}

class TypesCompra extends ModuloBase  {

  constructor(router: any) {
    super(
      true,     // visible
      'shop',  // icon
      'Compras', // nombreModulo
      '/compras', // path
      'Compras, Devoluciones & Notas Credito.', // detalle
      true,     // maneja_almacenes
      true,      // maneja_consecutivos
      router
    );
  }
 
  static StoreConstants: Record<string, string> = {
    LOADING_COMPRA: "LOADING_COMPRA",
    QUERY_COMPRAS: "QUERY_COMPRAS",
    COMPRAS_TERCEROS:"COMPRAS_TERCEROS",
    COMPRAS_ALMACENES:"COMPRAS_ALMACENES",
    FILTERING_COMPRAS: "FILTERING_COMPRAS",
    GROUPING_COMPRAS: "GROUPING_COMPRAS",
    FILTER_TABLE_COMPRAS: "FILTER_TABLE_COMPRAS",
    OPEN_DIALOG_FINALIZAR:"OPEN_DIALOG_FINALIZAR",
    FILTRO_COMPRAS: "FILTRO_COMPRAS",
    COMPRA_XML: "COMPRA_XML",
    FILTER_FECHA_COMPRAS:"FILTER_FECHA_COMPRAS",
    FILTERING_ALMACENES_COMPRAS:"FILTERING_ALMACENES_COMPRAS",
    FILTERING_TERCEROS_COMPRAS:"FILTERING_TERCEROS_COMPRAS"
  };

  static StoreSelectors: Record<string, string> = {
    SHOW_ALL: "SHOW_ALL",
    SHOW_COMPRAS_ALL: "SHOW_COMPRAS_ALL",
    SHOW_DEVOLUCIONES_ALL: "SHOW_DEVOLUCIONES_ALL",
    SHOW_NOTA_PROVEEDOR_ALL: "SHOW_NOTA_PROVEEDOR_ALL",
    SHOW_COMPRAS_ACTIVE: "SHOW_COMPRAS_ACTIVE",
    SHOW_COMPRAS_INACTIVE: "SHOW_COMPRAS_INACTIVE",
    SHOW_COMPRAS_ANULADAS:  "SHOW_COMPRAS_ANULADAS",
    SHOW_COMPRAS_CONTA:  "SHOW_COMPRAS_CONTA",
    SHOW_COMPRAS_GRABAR:  "SHOW_COMPRAS_GRABAR",
    SHOW_COMPRAS_REVISAR:  "SHOW_COMPRAS_REVISAR",
    SHOW_COMPRAS_PENDIENTES:  "SHOW_COMPRAS_PENDIENTES",
  };
  
  static Permisos: CategoriaPermisos = {
    Compra: {
      VER_COMPRA: {code: "VER_COMPRA", label: 'Ver COMPRA'},
      REGISTRAR_COMPRA: {code: "REGISTRAR_COMPRA", label: 'Registrar COMPRA'},
      AGREGAR_COMPRA: {code: "AGREGAR_COMPRA", label: 'Crear COMPRA'},
      RECIBIR_COMPRA: {code: "RECIBIR_COMPRA", label: 'Recibir COMPRA'},
      UPDATE_COMPRA: {code: "UPDATE_COMPRA", label: 'Actualizar COMPRA'},
      ANULAR_COMPRA: {code: "ANULAR_COMPRA", label: 'Anular Compra'}, 
      UPLOAD_PDF: {code: "UPLOAD_PDF", label: 'Subir Documento PDF'}, 
      UPLOAD_IMG: {code: "UPLOAD_IMG", label: 'Subir Documento Imagenes'},
      DETELE_IMG : {code: "DETELE_IMG", label: 'Eliminar Documento Imagen'},
      },
    Devolucion: {
      VER_DEVOLUCION: {code: "VER_DEVOLUCION", label: 'Ver Devolucion'},
      AGREGAR_DEVOLUCION: {code: "AGREGAR_DEVOLUCION", label: 'Crear Devolucion'},
    },
    Visualizacion: {
      VER_REVISADOS: {code: "VER_REVISADOS", label: 'Ver Quien Revisa'},
      IMPRIMIR_COMPRAS: {code: "IMPRIMIR_COMPRAS", label: 'Imprimir COMPRA'},
      FILTROS_TABLA: {code: "FILTROS_TABLA", label: 'Filtros de COMPRA'},
      INFORMES_COMPRAS: {code: "INFORMES_COMPRAS", label: 'Ver Informes COMPRA'},
      VER_COLUMNAS: {code: "VER_COLUMNAS", label: 'Ver Columnas Tabla COMPRA'},
      },
    Exportacion_Importacion: {
      EXPORTAR_COMPRAS: {code: "EXPORTAR_COMPRAS", label: 'Exportar Datos COMPRA'},
      IMPORTAR_COMPRAS: {code: "IMPORTAR_COMPRAS", label: 'Importar Datos COMPRA'},
    }
  };
  
}

export default TypesCompra;