import moment from "moment";
import TypesCartera from "../../types/typesCartera";

const initialState = {
  filtro: TypesCartera.StoreSelectors.SHOW_ALL,
  loading: false,
  filtering: false,
  grouping: false,
  filter_fechas: {
    start: moment(moment().add(0, 'month')).startOf('month').format(),
    end: moment(moment().add(0, 'month')).endOf('month').format(),
  },
  cartera: [],
  cartera_clientes: [],
  cartera_proveedores: [],
  almacenes: {},
  terceros: {},
  filter_almacenes: [],
  filter_terceros: [],
  filter_carteras: [],
};

export default function carteras(state = initialState, action) {
  switch (action.type) {
    case TypesCartera.StoreConstants.FILTRO_CARTERA:
      return {
        ...state,
        filtro: action.filtro,
      };
    case TypesCartera.StoreConstants.LOADING_CARTERA:
      return {
        ...state,
        loading: action.loading,
      };
    case TypesCartera.StoreConstants.QUERY_CARTERA_PROVEEDORES:
      return {
        ...state,
        cartera_proveedores: action.cartera_proveedores,
        loading: false,
      };
    case TypesCartera.StoreConstants.FILTERING_FECHA_CARTERA:
      return {
        ...state,
        filter_fechas: {
          start: action.start,
          end: action.end,
        },
      };
    case TypesCartera.StoreConstants.FILTERING_CARTERA:
      return {
        ...state,
        filtering: !state.filtering,
      };
    case TypesCartera.StoreConstants.GROUPING_CARTERA:
      return {
        ...state,
        grouping: !state.grouping,
      };
    default:
      return state;
  }
}
