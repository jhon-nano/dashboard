import { ModuloBase } from "./baseModulo";


interface Permiso {
  code: string;
  label: string;
}

interface CategoriaPermisos {
  [categoria: string]: Record<string, Permiso>;
}

class TypesProductos extends ModuloBase {

  constructor(router: any) {
    super(
      true,     // visible
      'tv',  // icon
      'Productos', // nombreModulo
      '/productos', // path
      'Lineas, Categorias & Marcas.', // detalle
      true,     // maneja_almacenes
      false,      // maneja_consecutivos
      router
    );
  }

  static StoreConstants: Record<string, string> = {
    LOADING_PRODUCTO: "LOADING_PRODUCTO",
    OPEN_PRODUCTO: "OPEN_PRODUCTO",

    QUERY_PRODUCTOS: "QUERY_PRODUCTOS",
    FILTERING_PRODUCTOS: "FILTERING_PRODUCTOS",
    GROUPING_PRODUCTOS: "GROUPING_PRODUCTOS",
    FILTER_TABLE_PRODUCTOS: "FILTER_TABLE_PRODUCTOS",
    FILTRO_PRODUCTOS: "FILTRO_PRODUCTOS",
    FILTRO_SELECCIONADOS:"FILTRO_SELECCIONADOS",
    FILTERING_LINEAS_PRODUCTOS: "FILTERING_LINEAS_PRODUCTOS",
    FILTERING_CATEGORIAS_PRODUCTOS: "FILTERING_CATEGORIAS_PRODUCTOS",
    FILTERING_MARCAS_PRODUCTOS: "FILTERING_MARCAS_PRODUCTOS",
    FILTERING_ATRIBUTOS_PRODUCTOS: "FILTERING_ATRIBUTOS_PRODUCTOS",
  };

  static StoreSelectors: Record<string, string> = {
    SHOW_ALL_PRODUCTOS: "SHOW_ALL_PRODUCTOS",
    SHOW_PRODUCTOS_ACTIVE: "SHOW_PRODUCTOS_ACTIVE",
    SHOW_PRODUCTOS_LINEA: "SHOW_PRODUCTOS_LINEA",
    SHOW_PRODUCTOS_CATEGORIA: "SHOW_PRODUCTOS_CATEGORIA",
    SHOW_PRODUCTOS_MARCA: "SHOW_PRODUCTOS_MARCA",
    SHOW_PRODUCTOS_INACTIVE: "SHOW_PRODUCTOS_INACTIVE",
  };


  static Permisos: CategoriaPermisos = {
    Producto: {
      AGREGAR_PRODUCTO: {code: "AGREGAR_PRODUCTO", label: 'Crear Producto'},
      UPDATE_PRODUCTO: {code: "UPDATE_PRODUCTO", label: 'Actualizar Producto'},
      VER_COLUMNAS_PRODUCTO: {code: "VER_COLUMNAS_PRODUCTO", label: 'Ver Columnas Tabla Producto'},
      VER_PRODUCTO: {code: "VER_PRODUCTO", label: 'Ver Producto'},
      UPDATE_PRODUCTOS_ALL: {code: "UPDATE_PRODUCTOS_ALL", label: 'Actualizar Producto Masivo'},
      DELETE_PRODUCTO: {code: "DELETE_PRODUCTO", label: 'Inactivar Producto'},
      AGREGAR_PRODUCTO_INVENTARIOS: {code: "AGREGAR_PRODUCTO_INVENTARIOS", label: 'Crear Producto en Inventarios'},
      FILTROS_TABLA_PRODUCTO: {code: "FILTROS_TABLA_PRODUCTO", label: 'Filtros de Producto'},
    },
    Lineas: {
      AGREGAR_LINEA: {code: "AGREGAR_LINEA", label: 'Crear Lineas'},
      EDITAR_LINEAS: {code: "EDITAR_LINEAS", label: 'Editar Datos Lineas'},
      VER_COLUMNAS_LINEAS: {code: "VER_COLUMNAS_LINEAS", label: 'Ver Columnas Tabla Lineas'},
    },
    Categorias: {
      AGREGAR_CATEGORIA: {code: "AGREGAR_CATEGORIA", label: 'Crear Categoria'},
      EDITAR_CATEGORIAS: {code: "EDITAR_CATEGORIAS", label: 'Editar Categoria'},
      EDITAR_CATEGORIAS_ATRIBUTOS: {code: 'EDITAR_CATEGORIAS_ATRIBUTOS', label: 'Editar Atributos'},
      VER_COLUMNAS_CATEGORIAS: {code: "VER_COLUMNAS_CATEGORIAS", label: 'Ver Columnas Tabla Categorias'},
      AGREGAR_ATRIBUTOS: {code: "AGREGAR_ATRIBUTOS", label: 'Crear Atributos'},
    },
    Marcas: {
      AGREGAR_MARCA: {code: "AGREGAR_MARCA", label: 'Crear Marca'},
      VER_COLUMNAS_MARCAS: {code: "VER_COLUMNAS_MARCAS", label: 'Ver Columnas Tabla Marcas'},
      EDITAR_MARCAS: {code: "EDITAR_MARCAS", label: 'Editar Marcas'},
    },
  };

}

export default TypesProductos;