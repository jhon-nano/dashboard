import TypesPedido from "../../types/typesPedido";






export const filtrarPedidos = (filtro, usuario) => ({
  type: TypesPedido.StoreConstants.FILTRO_PEDIDOS,
  filtro: filtro,
  usuario: usuario
});

export const clearData = () => ({
  type: types.CLEAR_DATA,
});
export const loadingPedidos = (loading) => ({
  type: TypesPedido.StoreConstants.LOADING_PEDIDO,
  loading: loading,
});
export const queryPedidos = (pedidos) => {
  return {
    type: TypesPedido.StoreConstants.QUERY_PEDIDOS,
    pedidos: pedidos,
  };
};

export const filteringTercerosPedidos = (filter_terceros) => ({
  type: TypesPedido.StoreConstants.FILTERING_TERCEROS_PEDIDOS,
  filter_terceros: filter_terceros,
});

export const pedidosTerceros = (terceros) => ({
  type: TypesPedido.StoreConstants.PEDIDOS_TERCEROS,
  terceros: terceros,
});


export const pedidosAlmacenes = (almacenes) => ({
  type: TypesPedido.StoreConstants.PEDIDOS_ALMACENES,
  almacenes: almacenes,
});


export const filteringPedidos = () => ({
  type: types.FILTERING_PEDIDOS,
});
export const filterFechaPedidos = (startDate, endDate) => ({
  type: TypesPedido.StoreConstants.FILTERING_FECHA_PEDIDOS,
  start: startDate,
  end: endDate,
});
export const filteringAlmacenesPedidos = (filter_almacenes) => ({
  type: TypesPedido.StoreConstants.FILTERING_ALMACENES_PEDIDOS,
  filter_almacenes: filter_almacenes,
});
export const groupingPedidos = () => ({
  type: TypesPedido.StoreConstants.GROUPING_PEDIDOS,
});
export const filterTablePedidos = (filter_pedidos) => ({
  type: TypesPedido.StoreConstants.FILTER_TABLE_PEDIDOS,
  filter_pedidos: filter_pedidos,
});

export const openCambioPedido = (open_cambio) => ({
  type: TypesPedido.StoreConstants.OPEN_DIALOG_CAMBIO,
  open_cambio: open_cambio,
});


export const pedidosTipos = (tipos_pedido) => ({
  type: types.PEDIDOS_TIPOS,
  tipos_pedido: tipos_pedido,
});



export const pedidoUsuarios = (usuarios) => ({
  type: types.PEDIDOS_USUARIOS,
  usuarios: usuarios,
});

export const pedidosAlmacenesSep = (almacenes) => ({
  type: types.PEDIDOS_ALMACENES_SEP,
  almacenes: almacenes,
});

export const pedidosTiposSep = (tipos_pedido) => ({
  type: types.PEDIDOS_TIPOS_SEP,
  tipos_pedido: tipos_pedido,
});

export const pedidosTercerosSep = (terceros) => ({
  type: types.PEDIDOS_TERCEROS_SEP,
  terceros: terceros,
});

export const pedidoUsuariosSep = (usuarios) => ({
  type: types.PEDIDOS_USUARIOS_SEP,
  usuarios: usuarios,
});
