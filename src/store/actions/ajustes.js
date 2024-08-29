import TypesAjustes from "../../types/typesAjustes";


export const filtrarAjustes = (filtro) => ({
  type: TypesAjustes.StoreConstants.FILTRO_AJUSTES,
  filtro: filtro
});

export const loadingAjustes = (loading) => ({
  type: TypesAjustes.StoreConstants.LOADING_AJUSTES,
  loading: loading,
});

export const queryAjustes = (ajustes) => {
  return {
    type: TypesAjustes.StoreConstants.QUERY_AJUSTES,
    ajustes: ajustes,
  };
};

export const filterFechaAjustes = (startDate, endDate) => ({
  type: TypesAjustes.StoreConstants.FILTERING_FECHA_AJUSTES,
  start: startDate,
  end: endDate,
});

export const filteringAjustes = () => ({
  type: TypesAjustes.StoreConstants.FILTERING_AJUSTES,
});

export const groupingAjustes = () => ({
  type: TypesAjustes.StoreConstants.GROUPING_AJUSTES,
});


export const ajustesTerceros = (terceros) => ({
  type: TypesAjustes.StoreConstants.AJUSTES_TERCEROS,
  terceros: terceros,
});


export const ajustesAlmacenes = (almacenes) => ({
  type: TypesAjustes.StoreConstants.AJUSTES_ALMACENES,
  almacenes: almacenes,
});

export const filteringTercerosAjustes = (filter_terceros) => ({
  type: TypesAjustes.StoreConstants.FILTERING_TERCEROS_AJUSTES,
  filter_terceros: filter_terceros,
});

export const filteringAlmacenesAjustes = (filter_almacenes) => ({
  type: TypesAjustes.StoreConstants.FILTERING_ALMACENES_AJUSTES,
  filter_almacenes: filter_almacenes,
});


export const filterTableAjustes = (filter_ajustes) => ({
  type: TypesAjustes.StoreConstants.FILTER_TABLE_AJUSTES,
  filter_ajustes: filter_ajustes,
});

