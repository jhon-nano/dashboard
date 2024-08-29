import TypesCompra from "../../types/typesCompra";



export const queryCompras = (compras) => {
  return {
    type: TypesCompra.StoreConstants.QUERY_COMPRAS,
    compras: compras,
  };
};

export const comprasTerceros = (terceros) => ({
  type: TypesCompra.StoreConstants.COMPRAS_TERCEROS,
  terceros: terceros,
});

export const comprasAlmacenes = (almacenes) => ({
  type: TypesCompra.StoreConstants.COMPRAS_ALMACENES,
  almacenes: almacenes,
});

export const loadingCompras = (loading) => ({
  type: TypesCompra.StoreConstants.LOADING_COMPRA,
  loading: loading,

});

export const openFinalizarCompra = (open_finalizar) => ({
  type: TypesCompra.StoreConstants.OPEN_DIALOG_FINALIZAR,
  open_finalizar: open_finalizar,
});



export const filtrarCompras = (filtro, usuario) => ({
  type: TypesCompra.StoreConstants.FILTRO_COMPRAS,
  filtro: filtro,
  usuario: usuario
});

export const compraXML = (compra_xml) => ({
  type: TypesCompra.StoreConstants.COMPRA_XML,
  compra_xml: compra_xml,
});


export const filterFechaCompras = (start, end) => ({
  type: TypesCompra.StoreConstants.FILTER_FECHA_COMPRAS,
  start: start,
  end: end,
});

export const filteringCompras = () => ({
  type: TypesCompra.StoreConstants.FILTERING_COMPRAS,
});

export const groupingCompras = () => ({
  type: TypesCompra.StoreConstants.GROUPING_COMPRAS,
});


//------------------------------------------------------------------------------------------


export const filterTableCompras = (filter_compras) => ({
  type: types.FILTER_TABLE_COMPRAS,
  filter_compras: filter_compras,
});






export const comprasUsuarios = (usuarios) => ({
  type: types.COMPRAS_USUARIOS,
  usuarios: usuarios,
});





export const filteringAlmacenesCompras = (filter_almacenes) => ({
  type: TypesCompra.StoreConstants.FILTERING_ALMACENES_COMPRAS,
  filter_almacenes: filter_almacenes,
});

export const filteringTercerosCompras = (filter_terceros) => ({
  type: TypesCompra.StoreConstants.FILTERING_TERCEROS_COMPRAS,
  filter_terceros: filter_terceros,
});
