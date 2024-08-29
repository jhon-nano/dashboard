import { createSelector } from "reselect";
import { Estado, TipoPedidos } from "../../models";
import TypesVentas from "../../types/typesVentas";

const getVisibilityFilter = (state) => state.filtro;
const getTodos = (state) => state.ventas;
const getFiltrosAlmacenes = (state) => state.filter_almacenes;
const getFiltrosTerceros = (state) => state.filter_terceros;

export const getVisibleVentas = createSelector(
  [getVisibilityFilter,
    getTodos,
    getFiltrosAlmacenes,
    getFiltrosTerceros],
  (visibilityFilter, ventas, almacenes, terceros) => {

    if (almacenes.length > 0) {
      ventas = ventas.filter((venta) =>
        almacenes.some((e) => e == venta.ventaAlmacenId)
      );
    }
    // FILTRO TERCEROS SELECCIONADOS
    if (terceros.length > 0) {
      ventas = ventas.filter((venta) =>
        terceros.some((e) => e == venta.ventaTerceroId)
      );
    }


    switch (visibilityFilter) {
      case TypesVentas.StoreSelectors.SHOW_ALL:
        return ventas;
      case TypesVentas.StoreSelectors.SHOW_ALL_VENTAS:
        return ventas.filter(
          (t) => t.tipo_venta == TipoPedidos.VENTA 
        );
      case TypesVentas.StoreSelectors.SHOW_ALL_SEPARADOS:
        return ventas.filter(
          (t) => t.tipo_venta == TipoPedidos.SEPARADO && t.estado == Estado.ACTIVO
        );
      case TypesVentas.StoreSelectors.SHOW_VENTAS_ENTREGAR:
        return ventas.filter(
          (t) =>
            t.tipo_venta == TipoPedidos.VENTA && !t.estado_entrega && t.estado == Estado.ACTIVO
        );
      case TypesVentas.StoreSelectors.SHOW_VENTAS_FACTURAR:
        return ventas.filter(
          (t) =>
            t.tipo_venta == TipoPedidos.VENTA && !t.estado_factura && t.estado == Estado.ACTIVO
        );
      case TypesVentas.StoreSelectors.SHOW_VENTAS_ANULADAS:
        return ventas.filter(
          (t) =>
            t.estado == Estado.INACTIVO
        );
      default:
        throw new Error("Unknown filter: " + visibilityFilter);
    }
  }
);
