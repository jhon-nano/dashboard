import { createSelector } from "reselect";
import { Estado, TipoAjustes, TipoMovimientos } from "../../models";

import TypesCartera from "../../types/typesCartera";

const getVisibilityFilter = (state) => state.filtro;
const getTodos = (state) => state.cartera_proveedores;
const getFiltrosAlmacenes = (state) => state.filter_almacenes;
const getFiltrosTerceros = (state) => state.filter_terceros;

export const getVisibleCarteras = createSelector(
  [getVisibilityFilter,
    getTodos,
    getFiltrosAlmacenes,
    getFiltrosTerceros],
  (visibilityFilter, carteras, almacenes, terceros) => {

    if (almacenes.length > 0) {
      carteras = carteras.filter((data) =>
        almacenes.some((e) => e == data.carteraAlmacenId) // pendiente id
      );
    }
    // FILTRO TERCEROS SELECCIONADOS
    if (terceros.length > 0) {
      carteras = carteras.filter((data) =>
        terceros.some((e) => e == data.carteraTerceroId) // pendiente id
      );
    }


    switch (visibilityFilter) {
      case TypesCartera.StoreSelectors.SHOW_ALL:
        return carteras;
      case TypesCartera.StoreSelectors.SHOW_CARTERA_INACTIVOS:
        return carteras.filter(
          (t) =>
            t.estado == Estado.INACTIVO
        );
      default:
        throw new Error("Unknown filter: " + visibilityFilter);
    }
  }
);
