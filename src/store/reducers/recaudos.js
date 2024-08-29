import moment from "moment";
import TypesAjustes from "../../types/typesAjustes";

const initialState = {
  filtro: TypesAjustes.StoreSelectors.SHOW_ALL,
  loading: true,
  filtering: false,
  grouping: false,
  filter_fechas: {
    start: moment(moment().add(0, 'month')).startOf('month').format(),
    end: moment(moment().add(0, 'month')).endOf('month').format(),
  },
  recaudo: [],

};

export default function recaudos(state = initialState, action) {
  switch (action.type) {
    case TypesAjustes.StoreConstants.FILTRO_RECAUDO:
      return {
        ...state,
        filtro: action.filtro,
      };
    case TypesAjustes.StoreConstants.LOADING_RECAUDO:
      return {
        ...state,
        loading: action.loading,
      };
    case TypesAjustes.StoreConstants.QUERY_RECAUDO:
      return {
        ...state,
        recaudo: action.recaudo,
        loading: false,
      };
    case TypesAjustes.StoreConstants.FILTERING_FECHA_RECAUDO:
      return {
        ...state,
        filter_fechas: {
          start: action.start,
          end: action.end,
        },
      };
    case TypesAjustes.StoreConstants.FILTERING_RECAUDO:
      return {
        ...state,
        filtering: !state.filtering,
      };
    case TypesAjustes.StoreConstants.GROUPING_RECAUDO:
      return {
        ...state,
        grouping: !state.grouping,
      };
    default:
      return state;
  }
}
