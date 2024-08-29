import { HYDRATE } from "next-redux-wrapper";
import TypesUsuarios from "../../types/typesUsuario";

const initialState = {
  almacenesAutorizados: [],
  permisosAutorizados: [],
  usuario: null,
  modulo: null,
};

export default function usuario(state = initialState, action) {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload.usuario };
    case TypesUsuarios.StoreConstants.QUERY_USUARIO:
      return {
        ...state,
        usuario: action.usuario,
      };
    case TypesUsuarios.StoreConstants.SELECT_MODULO:
      return {
        ...state,
        modulo: action.modulo,
      };
    case TypesUsuarios.StoreConstants.ALMACENES_AUTORIZADOS:
      return {
        ...state,
        almacenesAutorizados: action.almacenesAutorizados,
      };
    case TypesUsuarios.StoreConstants.PERMISOS_AUTORIZADOS:
      return {
        ...state,
        permisosAutorizados: action.permisosAutorizados,
      };
    default:
      return state;
  }
}
