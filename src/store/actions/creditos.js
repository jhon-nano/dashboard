import TypesCredito from "../../types/typesCreditos";

export const loadingSolicitudCreditos = (loading) => ({
  type: TypesCredito.StoreConstants.LOADING_CREDITO,
  loading: loading
});



export const queryCredito = (credito) => {
  return {
    type: TypesCredito.StoreConstants.QUERY_CREDITO,
    credito: credito,
  };
};

export const querySolicitudCreditos = (creditos) => {
  return {
    type: TypesCredito.StoreConstants.QUERY_CREDITOS,
    creditos: creditos,
  };
};

export const filtroCreditos = (filtro) => ({
  type: TypesCredito.StoreConstants.FILTRO_CREDITOS,
  filtro: filtro,
});

export const filteringAlmacenesCreditos = (filter_almacenes) => ({
  type: TypesCredito.StoreConstants.FILTERING_ALMACENES_CREDITOS,
  filter_almacenes: filter_almacenes,
});

export const filteringFechaSolicitudCreditos = (startDate, endDate) => ({
  type: TypesCredito.StoreConstants.FILTERING_FECHA_SOLICITUD_CREDITOS,
  start: startDate,
  end: endDate,
});

export const filteringSolicitudCreditos = () => ({
  type: TypesCredito.StoreConstants.FILTERING_SOLICITUD_CREDITOS,
});

export const groupingSolicitudCreditos = () => ({
  type: TypesCredito.StoreConstants.GROUPING_SOLICITUD_CREDITOS,
});



export const filterTableSolicitudCreditos = (filter_creditos) => ({
  type: TypesCredito.StoreConstants.FILTER_TABLE_SOLICITUD_CREDITOS,
  filter_creditos: filter_creditos,
});



export const creditosAlmacenes = (almacenes) => ({
  type: TypesCredito.StoreConstants.CREDITOS_ALMACENES,
  almacenes: almacenes,
});

export const creditosTerceros = (terceros) => ({
  type: CREDITOS_TERCEROS,
  terceros: terceros,
});

export const creditosCuotas = (cuotas) => ({
  type: TypesCredito.StoreConstants.CREDITOS_CUOTAS,
  cuotas: cuotas,
});





export const filteringCuotasCreditos = (filter_cuotas) => ({
  type: FILTERING_CUOTAS_CREDITOS,
  filter_cuotas: filter_cuotas,
});

export const filteringEstadosCreditos = (filter_estados) => ({
  type: FILTERING_ESTADOS_CREDITOS,
  filter_estados: filter_estados,
});
