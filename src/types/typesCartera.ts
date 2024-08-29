import { ModuloBase } from "./baseModulo";
import TypesCarteraClientes from "./typesCarteraClientes";
import TypesCarteraProveedores from "./typesCarteraProveedores";

interface Permiso {
  code: string;
  label: string;
}

interface CategoriaPermisos {
  [categoria: string]: Record<string, Permiso>;
}

class TypesCartera extends ModuloBase  {

  submodulos: Record<string, ModuloBase> = {};

  constructor(router: any) {
    super(
      true,     // visible
      'work',  // icon
      'Carteras', // nombreModulo
      '/carteras', // path
      'Cuentas por Pagar & Cobrar.', // detalle
      true,     // maneja_almacenes
      true,      // maneja_consecutivos
      router
    );

    // Inicializar submódulos con el path del módulo padre
   this.submodulos["proveedores"] = new TypesCarteraProveedores(router, this.path);





  }

  static StoreConstants: Record<string, string> = {
    LOADING_CARTERA: "LOADING_CARTERA",
    QUERY_CARTERA_PROVEEDORES: "QUERY_CARTERA_PROVEEDORES",
    FILTERING_CARTERA: "FILTERING_CARTERA",
    GROUPING_CARTERA: "GROUPING_CARTERA",
    FILTER_TABLE_CARTERA: "FILTER_TABLE_CARTERA",
    FILTRO_CARTERA: "FILTRO_CARTERA",
    FILTERING_FECHA_CARTERA: "FILTERING_FECHA_CARTERA",
  };

  static StoreSelectors: Record<string, string> = {
    SHOW_ALL: "SHOW_ALL",
    SHOW_CARTERA_INACTIVOS: "SHOW_CARTERA_INACTIVOS",
  };

  static Permisos: CategoriaPermisos = {
    Inventario:{
      VER_CARTERA: {code: "VER_CARTERA", label: 'Ver '},
      UPDATE_CARTERA: {code: "UPDATE_CARTERA", label: 'Actualizar Cartera'},
      CREATE_CARTERA: {code: "CREATE_CARTERA", label: 'Crear Cartera'},
      DELETE_CARTERA: {code: "DELETE_CARTERA", label: 'Eliminar Cartera'},
    },
  };

}

export default TypesCartera;