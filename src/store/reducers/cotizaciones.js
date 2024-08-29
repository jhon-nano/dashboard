import moment from "moment";
import TypesCotizacion from "../../types/typesCotizacion";

const initialState = {

  loading: true,
  cotizaciones: [],


  filtering: false,
  filter_fechas: {
    start: moment(moment().add(-2, 'month')).startOf('month').format(),
    end: moment(moment().add(0, 'month')).endOf('month').format(),
  },
  filter_almacenes: [],

  grouping: false,
  filter_cotizaciones: [],
  filtro: TypesCotizacion.StoreSelectors.SHOW_ALL_COTIZACIONES,

  almacenes: {},
  tipos_pedido: {},
  terceros: {},
  usuarios: {},
  almacenes_sep: {},
  tipos_pedido_sep: {},
  terceros_sep: {},
  usuarios_sep: {},
};

export default function cotizaciones(state = initialState, action) {
  switch (action.type) {


    case TypesCotizacion.StoreConstants.LOADING_COTIZACIONES:
      return {
        ...state,
        loading: action.loading,
      };
    case TypesCotizacion.StoreConstants.QUERY_COTIZACIONES:
      return {
        ...state,
        cotizaciones: action.cotizaciones,
        loading: false,
      };
    case TypesCotizacion.StoreConstants.FILTERING_COTIZACIONES:
      return {
        ...state,
        filtering: !state.filtering,
      };
    case TypesCotizacion.StoreConstants.FILTERING_FECHA_COTIZACIONES:
      return {
        ...state,
        filter_fechas: {
          start: action.start,
          end: action.end,
        },
      };
    case TypesCotizacion.StoreConstants.FILTERING_ALMACENES_COTIZACIONES:
      return {
        ...state,
        filter_almacenes: action.filter_almacenes,
      };
    case TypesCotizacion.StoreConstants.GROUPING_COTIZACIONES:
      return {
        ...state,
        grouping: !state.grouping,
      };
    case TypesCotizacion.StoreConstants.FILTER_TABLE_COTIZACIONES:
      return {
        ...state,
        filter_cotizaciones: action.filter_cotizaciones,
      };

    default:
      return state;
  }
}
