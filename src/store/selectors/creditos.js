import { createSelector } from "reselect";
import { EstadoCredito } from "../../models";
import {
  SHOW_CREDITOS_ALL,
  SHOW_CREDITOS_PENDIENTES,
  SHOW_CREDITOS_REVISADOS,
} from "../reducers/creditos";
import TypesCredito from "../../types/typesCreditos";

// STATE COMPRAS
const getVisibilityFilter = (state) => state.filtro;
const getTodos = (state) => state.creditos;
const getFiltrosAlmacenes = (state) => state.filter_almacenes;
const getFiltrosCuotas = (state) => state.filter_cuotas;
const getFiltrosEstados = (state) => state.filter_estados;
// FILTRO
export const getVisibleCreditos = createSelector(
  [
    getVisibilityFilter,
    getTodos,
    getFiltrosAlmacenes,
    getFiltrosCuotas,
    getFiltrosEstados,
  ],
  (visibilityFilter, creditos, almacenes, cuotas, estados) => {
    // FILTRO ALMACENES SELECCIONADOS
    if (almacenes.length > 0) {
      creditos = creditos.filter((el) =>
        almacenes.some((e) => e == el.solicitudCreditoAlmacenId)
      );
    }
    if (cuotas.length > 0) {
      creditos = creditos.filter((el) => cuotas.some((e) => e == el.cuotas));
    }
    if (estados.length > 0) {
      creditos = creditos.filter((el) => estados.some((e) => e == el.estado));
    }
    // FILTRO BOTONES SELECCIONADOS
    switch (visibilityFilter) {
      case TypesCredito.StoreSelectors.SHOW_ALL_CREDITOS:
        return creditos;
      case TypesCredito.StoreSelectors.SHOW_CREDITOS_REVISADOS:
        return creditos.filter((e) => e.estado == EstadoCredito.REVISADO);
      case TypesCredito.StoreSelectors.SHOW_CREDITOS_PENDIENTES:
        return creditos.filter((e) => e.estado == EstadoCredito.PENDIENTE);
        case TypesCredito.StoreSelectors.SHOW_CREDITOS_ANULADAS:
          return creditos.filter((e) => e.estado == EstadoCredito.ANULADO);
  
      default:
        throw new Error("Unknown filter: " + visibilityFilter);
    }
  }
);
