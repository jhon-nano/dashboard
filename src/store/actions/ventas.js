import TypesVentas from "../../types/typesVentas";






export const filtrarVentas = (filtro, usuario) => ({
  type: TypesVentas.StoreConstants.FILTRO_VENTAS,
  filtro: filtro,
  usuario: usuario
});


export const loadingVentas = (loading) => ({
  type: TypesVentas.StoreConstants.LOADING_VENTA,
  loading: loading,
});
export const queryVentas = (ventas) => {
  return {
    type: TypesVentas.StoreConstants.QUERY_VENTAS,
    ventas: ventas,
  };
};

export const filteringTercerosVentas = (filter_terceros) => ({
  type: TypesVentas.StoreConstants.FILTERING_TERCEROS_VENTAS,
  filter_terceros: filter_terceros,
});

export const ventasTerceros = (terceros) => ({
  type: TypesVentas.StoreConstants.VENTAS_TERCEROS,
  terceros: terceros,
});


export const ventasAlmacenes = (almacenes) => ({
  type: TypesVentas.StoreConstants.VENTAS_ALMACENES,
  almacenes: almacenes,
});


export const filteringVentas = () => ({
  type: types.FILTERING_VENTAS,
});
export const filterFechaVentas = (startDate, endDate) => ({
  type: TypesVentas.StoreConstants.FILTERING_FECHA_VENTAS,
  start: startDate,
  end: endDate,
});
export const filteringAlmacenesVentas = (filter_almacenes) => ({
  type: TypesVentas.StoreConstants.FILTERING_ALMACENES_VENTAS,
  filter_almacenes: filter_almacenes,
});
export const groupingVentas = () => ({
  type: TypesVentas.StoreConstants.GROUPING_VENTAS,
});
export const filterTableVentas = (filter_ventas) => ({
  type: TypesVentas.StoreConstants.FILTER_TABLE_VENTAS,
  filter_ventas: filter_ventas,
});

export const openCambioVenta = (open_cambio) => ({
  type: TypesVentas.StoreConstants.OPEN_DIALOG_CAMBIO,
  open_cambio: open_cambio,
});


