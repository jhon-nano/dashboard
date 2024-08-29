import TypesTerceros from "../../types/typesTerceros";

export const loadingTercero = (loading) => ({
  type: TypesTerceros.StoreConstants.LOADING_TERCERO,
  loading: loading
});

export const openTercero = (open_tercero) => ({
  type: TypesTerceros.StoreConstants.OPEN_TERCERO,
  open_tercero: open_tercero
});

export const queryTerceros = (terceros) => {
  return {
    type: TypesTerceros.StoreConstants.QUERY_TERCEROS,
    terceros: terceros,
  };
};

export const filteringTerceros = () => ({
  type: TypesTerceros.StoreConstants.FILTERING_TERCEROS,
});

export const groupingTerceros = () => ({
  type: TypesTerceros.StoreConstants.GROUPING_TERCEROS,
});
export const filterTableTerceros = (filter_terceros) => ({
  type: TypesTerceros.StoreConstants.FILTER_TABLE_TERCEROS,
  filter_terceros: filter_terceros,
});

export const filtrosTerceros = (filtro) => ({
  type: TypesTerceros.StoreConstants.FILTRO_TERCEROS,
  filtro: filtro,
});



export const setVisibilityFilterActivos = (filter) => ({
  type: TypesTerceros.StoreSelectors.SHOW_TERCEROS_ACTIVE,
  filter,
});


export const setVisibilityFilterInactivos = (filter) => ({
  type: TypesTerceros.StoreSelectors.SHOW_TERCEROS_INACTIVE,
  filter,
});
