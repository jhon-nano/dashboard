import TypesInventario from "../../types/typesInventarios";


const initialState = {
  filtro: TypesInventario.StoreSelectors.SHOW_ALL,
  inventarios: [],
  loading: true,
  open_ajuste: false,
  open_precio: false,
  open_ubicacion: false,
  filtering: false,
  grouping: false,
  filter_inventarios: [],

  filter_almacenes: [],
  filter_lineas: [],
  filter_categorias: [],
  filter_marcas: [],
  filter_compraitem: [],
  almacenes: {},
};

export default function inventarios(state = initialState, action) {
  switch (action.type) {
    case TypesInventario.StoreConstants.FILTRO_INVENTARIOS:
      return {
        ...state,
        filtro: action.filtro,
      };

    case TypesInventario.StoreConstants.OPEN_AJUSTE:
      return {
        ...state,
        open_ajuste: action.open_ajuste,
      };
    case TypesInventario.StoreConstants.OPEN_UPDATE_PRECIO:
      return {
        ...state,
        open_precio: action.open_precio,
      };
    case TypesInventario.StoreConstants.OPEN_UPDATE_UBICACION:
      return {
        ...state,
        open_ubicacion: action.open_ubicacion,
      };
    case TypesInventario.StoreConstants.LOADING_INVENTARIOS:
      return {
        ...state,
        loading: !state.loading,
      };
    case TypesInventario.StoreConstants.QUERY_INVENTARIOS:
      return {
        ...state,
        inventarios: action.inventarios,
        loading: false,
      };
    case TypesInventario.StoreConstants.FILTERING_INVENTARIOS:
      return {
        ...state,
        filtering: !state.filtering,
      };
    case TypesInventario.StoreConstants.GROUPING_INVENTARIOS:
      return {
        ...state,
        grouping: !state.grouping,
      };
    case TypesInventario.StoreConstants.FILTER_TABLE_INVENTARIOS:
      return {
        ...state,
        filter_inventarios: action.filter_inventarios,
      };
    case TypesInventario.StoreConstants.FILTERING_ALMACENES_INVENTARIOS:
      return {
        ...state,
        filter_almacenes: action.filter_almacenes,
      };
    case TypesInventario.StoreConstants.FILTERING_COMPRAITEM_PRODUCTOS:
      return {
        ...state,
        filter_compraitem: action.filter_compraitem,
      };
    case TypesInventario.StoreConstants.FILTERING_LINEAS_INVENTARIOS:
      return {
        ...state,
        filter_lineas: action.filter_lineas,
      };
    case TypesInventario.StoreConstants.FILTERING_CATEGORIAS_INVENTARIOS:
      return {
        ...state,
        filter_categorias: action.filter_categorias,
      };
    case TypesInventario.StoreConstants.FILTERING_MARCAS_INVENTARIOS:
      return {
        ...state,
        filter_marcas: action.filter_marcas,
      };
    default:
      return state;
  }
}
