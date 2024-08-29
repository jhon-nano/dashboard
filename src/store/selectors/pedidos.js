import { createSelector } from "reselect";
import { Estado, TipoPedidos } from "../../models";
import TypesPedido from "../../types/typesPedido";

const getVisibilityFilter = (state) => state.filtro;
const getTodos = (state) => state.pedidos;
const getFiltrosAlmacenes = (state) => state.filter_almacenes;
const getFiltrosTerceros = (state) => state.filter_terceros;

export const getVisiblePedidos = createSelector(
  [getVisibilityFilter,
    getTodos,
    getFiltrosAlmacenes,
    getFiltrosTerceros],
  (visibilityFilter, pedidos, almacenes, terceros) => {

    if (almacenes.length > 0) {
      pedidos = pedidos.filter((pedido) =>
        almacenes.some((e) => e == pedido.pedidoAlmacenId)
      );
    }
    // FILTRO TERCEROS SELECCIONADOS
    if (terceros.length > 0) {
      pedidos = pedidos.filter((pedido) =>
        terceros.some((e) => e == pedido.pedidoTerceroId)
      );
    }


    switch (visibilityFilter) {
      case TypesPedido.StoreSelectors.SHOW_ALL:
        return pedidos;
      case TypesPedido.StoreSelectors.SHOW_ALL_PEDIDOS:
        return pedidos.filter(
          (t) => t.tipo_pedido == TipoPedidos.PEDIDO 
        );
      case TypesPedido.StoreSelectors.SHOW_ALL_SEPARADOS:
        return pedidos.filter(
          (t) => t.tipo_pedido == TipoPedidos.SEPARADO && t.estado == Estado.ACTIVO
        );
      case TypesPedido.StoreSelectors.SHOW_PEDIDOS_ENTREGAR:
        return pedidos.filter(
          (t) =>
            t.tipo_pedido == TipoPedidos.PEDIDO && !t.estado_entrega && t.estado == Estado.ACTIVO
        );
      case TypesPedido.StoreSelectors.SHOW_PEDIDOS_FACTURAR:
        return pedidos.filter(
          (t) =>
            t.tipo_pedido == TipoPedidos.PEDIDO && !t.estado_factura && t.estado == Estado.ACTIVO
        );
      case TypesPedido.StoreSelectors.SHOW_PEDIDOS_ANULADAS:
        return pedidos.filter(
          (t) =>
            t.estado == Estado.INACTIVO
        );
      default:
        throw new Error("Unknown filter: " + visibilityFilter);
    }
  }
);
