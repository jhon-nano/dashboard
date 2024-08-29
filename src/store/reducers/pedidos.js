import moment from "moment";
import TypesPedido from "../../types/typesPedido";

const initialState = {
  filtro: TypesPedido.StoreSelectors.SHOW_ALL,
  loading: false,
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
  filter_pedidos: [],
  filter_terceros: [],
  pedidos: [],

  almacenes: {},
  terceros: {},


  tipos_pedido: {},

  usuarios: {},
  almacenes_sep: {},
  tipos_pedido_sep: {},
  terceros_sep: {},
  usuarios_sep: {},
};

export default function pedidos(state = initialState, action) {
  switch (action.type) {
    case TypesPedido.StoreConstants.FILTRO_PEDIDOS:
      return {
        ...state,
        filtro: action.filtro,
      };

    case TypesPedido.StoreConstants.LOADING_PEDIDOS:
      return {
        ...state,
        loading: action.loading,
      };
    case TypesPedido.StoreConstants.QUERY_PEDIDOS:
      return {
        ...state,
        pedidos: action.pedidos
      };

    case TypesPedido.StoreConstants.OPEN_DIALOG_CAMBIO:
      return {
        ...state,
        open_cambio: action.open_cambio,
      };


    case TypesPedido.StoreConstants.PEDIDOS_ALMACENES:
      return {
        ...state,
        almacenes: action.almacenes,
      };
    case TypesPedido.StoreConstants.PEDIDOS_TERCEROS:
      return {
        ...state,
        terceros: action.terceros,
      };
    case TypesPedido.StoreConstants.PEDIDOS_TIPOS:
      return {
        ...state,
        tipos_pedido: action.tipos_pedido,
      };
    case TypesPedido.StoreConstants.PEDIDOS_USUARIOS:
      return {
        ...state,
        usuarios: action.usuarios,
      };

    case TypesPedido.StoreConstants.PEDIDOS_ALMACENES_SEP:
      return {
        ...state,
        almacenes_sep: action.almacenes,
      };
    case TypesPedido.StoreConstants.PEDIDOS_TERCEROS_SEP:
      return {
        ...state,
        terceros_sep: action.terceros,
      };
    case TypesPedido.StoreConstants.PEDIDOS_TIPOS_SEP:
      return {
        ...state,
        tipos_pedido_sep: action.tipos_pedido,
      };
    case TypesPedido.StoreConstants.PEDIDOS_USUARIOS_SEP:
      return {
        ...state,
        usuarios_sep: action.usuarios,
      };

    case TypesPedido.StoreConstants.FILTERING_PEDIDOS:
      return {
        ...state,
        filtering: !state.filtering,
      };

    case TypesPedido.StoreConstants.FILTERING_FECHA_PEDIDOS:
      return {
        ...state,
        filter_fechas: {
          start: action.start,
          end: action.end,
        },
      };
    case TypesPedido.StoreConstants.FILTERING_ALMACENES_PEDIDOS:
      return {
        ...state,
        filter_almacenes: action.filter_almacenes,
      };
    case TypesPedido.StoreConstants.FILTERING_TERCEROS_PEDIDOS:
      return {
        ...state,
        filter_terceros: action.filter_terceros,
      };

    case TypesPedido.StoreConstants.GROUPING_PEDIDOS:
      return {
        ...state,
        grouping: !state.grouping,
      };
    case TypesPedido.StoreConstants.FILTER_TABLE_PEDIDOS:
      return {
        ...state,
        filter_pedidos: action.filter_pedidos,
      };

    default:
      return state;
  }
}
