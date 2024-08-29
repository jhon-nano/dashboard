import TypesProductos from "../../types/typesProductos";


const initialState = {
  filtro: TypesProductos.StoreSelectors.SHOW_ALL_PRODUCTOS,
  filtros_seleccionados: [],
  productos: [],
  open_producto: false,

  loading: false,
  filtering: false,
  grouping: false,
  ivas: {},
  marcas: {},
  lineas: {},
  categorias: {},
  filter_productos: [],
  filter_lineas: [],
  filter_categorias: [],
  filter_marcas: [],
  filter_atributos: [],
  settings_linea: true,
  settings_categoria: true,
  settings_marca: true,
};

export default function productos(state = initialState, action) {
  switch (action.type) {
    case TypesProductos.StoreConstants.OPEN_PRODUCTO:
      return {
        ...state,
        open_producto: action.open_producto,
      };

    case TypesProductos.StoreConstants.QUERY_PRODUCTOS:
      return {
        ...state,
        productos: action.productos,
        loading: false,
      };
      case TypesProductos.StoreConstants.FILTRO_PRODUCTOS:
        return {
          ...state,
          filtro: action.filtro,
          usuario_session: action.usuario
        };
        case TypesProductos.StoreConstants.FILTRO_SELECCIONADOS:
        return {
          ...state,
          filtros_seleccionados: action.filtros_seleccionados
        };
    case TypesProductos.StoreConstants.FILTERING_PRODUCTOS:
      return {
        ...state,
        filtering: !state.filtering,
      };
    case TypesProductos.StoreConstants.GROUPING_PRODUCTOS:
      return {
        ...state,
        grouping: !state.grouping,
      };
    case TypesProductos.StoreConstants.FILTER_TABLE_PRODUCTOS:
      return {
        ...state,
        filter_productos: action.filter_productos,
      };
    case TypesProductos.StoreConstants.FILTERING_LINEAS_PRODUCTOS:
      return {
        ...state,
        filter_lineas: action.filter_lineas,
      };
    case TypesProductos.StoreConstants.FILTERING_CATEGORIAS_PRODUCTOS:
      return {
        ...state,
        filter_categorias: action.filter_categorias,
      };
    case TypesProductos.StoreConstants.FILTERING_MARCAS_PRODUCTOS:
      return {
        ...state,
        filter_marcas: action.filter_marcas,
      };
      case TypesProductos.StoreConstants.FILTERING_ATRIBUTOS_PRODUCTOS:
        return {
          ...state,
          filter_atributos: action.filter_atributos,
        };
    default:
      return state;
  }
}
