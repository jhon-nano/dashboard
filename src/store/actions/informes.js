import TypesInformes from "../../types/typesInformes";



export const queryComprasInformes = (compras) => {
  return {
    type: TypesInformes.StoreConstants.QUERY_COMPRAS,
    compras: compras,
  };
};

export const queryPedidosInformes = (pedidos) => {
  return {
    type: TypesInformes.StoreConstants.QUERY_PEDIDOS,
    pedidos: pedidos,
  };
};

export const queryInventariosInformes = (inventarios) => {
  return {
    type: TypesInformes.StoreConstants.QUERY_INVENTARIOS,
    inventarios: inventarios,
  };
};
