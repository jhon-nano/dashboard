import moment from "moment";
import TypesVentas from "../../types/typesVentas";

const initialState = {
  filtro: TypesVentas.StoreSelectors.SHOW_ALL,
  loading: true,
  open_cambio: {
    isCambioDialogOpen: false,
  },
  filtering: false,
  filter_fechas: {
    start: moment(moment().add(0, 'month')).startOf('month').format(),
    end: moment(moment().add(0, 'month')).endOf('month').format(),
  },
  filter_almacenes: [],
  grouping: false,
  filter_ventas: [],
  filter_terceros: [],
  ventas: [],
  almacenes: {},
  terceros: {},
  tipos_venta: {},
  usuarios: {},
  almacenes_sep: {},
  tipos_venta_sep: {},
  terceros_sep: {},
  usuarios_sep: {},
};

export default function ventas(state = initialState, action) {
  switch (action.type) {
    case TypesVentas.StoreConstants.FILTRO_VENTAS:
      return {
        ...state,
        filtro: action.filtro,
      };

    case TypesVentas.StoreConstants.LOADING_VENTAS:
      return {
        ...state,
        loading: action.loading,
      };
    case TypesVentas.StoreConstants.QUERY_VENTAS:
      return {
        ...state,
        ventas: action.ventas,
        loading: false,
      };

    case TypesVentas.StoreConstants.OPEN_DIALOG_CAMBIO:
      return {
        ...state,
        open_cambio: action.open_cambio,
      };


    case TypesVentas.StoreConstants.VENTAS_ALMACENES:
      return {
        ...state,
        almacenes: action.almacenes,
      };
    case TypesVentas.StoreConstants.VENTAS_TERCEROS:
      return {
        ...state,
        terceros: action.terceros,
      };
    case TypesVentas.StoreConstants.VENTAS_TIPOS:
      return {
        ...state,
        tipos_venta: action.tipos_venta,
      };
    case TypesVentas.StoreConstants.VENTAS_USUARIOS:
      return {
        ...state,
        usuarios: action.usuarios,
      };

    case TypesVentas.StoreConstants.VENTAS_ALMACENES_SEP:
      return {
        ...state,
        almacenes_sep: action.almacenes,
      };
    case TypesVentas.StoreConstants.VENTAS_TERCEROS_SEP:
      return {
        ...state,
        terceros_sep: action.terceros,
      };
    case TypesVentas.StoreConstants.VENTAS_TIPOS_SEP:
      return {
        ...state,
        tipos_venta_sep: action.tipos_venta,
      };
    case TypesVentas.StoreConstants.VENTAS_USUARIOS_SEP:
      return {
        ...state,
        usuarios_sep: action.usuarios,
      };

    case TypesVentas.StoreConstants.FILTERING_VENTAS:
      return {
        ...state,
        filtering: !state.filtering,
      };

    case TypesVentas.StoreConstants.FILTERING_FECHA_VENTAS:
      return {
        ...state,
        filter_fechas: {
          start: action.start,
          end: action.end,
        },
      };
    case TypesVentas.StoreConstants.FILTERING_ALMACENES_VENTAS:
      return {
        ...state,
        filter_almacenes: action.filter_almacenes,
      };
    case TypesVentas.StoreConstants.FILTERING_TERCEROS_VENTAS:
      return {
        ...state,
        filter_terceros: action.filter_terceros,
      };

    case TypesVentas.StoreConstants.GROUPING_VENTAS:
      return {
        ...state,
        grouping: !state.grouping,
      };
    case TypesVentas.StoreConstants.FILTER_TABLE_VENTAS:
      return {
        ...state,
        filter_ventas: action.filter_ventas,
      };
    default:
      return state;
  }
}
