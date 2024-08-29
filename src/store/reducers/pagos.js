import moment from "moment";
import TypesPagos from "../../types/typesPagos";

const initialState = {
  filtro: TypesPagos.StoreSelectors.SHOW_ALL,
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

export default function pagos(state = initialState, action) {
  switch (action.type) {
    case TypesPagos.StoreConstants.FILTRO_PAGOS:
      return {
        ...state,
        filtro: action.filtro,
      };
    case TypesPagos.StoreConstants.LOADING_PAGOS:
      return {
        ...state,
        loading: action.loading,
      };
    case TypesPagos.StoreConstants.QUERY_PAGOS:
      return {
        ...state,
        pagos: action.pagos,
        loading: false,
      };
    case TypesPagos.StoreConstants.FILTERING_FECHA_PAGOS:
      return {
        ...state,
        filter_fechas: {
          start: action.start,
          end: action.end,
        },
      };
    case TypesPagos.StoreConstants.FILTERING_PAGOS:
      return {
        ...state,
        filtering: !state.filtering,
      };
    case TypesPagos.StoreConstants.GROUPING_PAGOS:
      return {
        ...state,
        grouping: !state.grouping,
      };
    default:
      return state;
  }
}
