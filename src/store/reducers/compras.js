import moment from "moment";
import TypesCompra from "../../types/typesCompra";

const initialState = {

  usuario_session: null,
  open_compra_xml: false,
  open_finalizar: {
    isOpen: false,
  },
  loading: true,
  filtering: false,
  grouping: false,
  filter_compras: [],
  almacenes: {},
  terceros: {},
  usuarios: {},
  filter_fechas: {
    start: moment(moment().add(0, 'month')).startOf('month').format(),
    end: moment(moment().add(0, 'month')).endOf('month').format(),
  },
  compras: [],
  devoluciones: [],
  compras_revisadas: [],
  compra_xml: null,
  filtro: TypesCompra.StoreSelectors.SHOW_ALL,
  filter_almacenes: [],
  filter_terceros: [],
};

export default function compras(state = initialState, action) {
  switch (action.type) {
    case TypesCompra.StoreConstants.QUERY_COMPRAS:
      return {
        ...state,
        compras: action.compras,
        loading: false,
      };
    case TypesCompra.StoreConstants.COMPRAS_TERCEROS:
      return {
        ...state,
        terceros: action.terceros,
      };
    case TypesCompra.StoreConstants.COMPRAS_ALMACENES:
      return {
        ...state,
        almacenes: action.almacenes,
      };
    case TypesCompra.StoreConstants.LOADING_COMPRAS:
      return {
        ...state,
        loading: action.loading,
      };
    case TypesCompra.StoreConstants.COMPRA_XML:
      return {
        ...state,
        compra_xml: action.compra_xml,
      };


      case TypesCompra.StoreConstants.OPEN_DIALOG_FINALIZAR:
        return {
          ...state,
          open_finalizar: action.open_finalizar,
        };
  




    case TypesCompra.StoreConstants.FILTRO_COMPRAS:
      return {
        ...state,
        filtro: action.filtro,
        usuario_session: action.usuario
      };


    case TypesCompra.StoreConstants.QUERY_DEVOLUCIONES:
      return {
        ...state,
        devoluciones: action.devoluciones,
        loading: false,
      };

    case TypesCompra.StoreConstants.FILTERING_COMPRAS:
      return {
        ...state,
        filtering: !state.filtering,
      };
    case TypesCompra.StoreConstants.GROUPING_COMPRAS:
      return {
        ...state,
        grouping: !state.grouping,
      };

    case TypesCompra.StoreConstants.COMPRAS_ALMACENES:
      return {
        ...state,
        almacenes: action.almacenes,
      };

    case TypesCompra.StoreConstants.COMPRAS_USUARIOS:
      return {
        ...state,
        usuarios: action.usuarios,
      };

    case TypesCompra.StoreConstants.FILTERING_TERCEROS_COMPRAS:
      return {
        ...state,
        filter_terceros: action.filter_terceros,
      };

    case TypesCompra.StoreConstants.FILTERING_ALMACENES_COMPRAS:
      return {
        ...state,
        filter_almacenes: action.filter_almacenes,
      };
    case TypesCompra.StoreConstants.FILTER_FECHA_COMPRAS:
      return {
        ...state,
        filter_fechas: {
          start: action.start,
          end: action.end,
        },
      };

    case TypesCompra.StoreConstants.FILTER_TABLE_COMPRAS:
      return {
        ...state,
        filter_compras: action.filter_compras,
      };
    default:
      return state;
  }
}
