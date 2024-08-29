import TypesPagos from "../../types/typesPagos";


export const filtrarPagos = (filtro) => ({
  type: TypesPagos.StoreConstants.FILTRO_PAGOS,
  filtro: filtro
});

export const loadingPagos = (loading) => ({
  type: TypesPagos.StoreConstants.LOADING_PAGOS,
  loading: loading,
});

export const queryPagos = (pagos) => {
  return {
    type: TypesPagos.StoreConstants.QUERY_PAGOS,
    pagos: pagos,
  };
};

export const filterFechaPagos = (startDate, endDate) => ({
  type: TypesPagos.StoreConstants.FILTERING_FECHA_PAGOS,
  start: startDate,
  end: endDate,
});

export const filteringPagos = () => ({
  type: TypesPagos.StoreConstants.FILTERING_PAGOS,
});

export const groupingPagos = () => ({
  type: TypesPagos.StoreConstants.GROUPING_PAGOS,
});


export const pagosTerceros = (terceros) => ({
  type: TypesPagos.StoreConstants.PAGOS_TERCEROS,
  terceros: terceros,
});


export const pagosAlmacenes = (almacenes) => ({
  type: TypesPagos.StoreConstants.PAGOS_ALMACENES,
  almacenes: almacenes,
});

export const filteringTercerosPagos = (filter_terceros) => ({
  type: TypesPagos.StoreConstants.FILTERING_TERCEROS_PAGOS,
  filter_terceros: filter_terceros,
});

export const filteringAlmacenesPagos = (filter_almacenes) => ({
  type: TypesPagos.StoreConstants.FILTERING_ALMACENES_PAGOS,
  filter_almacenes: filter_almacenes,
});


export const filterTablePagos = (filter_pagos) => ({
  type: TypesPagos.StoreConstants.FILTER_TABLE_PAGOS,
  filter_pagos: filter_pagos,
});

