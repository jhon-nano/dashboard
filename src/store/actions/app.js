import typesModulos from './../../types/typesModulos'
import TypesConfiguracion from './../../types/typesConfiguracion'


export const loadingPagina = (message) => {
  return {
    type: typesModulos.StoreConstants.LOADING_PAGINA,
    loading_pag_message: message,
  };
};
export const stopLoadingPagina = () => ({
  type: typesModulos.StoreConstants.STOP_LOADING_PAGINA,
});

export const networkStatus = (online) => {
  return {
    type: typesModulos.StoreConstants.NETWORK_STATUS,
    online: online,
  };
};




export const outboxStatus = (status) => {
  return {
    type: typesModulos.StoreConstants.OUT_BOX_STATUS,
    status: status,
  };
};


export const openFiltroData = (open_filtro) => ({
  type: TypesConfiguracion.StoreConstants.OPEN_FILTRO,
  open_filtro: open_filtro,

});
