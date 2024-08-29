import { createSelector } from "reselect";
import TypesTerceros from './../../types/typesTerceros'
import { Estado } from './../../models/index'

const getVisibilityFilter = (state) => state.filtro;
const getTerceros = (state) => state.terceros;


export const getVisibleTerceros = createSelector(
  [getVisibilityFilter, getTerceros],
  (visibilityFilter, terceros) => {

console.log(visibilityFilter)
    switch (visibilityFilter) {
      case TypesTerceros.StoreSelectors.SHOW_ALL_TERCEROS:
        return terceros;
      case TypesTerceros.StoreSelectors.SHOW_TERCEROS_ACTIVE:
        return terceros.filter((t) => t.estado == Estado.ACTIVO);
      case TypesTerceros.StoreSelectors.SHOW_TERCEROS_INACTIVE:
        return terceros.filter((t) => t.estado == Estado.INACTIVO);
      default:
        throw new Error("Unknown filter: " + visibilityFilter);
    }
  }
);

