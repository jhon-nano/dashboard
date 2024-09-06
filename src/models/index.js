// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const FormasPago = {
  "ANTICIPO": "ANTICIPO",
  "ABONO": "ABONO",
  "CANCELACION": "CANCELACION"
};

const EstadoTicket = {
  "PENDIENTE": "PENDIENTE",
  "CANCELADO": "CANCELADO"
};

const TipoTerceros = {
  "CC": "CC",
  "NIT": "NIT",
  "TI": "TI",
  "PASAPORTE": "PASAPORTE",
  "CE": "CE"
};

const TipoPago = {
  "CONTADO": "CONTADO",
  "CREDITO": "CREDITO"
};

const TipoCompras = {
  "COMPRA": "COMPRA",
  "DEVOLUCION": "DEVOLUCION",
  "NOTA_PROVEEDOR": "NOTA_PROVEEDOR"
};

const TipoReciboCaja = {
  "ANTICIPO": "ANTICIPO",
  "RECAUDO": "RECAUDO"
};

const TipoComprobanteEgreso = {
  "ANTICIPO": "ANTICIPO",
  "PAGO": "PAGO",
  "NOTA_CREDITO": "NOTA_CREDITO"
};

const TipoCarteraClientes = {
  "ANTICIPO": "ANTICIPO",
  "CXC": "CXC",
  "NOTA_DEBITO": "NOTA_DEBITO"
};

const TipoCarteraProveedores = {
  "ANTICIPO": "ANTICIPO",
  "CXP": "CXP"
};

const TipoPedidos = {
  "PEDIDO": "PEDIDO",
  "SEPARADO": "SEPARADO"
};

const TipoFacturas = {
  "FACTURA": "FACTURA",
  "FACTURA_POS": "FACTURA_POS",
  "FACTURA_ELECTRONICA": "FACTURA_ELECTRONICA"
};

const TipoMovimientos = {
  "TRASLADO": "TRASLADO",
  "INVENTARIO_FISICO": "INVENTARIO_FISICO",
  "AJUSTES_INVENTARIO": "AJUSTES_INVENTARIO"
};

const EstadoFactura = {
  "FACTURADO": "FACTURADO",
  "PENDIENTE": "PENDIENTE",
  "ANULADO": "ANULADO"
};

const EstadoCredito = {
  "PENDIENTE": "PENDIENTE",
  "REVISADO": "REVISADO",
  "AUTORIZADO": "AUTORIZADO",
  "RECHAZADO": "RECHAZADO",
  "ANULADO": "ANULADO"
};

const Estado = {
  "ACTIVO": "ACTIVO",
  "INACTIVO": "INACTIVO"
};

const { ModuloUserAlmacenes, ModuloUserPermiso, Consecutivo, Almacen, Usuario, Producto, Marca, Categoria, Linea, Inventario, Ticket, TicketItem, DatosSolicitud, TaxCode, Direccion, Contact, ProductoProveedor, Auditoria, ModuloNew, CategoriaAtributoNew, AuditoriaInventario, CotizacionItem, UbicacionInventario, CajaRegistradora } = initSchema(schema);

export {
  ModuloUserAlmacenes,
  ModuloUserPermiso,
  Consecutivo,
  Almacen,
  Usuario,
  Producto,
  Marca,
  Categoria,
  Linea,
  Inventario,
  Ticket,
  TicketItem,
  FormasPago,
  EstadoTicket,
  TipoTerceros,
  TipoPago,
  TipoCompras,
  TipoReciboCaja,
  TipoComprobanteEgreso,
  TipoCarteraClientes,
  TipoCarteraProveedores,
  TipoPedidos,
  TipoFacturas,
  TipoMovimientos,
  EstadoFactura,
  EstadoCredito,
  Estado,
  DatosSolicitud,
  TaxCode,
  Direccion,
  Contact,
  ProductoProveedor,
  Auditoria,
  ModuloNew,
  CategoriaAtributoNew,
  AuditoriaInventario,
  CotizacionItem,
  UbicacionInventario,
  CajaRegistradora
};