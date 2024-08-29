import TypesInventarios from "../../types/typesInventarios";


export const filtroInventarios = (filtro) => ({
  type: TypesInventarios.StoreConstants.FILTRO_INVENTARIOS,
  filtro: filtro,
});

export const loadingInventarios = () => ({
  type: TypesInventarios.StoreConstants.LOADING_INVENTARIOS,
});
export const queryInventarios = (inventarios) => {
  return {
    type: TypesInventarios.StoreConstants.QUERY_INVENTARIOS,
    inventarios: inventarios,
  };
};
export const openAjusteRapido = (open_ajuste) => {
  return {
    type: TypesInventarios.StoreConstants.OPEN_AJUSTE,
    open_ajuste: open_ajuste,
  };
};
export const openUpdatePrecio = (open_precio) => {
  return {
    type: TypesInventarios.StoreConstants.OPEN_UPDATE_PRECIO,
    open_precio: open_precio,
  };
};
export const openUpdateUbicacion = (open_ubicacion) => {
  return {
    type: TypesInventarios.StoreConstants.OPEN_UPDATE_UBICACION,
    open_ubicacion: open_ubicacion,
  };
};
export const filteringInventarios = () => ({
  type: TypesInventarios.StoreConstants.FILTERING_INVENTARIOS,
});

export const groupingInventarios = () => ({
  type: TypesInventarios.StoreConstants.GROUPING_INVENTARIOS,
});
export const filterTableInventarios = (filter_inventarios) => ({
  type: types.FILTER_TABLE_INVENTARIOS,
  filter_inventarios: filter_inventarios,
});
export const addInventario = (inventario) => ({ type: types.ADD_INVENTARIO, inventario });
export const deleteInventario = (id) => ({ type: types.DELETE_INVENTARIO, id });
export const editInventario = (inventario) => ({
  type: types.EDIT_INVENTARIO,
  inventario,
});


export const filteringAlmacenesInventarios = (filter_almacenes) => ({
  type: TypesInventarios.StoreConstants.FILTERING_ALMACENES_INVENTARIOS,
  filter_almacenes: filter_almacenes,
});

export const filteringCompraItemProductos = (filter_compraitem) => ({
  type: TypesInventarios.StoreConstants.FILTERING_COMPRAITEM_PRODUCTOS,
  filter_compraitem: filter_compraitem,
});



export const filteringLineasInventarios = (filter_lineas) => ({
  type: TypesInventarios.StoreConstants.FILTERING_LINEAS_INVENTARIOS,
  filter_lineas: filter_lineas,
});

export const filteringCategoriasInventarios = (filter_categorias) => ({
  type: TypesInventarios.StoreConstants.FILTERING_CATEGORIAS_INVENTARIOS,
  filter_categorias: filter_categorias,
});

export const filteringMarcasInventarios = (filter_marcas) => ({
  type: TypesInventarios.StoreConstants.FILTERING_MARCAS_INVENTARIOS,
  filter_marcas: filter_marcas,
});
