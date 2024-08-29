import { createSelector } from "reselect";
import { Estado } from "../../models";
import typesCotizacion from "../../types/typesCotizacion";

const getVisibilityFilter = (state) => state.filtro;
const getTodos = (state) => state.cotizaciones;
const getFiltrosAlmacenes = (state) => state.filter_almacenes;

export const getVisibleCotizaciones = createSelector(
  [getVisibilityFilter, getTodos, getFiltrosAlmacenes],
  (visibilityFilter, cotizaciones, almacenes) => {


    switch (visibilityFilter) {
      case typesCotizacion.StoreSelectors.SHOW_ALL_COTIZACIONES:
        return cotizaciones;
        case typesCotizacion.StoreSelectors.SHOW_COTIZACIONES_ANULADAS:
          return cotizaciones.filter(
            (t) =>
              t.estado == Estado.INACTIVO
          );
      default:
        throw new Error("Unknown filter: " + visibilityFilter);
    }
  }
);
