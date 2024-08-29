import moment from "moment";
import TypesInformes from "../../types/typesInformes";

const initialState = {
  loading: true,
  filter_fechas: {
    start: moment().add(-3, "month").startOf("month").format(),
    end: moment().endOf("month").format(),
  },
  compras: [],
  pedidos: [],
  inventarios: [],
};

export default function informes(state = initialState, action) {
  switch (action.type) {
    case TypesInformes.StoreConstants.QUERY_COMPRAS:
      return {
        ...state,
        compras: action.compras,
        loading: false,
      };
    case TypesInformes.StoreConstants.QUERY_PEDIDOS:
      return {
        ...state,
        pedidos: action.pedidos,
        loading: false,
      };
    case TypesInformes.StoreConstants.QUERY_INVENTARIOS:
      return {
        ...state,
        inventarios: action.inventarios,
        loading: false,
      };
    default:
      return state;
  }
}
