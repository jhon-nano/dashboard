import { createSelector } from "reselect";
import { Estado, TipoAjustes, TipoMovimientos } from "../../models";
import TypesAjustes from '../../types/typesAjustes'

const getVisibilityFilter = (state) => state.filtro;
const getTodos = (state) => state.ajustes;
const getFiltrosAlmacenes = (state) => state.filter_almacenes;
const getFiltrosTerceros = (state) => state.filter_terceros;

export const getVisibleAjustes = createSelector(
  [getVisibilityFilter,
    getTodos,
    getFiltrosAlmacenes,
    getFiltrosTerceros],
  (visibilityFilter, ajustes, almacenes, terceros) => {

    if (almacenes.length > 0) {
      ajustes = ajustes.filter((pedido) =>
        almacenes.some((e) => e == pedido.pedidoAlmacenId)
      );
    }
    // FILTRO TERCEROS SELECCIONADOS
    if (terceros.length > 0) {
      ajustes = ajustes.filter((pedido) =>
        terceros.some((e) => e == pedido.pedidoTerceroId)
      );
    }


    switch (visibilityFilter) {
      case TypesAjustes.StoreSelectors.SHOW_ALL:
        return ajustes;
      case TypesAjustes.StoreSelectors.SHOW_ALL_TRASLADOS:
        return ajustes.filter((element) => element.tipo_movimiento == TipoMovimientos.TRASLADO);
      case TypesAjustes.StoreSelectors.SHOW_ALL_AJUSTE_INVENTARIO:
        return ajustes.filter((element) => element.tipo_movimiento == TipoMovimientos.AJUSTES_INVENTARIO);
      case TypesAjustes.StoreSelectors.SHOW_ALL_INVENTARIO_FISICO:
        return ajustes.filter((element) => element.tipo_movimiento == TipoMovimientos.INVENTARIO_FISICO);
      case TypesAjustes.StoreSelectors.SHOW_AJUSTES_INACTIVOS:
        return ajustes.filter(
          (t) =>
            t.estado == Estado.INACTIVO
        );
      default:
        throw new Error("Unknown filter: " + visibilityFilter);
    }
  }
);
