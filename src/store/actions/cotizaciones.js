import TypesCotizacion from "../../types/typesCotizacion";






export const filtrarCotizaciones = (filtro, usuario) => ({
  type: TypesCotizacion.StoreConstants.FILTRO_COTIZACIONES,
  filtro: filtro,
  usuario: usuario
});

export const clearData = () => ({
  type: types.CLEAR_DATA,
});
export const loadingCotizaciones = (loading) => ({
  type: TypesCotizacion.StoreConstants.LOADING_COTIZACION,
  loading: loading,
});
export const queryCotizaciones = (cotizaciones) => {
  return {
    type: TypesCotizacion.StoreConstants.QUERY_COTIZACIONES,
    cotizaciones: cotizaciones,
  };
  
};
export const filteringCotizaciones = () => ({
  type: TypesCotizacion.StoreConstants.FILTERING_COTIZACIONES,
});
export const filteringFechaCotizaciones = (startDate, endDate) => ({
  type: TypesCotizacion.StoreConstants.FILTERING_FECHA_COTIZACIONES,
  start: startDate,
  end: endDate,
});
export const filteringAlmacenesCotizaciones = (filter_almacenes) => ({
  type: TypesCotizacion.StoreConstants.FILTERING_ALMACENES_COTIZACIONES,
  filter_almacenes: filter_almacenes,
});
export const groupingCotizaciones = () => ({
  type: TypesCotizacion.StoreConstants.GROUPING_COTIZACIONES,
});
export const filterTableCotizaciones = (filter_cotizaciones) => ({
  type: TypesCotizacion.StoreConstants.FILTER_TABLE_COTIZACIONES,
  filter_cotizaciones: filter_cotizaciones,
});

