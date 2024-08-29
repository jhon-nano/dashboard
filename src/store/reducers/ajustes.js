import moment from "moment";
import TypesAjustes from "../../types/typesAjustes";

const initialState = {
  filtro: TypesAjustes.StoreSelectors.SHOW_ALL,
  loading: true,
  filtering: false,
  grouping: false,
  filter_fechas: {
    start: moment().add(-2, "month").startOf("month").format(),
    end: moment().endOf("month").format(),
  },
  ajustes: [],
  almacenes: {},
  terceros: {},
  filter_almacenes: [],
  filter_terceros: [],
  filter_ajustes: [],
};

export default function ajustes(state = initialState, action) {
  switch (action.type) {
    case TypesAjustes.StoreConstants.FILTRO_AJUSTES:
      return {
        ...state,
        filtro: action.filtro,
      };
    case TypesAjustes.StoreConstants.LOADING_AJUSTES:
      return {
        ...state,
        loading: action.loading,
      };
    case TypesAjustes.StoreConstants.QUERY_AJUSTES:
      return {
        ...state,
        ajustes: action.ajustes,
        loading: false,
      };
    case TypesAjustes.StoreConstants.FILTERING_FECHA_AJUSTES:
      return {
        ...state,
        filter_fechas: {
          start: action.start,
          end: action.end,
        },
      };
    case TypesAjustes.StoreConstants.FILTERING_AJUSTES:
      return {
        ...state,
        filtering: !state.filtering,
      };
    case TypesAjustes.StoreConstants.GROUPING_AJUSTES:
      return {
        ...state,
        grouping: !state.grouping,
      };

    case TypesAjustes.StoreConstants.AJUSTES_TERCEROS:
      return {
        ...state,
        terceros: action.terceros,
      };
    case TypesAjustes.StoreConstants.AJUSTES_ALMACENES:
      return {
        ...state,
        almacenes: action.almacenes,
      };
    case TypesAjustes.StoreConstants.FILTERING_ALMACENES_AJUSTES:
      return {
        ...state,
        filter_almacenes: action.filter_almacenes,
      };
    case TypesAjustes.StoreConstants.FILTERING_TERCEROS_AJUSTES:
      return {
        ...state,
        filter_terceros: action.filter_terceros,
      };
    case TypesAjustes.StoreConstants.FILTER_TABLE_AJUSTES:
      return {
        ...state,
        filter_ajustes: action.filter_ajustes,
      };
    default:
      return state;
  }
}
