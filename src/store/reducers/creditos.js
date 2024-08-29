import moment from "moment";
import TypesCredito from "../../types/typesCreditos";

const initialState = {
  filtro: TypesCredito.StoreSelectors.SHOW_ALL_CREDITOS,
  loading: true,
  filtering: false,
  grouping: false,

  filter_creditos: [],
  almacenes: {},
  terceros: {},
  cuotas: {},
  estados: {},
  credito: null,
  creditos: [],
  filter_fechas: {
    start: moment(moment().add(0, 'month')).startOf('month').format(),
    end: moment(moment().add(0, 'month')).endOf('month').format(),
  },
  filter_almacenes: [],
  filter_cuotas: [],
  filter_estados: [],
};

export default function creditos(state = initialState, action) {
  switch (action.type) {

    case TypesCredito.StoreConstants.LOADING_SOLICITUD_CREDITOS:
      return {
        ...state,
        loading: action.loading,
      };

    case TypesCredito.StoreConstants.FILTRO_CREDITOS:
      return {
        ...state,
        filtro: action.filtro,
      };
    case TypesCredito.StoreConstants.QUERY_CREDITO:
      return {
        ...state,
        credito: action.credito,
        loading: false,
      };
    case TypesCredito.StoreConstants.QUERY_CREDITOS:
      return {
        ...state,
        creditos: action.creditos,
        loading: false,
      };
    case TypesCredito.StoreConstants.FILTERING_SOLICITUD_CREDITOS:
      return {
        ...state,
        filtering: !state.filtering,
      };
    case TypesCredito.StoreConstants.GROUPING_SOLICITUD_CREDITOS:
      return {
        ...state,
        grouping: !state.grouping,
      };
    case TypesCredito.StoreConstants.FILTERING_FECHA_SOLICITUD_CREDITOS:
      return {
        ...state,
        filter_fechas: {
          start: action.start,
          end: action.end,
        },
      };
    case TypesCredito.StoreConstants.CREDITOS_ALMACENES:
      return {
        ...state,
        almacenes: action.almacenes,
      };

    case TypesCredito.StoreConstants.CREDITOS_TERCEROS:
      return {
        ...state,
        terceros: action.terceros,
      };
    case TypesCredito.StoreConstants.CREDITOS_CUOTAS:
      return {
        ...state,
        cuotas: action.cuotas,
      };
    case TypesCredito.StoreConstants.FILTERING_ALMACENES_CREDITOS:
      return {
        ...state,
        filter_almacenes: action.filter_almacenes,
      };
    case TypesCredito.StoreConstants.FILTERING_CUOTAS_CREDITOS:
      return {
        ...state,
        filter_cuotas: action.filter_cuotas,
      };

    case TypesCredito.StoreConstants.FILTERING_ESTADOS_CREDITOS:
      return {
        ...state,
        filter_estados: action.filter_estados,
      };

    case TypesCredito.StoreConstants.FILTER_TABLE_SOLICITUD_CREDITOS:
      return {
        ...state,
        filter_creditos: action.filter_creditos,
      };
    default:
      return state;
  }
}
