import { createSelector } from "reselect";
import { Estado, TipoCompras } from "../../models";
import TypesCompra from "../../types/typesCompra";
import { useAuthenticator } from "@aws-amplify/ui-react";

// STATE COMPRAS
const getVisibilityFilter = (state) => state.filtro;
const getUserSession = (state) => state.usuario_session;
const getTodos = (state) => state.compras;
const getFiltrosAlmacenes = (state) => state.filter_almacenes;
const getFiltrosTerceros = (state) => state.filter_terceros;


// FILTRO
export const getVisibleCompras = createSelector(
  [
    getVisibilityFilter,
    getUserSession,
    getTodos,
    getFiltrosAlmacenes,
    getFiltrosTerceros
  ],
  (visibilityFilter, usuario, compras, almacenes, terceros) => {
    // FILTRO ALMACENES SELECCIONADOS
    if (almacenes.length > 0) {
      compras = compras.filter((compra) =>
        almacenes.some((e) => e == compra.compraAlmacenId)
      );
    }
    // FILTRO TERCEROS SELECCIONADOS
    if (terceros.length > 0) {
      compras = compras.filter((compra) =>
        terceros.some((e) => e == compra.compraTerceroId)
      );
    }

    // FILTRO BOTONES SELECCIONADOS
    switch (visibilityFilter) {
      case TypesCompra.StoreSelectors.SHOW_ALL:
        return compras;
      case TypesCompra.StoreSelectors.SHOW_COMPRAS_ALL:
        return compras.filter((e) => e.estado == Estado.ACTIVO && e.tipo_compra == TipoCompras.COMPRA);
      case TypesCompra.StoreSelectors.SHOW_DEVOLUCIONES_ALL:
        return compras.filter((e) => e.estado == Estado.ACTIVO && e.tipo_compra == TipoCompras.DEVOLUCION);
        case TypesCompra.StoreSelectors.SHOW_NOTA_PROVEEDOR_ALL:
          return compras.filter((e) => e.estado == Estado.ACTIVO && e.tipo_compra == TipoCompras.NOTA_PROVEEDOR);
      case TypesCompra.StoreSelectors.SHOW_COMPRAS_GRABAR:
        return compras.filter((e) => e.grabado !== true && e.estado == Estado.ACTIVO && e.fecha_recibido);
      case TypesCompra.StoreSelectors.SHOW_COMPRAS_PENDIENTES:
        return compras.filter((e) => e.fecha_recibido == null && e.estado == Estado.ACTIVO);
      case TypesCompra.StoreSelectors.SHOW_COMPRAS_REVISAR:
        return compras.filter((e) => e.fecha_recibido && e.estado == Estado.ACTIVO).filter((e) => {
          if (e.Revisados == null) {
            return true
          } else {
            return e.Revisados?.some((c) => c.id == usuario.id)
          }

        }
        );
      case TypesCompra.StoreSelectors.SHOW_COMPRAS_CONTA:
        return compras.filter((e) => e.contabilizado !== true && e.estado == Estado.ACTIVO && e.fecha_recibido);
      case TypesCompra.StoreSelectors.SHOW_COMPRAS_ANULADAS:
        return compras.filter((e) => e.estado == Estado.INACTIVO);
      default:
        throw new Error("Unknown filter: " + visibilityFilter);
    }
  }
);
