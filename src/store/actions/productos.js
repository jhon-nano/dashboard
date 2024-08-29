import TypesProductos from "../../types/typesProductos";


export const loadingProductos = (loading) => ({
  type: TypesProductos.StoreConstants.LOADING_PRODUCTO,
  loading: loading,
});

export const openCreateProducto = (open_producto) => ({
  type: TypesProductos.StoreConstants.OPEN_PRODUCTO,
  open_producto: open_producto,
});

export const queryProductos = (productos) => {
  return {
    type: TypesProductos.StoreConstants.QUERY_PRODUCTOS,
    productos: productos,
  };
};
export const filteringProductos = () => ({
  type: TypesProductos.StoreConstants.FILTERING_PRODUCTOS,
});
export const groupingProductos = () => ({
  type: TypesProductos.StoreConstants.GROUPING_PRODUCTOS,
});
export const filterTableProductos = (filter_productos) => ({
  type: TypesProductos.StoreConstants.FILTER_TABLE_PRODUCTOS,
  filter_productos: filter_productos,
});

export const filteringLineasProductos = (filter_lineas) => ({
  type: TypesProductos.StoreConstants.FILTERING_LINEAS_PRODUCTOS,
  filter_lineas: filter_lineas,
});

export const filteringCategoriasProductos = (filter_categorias) => ({
  type: TypesProductos.StoreConstants.FILTERING_CATEGORIAS_PRODUCTOS,
  filter_categorias: filter_categorias,
});

export const filteringMarcasProductos = (filter_marcas) => ({
  type: TypesProductos.StoreConstants.FILTERING_MARCAS_PRODUCTOS,
  filter_marcas: filter_marcas,
});

export const filteringAtributosProductos = (filter_atributos) => ({
  type: TypesProductos.StoreConstants.FILTERING_ATRIBUTOS_PRODUCTOS,
  filter_atributos: filter_atributos,
});


export const filtrarProductos = (filtro, usuario) => ({
  type: TypesProductos.StoreConstants.FILTRO_PRODUCTOS,
  filtro: filtro,
  usuario: usuario
});

export const filtroSeleccionados = (filtro_seleccionado) => ({
  type: TypesProductos.StoreConstants.FILTRO_SELECCIONADOS,
  filtro_seleccionado: filtro_seleccionado
});