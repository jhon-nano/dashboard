import { createSelector } from "reselect";
import { Estado } from "../../models";

import TypesPagos from "../../types/typesPagos";

const getVisibilityFilter = (state) => state.filtro;
const getTodos = (state) => state.pagos;
const getFiltrosAlmacenes = (state) => state.filter_almacenes;
const getFiltrosTerceros = (state) => state.filter_terceros;

export const getVisiblePagos = createSelector(
  [getVisibilityFilter,
    getTodos,
    getFiltrosAlmacenes,
    getFiltrosTerceros],
  (visibilityFilter, pagos, almacenes, terceros) => {

    if (almacenes.length > 0) {
      pagos = pagos.filter((data) =>
        almacenes.some((e) => e == data.carteraAlmacenId) // pendiente id
      );
    }
    // FILTRO TERCEROS SELECCIONADOS
    if (terceros.length > 0) {
      pagos = pagos.filter((data) =>
        terceros.some((e) => e == data.carteraTerceroId) // pendiente id
      );
    }


    switch (visibilityFilter) {
      case TypesPagos.StoreSelectors.SHOW_ALL:
        return pagos;
      case TypesPagos.StoreSelectors.SHOW_CARTERA_INACTIVOS:
        return pagos.filter(
          (t) =>
            t.estado == Estado.INACTIVO
        );
      default:
        throw new Error("Unknown filter: " + visibilityFilter);
    }
  }
);
