import { createSelector } from "reselect";
import { Estado } from "../../models";
import TypesInventarios from "../../types/typesInventarios";

const getVisibilityFilter = (state) => state.filtro;
const getTodos = (state) => state.inventarios;
const getFiltrosAlmacenes = (state) => state.filter_almacenes;
const getFiltrosCompraItem = (state) => state.filter_compraitem;
const getFiltrosLineas = (state) => state.filter_lineas;
const getFiltrosCategorias = (state) => state.filter_categorias;
const getFiltrosMarcas = (state) => state.filter_marcas;

export const getVisibleInventarios = createSelector(
  [
    getVisibilityFilter,
    getTodos,
    getFiltrosAlmacenes,
    getFiltrosCompraItem,
    getFiltrosLineas,
    getFiltrosCategorias,
    getFiltrosMarcas,
  ],
  (visibilityFilter, data, almacenes, compras_item, lineas, categorias, marcas) => {

    if (almacenes?.length > 0) {
      data = data.filter((inventario) =>
        almacenes.some((e) => e == inventario.inventarioAlmacenId)
      );
    }
    // //console.log(lineas);
    if (lineas?.length > 0) {
      data = data.filter((inventario) =>
        lineas.some((e) => e == inventario.Producto.productoLineaId)
      );
    }
    if (categorias?.length > 0) {
      data = data.filter((inventario) =>
        categorias.some((e) => e == inventario.Producto.productoCategoriaId)
      );
    }
    if (marcas?.length > 0) {
      data = data.filter((inventario) =>
        marcas.some((e) => e == inventario.Producto.productoMarcaId)
      );
    }
    switch (visibilityFilter) {
      case TypesInventarios.StoreSelectors.SHOW_ALL:
        return data.filter(e => e.estado == Estado.ACTIVO);
      case TypesInventarios.StoreSelectors.SHOW_INVENTARIOS_ALL:
        return data.filter(e => e.estado == Estado.ACTIVO);
      case TypesInventarios.StoreSelectors.SHOW_INVENTARIOS_DISPONIBLE:
        return data.filter(e => (e.inventario > 0 || e.separado > 0) && e.estado == Estado.ACTIVO);
      case TypesInventarios.StoreSelectors.SHOW_INVENTARIOS_DISPONIBLE_UBICACION:
        return data.filter(e => (e.inventario > 0 || e.separado > 0) && e.estado == Estado.ACTIVO);
      case TypesInventarios.StoreSelectors.SHOW_INVENTARIOS_SEPARADO:
        return data.filter(e => e.separado !== 0 && e.estado == Estado.ACTIVO);
      case TypesInventarios.StoreSelectors.SHOW_INVENTARIOS_SIN_SALDO:
        return data.filter(e => e.inventario == 0 && e.estado == Estado.ACTIVO);
      case TypesInventarios.StoreSelectors.SHOW_INVENTARIOS_NEGATIVOS:
        return data.filter(e => e.inventario < 0 && e.estado == Estado.ACTIVO);
      case TypesInventarios.StoreSelectors.SHOW_INVENTARIOS_PROVEEDOR:
        return data.filter(inventario => compras_item.some((e) =>e.compraItemProductoId === inventario.inventarioProductoId) && inventario.estado == Estado.ACTIVO);
      case TypesInventarios.StoreSelectors.SHOW_INVENTARIOS_UBICACION:
        return data.filter(e => e.estado == Estado.ACTIVO);
      case TypesInventarios.StoreSelectors.SHOW_INVENTARIOS_INACTIVOS:
        return data.filter(e => e.estado == Estado.INACTIVO);

      default:
        throw new Error("Unknown filter: " + visibilityFilter);
    }
  }
);
