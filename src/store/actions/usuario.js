
import TypesUsuarios from './../../types/typesUsuario'

export const moduloAlmacenesUser = (almacenesAutorizados) => ({
  type: TypesUsuarios.StoreConstants.ALMACENES_AUTORIZADOS,
  almacenesAutorizados: almacenesAutorizados,
});

export const moduloPermisosUser = (permisosAutorizados) => ({
  type: TypesUsuarios.StoreConstants.PERMISOS_AUTORIZADOS,
  permisosAutorizados: permisosAutorizados,
});

export const selectModulo = (modulo) => ({
  type: TypesUsuarios.StoreConstants.SELECT_MODULO,
  modulo: modulo,
});


export const queryUsuario = (usuario) => {
  return {
    type: TypesUsuarios.StoreConstants.QUERY_USUARIO,
    usuario: usuario
  };
};
