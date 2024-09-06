import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncItem } from "@aws-amplify/datastore";

export enum FormasPago {
  ANTICIPO = "ANTICIPO",
  ABONO = "ABONO",
  CANCELACION = "CANCELACION"
}

export enum EstadoTicket {
  PENDIENTE = "PENDIENTE",
  CANCELADO = "CANCELADO"
}

export enum TipoTerceros {
  CC = "CC",
  NIT = "NIT",
  TI = "TI",
  PASAPORTE = "PASAPORTE",
  CE = "CE"
}

export enum TipoPago {
  CONTADO = "CONTADO",
  CREDITO = "CREDITO"
}

export enum TipoCompras {
  COMPRA = "COMPRA",
  DEVOLUCION = "DEVOLUCION",
  NOTA_PROVEEDOR = "NOTA_PROVEEDOR"
}

export enum TipoReciboCaja {
  ANTICIPO = "ANTICIPO",
  RECAUDO = "RECAUDO"
}

export enum TipoComprobanteEgreso {
  ANTICIPO = "ANTICIPO",
  PAGO = "PAGO",
  NOTA_CREDITO = "NOTA_CREDITO"
}

export enum TipoCarteraClientes {
  ANTICIPO = "ANTICIPO",
  CXC = "CXC",
  NOTA_DEBITO = "NOTA_DEBITO"
}

export enum TipoCarteraProveedores {
  ANTICIPO = "ANTICIPO",
  CXP = "CXP"
}

export enum TipoPedidos {
  PEDIDO = "PEDIDO",
  SEPARADO = "SEPARADO"
}

export enum TipoFacturas {
  FACTURA = "FACTURA",
  FACTURA_POS = "FACTURA_POS",
  FACTURA_ELECTRONICA = "FACTURA_ELECTRONICA"
}

export enum TipoMovimientos {
  TRASLADO = "TRASLADO",
  INVENTARIO_FISICO = "INVENTARIO_FISICO",
  AJUSTES_INVENTARIO = "AJUSTES_INVENTARIO"
}

export enum EstadoFactura {
  FACTURADO = "FACTURADO",
  PENDIENTE = "PENDIENTE",
  ANULADO = "ANULADO"
}

export enum EstadoCredito {
  PENDIENTE = "PENDIENTE",
  REVISADO = "REVISADO",
  AUTORIZADO = "AUTORIZADO",
  RECHAZADO = "RECHAZADO",
  ANULADO = "ANULADO"
}

export enum Estado {
  ACTIVO = "ACTIVO",
  INACTIVO = "INACTIVO"
}

type EagerDatosSolicitud = {
  readonly ocupacion?: string | null;
  readonly nombre_empresa?: string | null;
  readonly direccion_empresa?: string | null;
  readonly telefono_empresa?: string | null;
  readonly antiguedad?: string | null;
  readonly ingresos?: string | null;
  readonly personas_cargo?: string | null;
  readonly estado_civil?: string | null;
  readonly vivienda?: string | null;
  readonly ref1_familiar_nombre?: string | null;
  readonly ref1_familiar_parentesco?: string | null;
  readonly ref1_familiar_telefono?: string | null;
  readonly ref2_familiar_nombre?: string | null;
  readonly ref2_familiar_parentesco?: string | null;
  readonly ref2_familiar_telefono?: string | null;
  readonly ref1_comercial_nombre?: string | null;
  readonly ref1_comercial_observacion?: string | null;
  readonly ref2_comercial_nombre?: string | null;
  readonly ref2_comercial_observacion?: string | null;
}

type LazyDatosSolicitud = {
  readonly ocupacion?: string | null;
  readonly nombre_empresa?: string | null;
  readonly direccion_empresa?: string | null;
  readonly telefono_empresa?: string | null;
  readonly antiguedad?: string | null;
  readonly ingresos?: string | null;
  readonly personas_cargo?: string | null;
  readonly estado_civil?: string | null;
  readonly vivienda?: string | null;
  readonly ref1_familiar_nombre?: string | null;
  readonly ref1_familiar_parentesco?: string | null;
  readonly ref1_familiar_telefono?: string | null;
  readonly ref2_familiar_nombre?: string | null;
  readonly ref2_familiar_parentesco?: string | null;
  readonly ref2_familiar_telefono?: string | null;
  readonly ref1_comercial_nombre?: string | null;
  readonly ref1_comercial_observacion?: string | null;
  readonly ref2_comercial_nombre?: string | null;
  readonly ref2_comercial_observacion?: string | null;
}

export declare type DatosSolicitud = LazyLoading extends LazyLoadingDisabled ? EagerDatosSolicitud : LazyDatosSolicitud

export declare const DatosSolicitud: (new (init: ModelInit<DatosSolicitud>) => DatosSolicitud)

type EagerTaxCode = {
  readonly email?: string | null;
  readonly phone?: string | null;
}

type LazyTaxCode = {
  readonly email?: string | null;
  readonly phone?: string | null;
}

export declare type TaxCode = LazyLoading extends LazyLoadingDisabled ? EagerTaxCode : LazyTaxCode

export declare const TaxCode: (new (init: ModelInit<TaxCode>) => TaxCode)

type EagerDireccion = {
  readonly address?: string | null;
  readonly city?: string | null;
  readonly department?: string | null;
  readonly country?: string | null;
}

type LazyDireccion = {
  readonly address?: string | null;
  readonly city?: string | null;
  readonly department?: string | null;
  readonly country?: string | null;
}

export declare type Direccion = LazyLoading extends LazyLoadingDisabled ? EagerDireccion : LazyDireccion

export declare const Direccion: (new (init: ModelInit<Direccion>) => Direccion)

type EagerContact = {
  readonly name?: string | null;
  readonly email?: string | null;
  readonly phone?: string | null;
}

type LazyContact = {
  readonly name?: string | null;
  readonly email?: string | null;
  readonly phone?: string | null;
}

export declare type Contact = LazyLoading extends LazyLoadingDisabled ? EagerContact : LazyContact

export declare const Contact: (new (init: ModelInit<Contact>) => Contact)

type EagerProductoProveedor = {
  readonly nit_proveedor: string;
  readonly codigo: string;
}

type LazyProductoProveedor = {
  readonly nit_proveedor: string;
  readonly codigo: string;
}

export declare type ProductoProveedor = LazyLoading extends LazyLoadingDisabled ? EagerProductoProveedor : LazyProductoProveedor

export declare const ProductoProveedor: (new (init: ModelInit<ProductoProveedor>) => ProductoProveedor)

type EagerAuditoria = {
  readonly fecha: string;
  readonly UsuarioID: string;
}

type LazyAuditoria = {
  readonly fecha: string;
  readonly UsuarioID: string;
}

export declare type Auditoria = LazyLoading extends LazyLoadingDisabled ? EagerAuditoria : LazyAuditoria

export declare const Auditoria: (new (init: ModelInit<Auditoria>) => Auditoria)

type EagerModuloNew = {
  readonly icon: string;
  readonly path: string;
  readonly nombreModulo: string;
  readonly detalle?: string | null;
  readonly maneja_almacenes: boolean;
}

type LazyModuloNew = {
  readonly icon: string;
  readonly path: string;
  readonly nombreModulo: string;
  readonly detalle?: string | null;
  readonly maneja_almacenes: boolean;
}

export declare type ModuloNew = LazyLoading extends LazyLoadingDisabled ? EagerModuloNew : LazyModuloNew

export declare const ModuloNew: (new (init: ModelInit<ModuloNew>) => ModuloNew)

type EagerCategoriaAtributoNew = {
  readonly nombre: string;
  readonly tipo: string;
  readonly facturacion: boolean;
  readonly filtrar?: boolean | null;
}

type LazyCategoriaAtributoNew = {
  readonly nombre: string;
  readonly tipo: string;
  readonly facturacion: boolean;
  readonly filtrar?: boolean | null;
}

export declare type CategoriaAtributoNew = LazyLoading extends LazyLoadingDisabled ? EagerCategoriaAtributoNew : LazyCategoriaAtributoNew

export declare const CategoriaAtributoNew: (new (init: ModelInit<CategoriaAtributoNew>) => CategoriaAtributoNew)

type EagerAuditoriaInventario = {
  readonly fecha: string;
  readonly saldo: number;
  readonly UsuarioID: string;
}

type LazyAuditoriaInventario = {
  readonly fecha: string;
  readonly saldo: number;
  readonly UsuarioID: string;
}

export declare type AuditoriaInventario = LazyLoading extends LazyLoadingDisabled ? EagerAuditoriaInventario : LazyAuditoriaInventario

export declare const AuditoriaInventario: (new (init: ModelInit<AuditoriaInventario>) => AuditoriaInventario)

type EagerCotizacionItem = {
  readonly id: string;
  readonly consecutivo: number;
  readonly codigo_item: string;
  readonly nombre_item: string;
  readonly cantidad: number;
  readonly costo_item: number;
  readonly subtotal_item: number;
  readonly iva_item: number;
  readonly total_item: number;
  readonly estado?: Estado | keyof typeof Estado | null;
}

type LazyCotizacionItem = {
  readonly id: string;
  readonly consecutivo: number;
  readonly codigo_item: string;
  readonly nombre_item: string;
  readonly cantidad: number;
  readonly costo_item: number;
  readonly subtotal_item: number;
  readonly iva_item: number;
  readonly total_item: number;
  readonly estado?: Estado | keyof typeof Estado | null;
}

export declare type CotizacionItem = LazyLoading extends LazyLoadingDisabled ? EagerCotizacionItem : LazyCotizacionItem

export declare const CotizacionItem: (new (init: ModelInit<CotizacionItem>) => CotizacionItem)

type EagerUbicacionInventario = {
  readonly seccion?: string | null;
  readonly estante?: string | null;
  readonly nivel?: string | null;
  readonly caja?: string | null;
  readonly detalle?: string | null;
}

type LazyUbicacionInventario = {
  readonly seccion?: string | null;
  readonly estante?: string | null;
  readonly nivel?: string | null;
  readonly caja?: string | null;
  readonly detalle?: string | null;
}

export declare type UbicacionInventario = LazyLoading extends LazyLoadingDisabled ? EagerUbicacionInventario : LazyUbicacionInventario

export declare const UbicacionInventario: (new (init: ModelInit<UbicacionInventario>) => UbicacionInventario)

type EagerCajaRegistradora = {
  readonly numero_caja: number;
  readonly prefijo: string;
  readonly resolucion?: string | null;
  readonly en_uso: boolean;
  readonly usuario_en_uso?: string | null;
  readonly estado: Estado | keyof typeof Estado;
}

type LazyCajaRegistradora = {
  readonly numero_caja: number;
  readonly prefijo: string;
  readonly resolucion?: string | null;
  readonly en_uso: boolean;
  readonly usuario_en_uso?: string | null;
  readonly estado: Estado | keyof typeof Estado;
}

export declare type CajaRegistradora = LazyLoading extends LazyLoadingDisabled ? EagerCajaRegistradora : LazyCajaRegistradora

export declare const CajaRegistradora: (new (init: ModelInit<CajaRegistradora>) => CajaRegistradora)

type EagerModuloUserAlmacenes = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ModuloUserAlmacenes, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly estado: Estado | keyof typeof Estado;
  readonly ModuloNew?: ModuloNew | null;
  readonly Almacen?: Almacen | null;
  readonly Usuario?: Usuario | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly moduloUserAlmacenesAlmacenId?: string | null;
  readonly moduloUserAlmacenesUsuarioId?: string | null;
}

type LazyModuloUserAlmacenes = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ModuloUserAlmacenes, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly estado: Estado | keyof typeof Estado;
  readonly ModuloNew?: ModuloNew | null;
  readonly Almacen: AsyncItem<Almacen | undefined>;
  readonly Usuario: AsyncItem<Usuario | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly moduloUserAlmacenesAlmacenId?: string | null;
  readonly moduloUserAlmacenesUsuarioId?: string | null;
}

export declare type ModuloUserAlmacenes = LazyLoading extends LazyLoadingDisabled ? EagerModuloUserAlmacenes : LazyModuloUserAlmacenes

export declare const ModuloUserAlmacenes: (new (init: ModelInit<ModuloUserAlmacenes>) => ModuloUserAlmacenes) & {
  copyOf(source: ModuloUserAlmacenes, mutator: (draft: MutableModel<ModuloUserAlmacenes>) => MutableModel<ModuloUserAlmacenes> | void): ModuloUserAlmacenes;
}

type EagerModuloUserPermiso = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ModuloUserPermiso, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly estado: Estado | keyof typeof Estado;
  readonly ModuloNew?: ModuloNew | null;
  readonly Usuario: Usuario;
  readonly code?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly moduloUserPermisoUsuarioId: string;
}

type LazyModuloUserPermiso = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ModuloUserPermiso, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly estado: Estado | keyof typeof Estado;
  readonly ModuloNew?: ModuloNew | null;
  readonly Usuario: AsyncItem<Usuario>;
  readonly code?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly moduloUserPermisoUsuarioId: string;
}

export declare type ModuloUserPermiso = LazyLoading extends LazyLoadingDisabled ? EagerModuloUserPermiso : LazyModuloUserPermiso

export declare const ModuloUserPermiso: (new (init: ModelInit<ModuloUserPermiso>) => ModuloUserPermiso) & {
  copyOf(source: ModuloUserPermiso, mutator: (draft: MutableModel<ModuloUserPermiso>) => MutableModel<ModuloUserPermiso> | void): ModuloUserPermiso;
}

type EagerConsecutivo = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Consecutivo, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly consecutivo: number;
  readonly ModuloNew?: ModuloNew | null;
  readonly Almacen?: Almacen | null;
  readonly codigo?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly consecutivoAlmacenId?: string | null;
}

type LazyConsecutivo = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Consecutivo, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly consecutivo: number;
  readonly ModuloNew?: ModuloNew | null;
  readonly Almacen: AsyncItem<Almacen | undefined>;
  readonly codigo?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly consecutivoAlmacenId?: string | null;
}

export declare type Consecutivo = LazyLoading extends LazyLoadingDisabled ? EagerConsecutivo : LazyConsecutivo

export declare const Consecutivo: (new (init: ModelInit<Consecutivo>) => Consecutivo) & {
  copyOf(source: Consecutivo, mutator: (draft: MutableModel<Consecutivo>) => MutableModel<Consecutivo> | void): Consecutivo;
}

type EagerAlmacen = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Almacen, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly organizationType: number;
  readonly identificationNumber: string;
  readonly dv?: string | null;
  readonly name: string;
  readonly tradeName: string;
  readonly direccion: string;
  readonly ciudad: string;
  readonly telefono: string;
  readonly address: Direccion;
  readonly contact?: Contact | null;
  readonly secciones?: (string | null)[] | null;
  readonly estantes?: (string | null)[] | null;
  readonly niveles?: (string | null)[] | null;
  readonly cajas?: (string | null)[] | null;
  readonly cajas_registradoras?: (CajaRegistradora | null)[] | null;
  readonly regimeCode?: string | null;
  readonly taxCode?: TaxCode | null;
  readonly estado: Estado | keyof typeof Estado;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyAlmacen = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Almacen, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly organizationType: number;
  readonly identificationNumber: string;
  readonly dv?: string | null;
  readonly name: string;
  readonly tradeName: string;
  readonly direccion: string;
  readonly ciudad: string;
  readonly telefono: string;
  readonly address: Direccion;
  readonly contact?: Contact | null;
  readonly secciones?: (string | null)[] | null;
  readonly estantes?: (string | null)[] | null;
  readonly niveles?: (string | null)[] | null;
  readonly cajas?: (string | null)[] | null;
  readonly cajas_registradoras?: (CajaRegistradora | null)[] | null;
  readonly regimeCode?: string | null;
  readonly taxCode?: TaxCode | null;
  readonly estado: Estado | keyof typeof Estado;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Almacen = LazyLoading extends LazyLoadingDisabled ? EagerAlmacen : LazyAlmacen

export declare const Almacen: (new (init: ModelInit<Almacen>) => Almacen) & {
  copyOf(source: Almacen, mutator: (draft: MutableModel<Almacen>) => MutableModel<Almacen> | void): Almacen;
}

type EagerUsuario = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Usuario, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly username?: string | null;
  readonly nombreUsuario: string;
  readonly sub: string;
  readonly estado?: Estado | keyof typeof Estado | null;
  readonly modulos_new?: (ModuloNew | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUsuario = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Usuario, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly username?: string | null;
  readonly nombreUsuario: string;
  readonly sub: string;
  readonly estado?: Estado | keyof typeof Estado | null;
  readonly modulos_new?: (ModuloNew | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Usuario = LazyLoading extends LazyLoadingDisabled ? EagerUsuario : LazyUsuario

export declare const Usuario: (new (init: ModelInit<Usuario>) => Usuario) & {
  copyOf(source: Usuario, mutator: (draft: MutableModel<Usuario>) => MutableModel<Usuario> | void): Usuario;
}

type EagerProducto = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Producto, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly codigo?: string | null;
  readonly nombreProducto: string;
  readonly nombreCorto?: string | null;
  readonly iva: number;
  readonly venta?: boolean | null;
  readonly insumos?: boolean | null;
  readonly preparacion?: boolean | null;
  readonly barras?: string | null;
  readonly presentacion?: string | null;
  readonly descripcion?: string | null;
  readonly cambio_precio?: boolean | null;
  readonly datos_producto?: string | null;
  readonly Proveedores?: (ProductoProveedor | null)[] | null;
  readonly imagen?: string | null;
  readonly Linea?: Linea | null;
  readonly Categoria?: Categoria | null;
  readonly Marca?: Marca | null;
  readonly estado?: Estado | keyof typeof Estado | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly productoLineaId?: string | null;
  readonly productoCategoriaId?: string | null;
  readonly productoMarcaId?: string | null;
}

type LazyProducto = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Producto, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly codigo?: string | null;
  readonly nombreProducto: string;
  readonly nombreCorto?: string | null;
  readonly iva: number;
  readonly venta?: boolean | null;
  readonly insumos?: boolean | null;
  readonly preparacion?: boolean | null;
  readonly barras?: string | null;
  readonly presentacion?: string | null;
  readonly descripcion?: string | null;
  readonly cambio_precio?: boolean | null;
  readonly datos_producto?: string | null;
  readonly Proveedores?: (ProductoProveedor | null)[] | null;
  readonly imagen?: string | null;
  readonly Linea: AsyncItem<Linea | undefined>;
  readonly Categoria: AsyncItem<Categoria | undefined>;
  readonly Marca: AsyncItem<Marca | undefined>;
  readonly estado?: Estado | keyof typeof Estado | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly productoLineaId?: string | null;
  readonly productoCategoriaId?: string | null;
  readonly productoMarcaId?: string | null;
}

export declare type Producto = LazyLoading extends LazyLoadingDisabled ? EagerProducto : LazyProducto

export declare const Producto: (new (init: ModelInit<Producto>) => Producto) & {
  copyOf(source: Producto, mutator: (draft: MutableModel<Producto>) => MutableModel<Producto> | void): Producto;
}

type EagerMarca = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Marca, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly nombreMarca?: string | null;
  readonly estado?: Estado | keyof typeof Estado | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyMarca = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Marca, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly nombreMarca?: string | null;
  readonly estado?: Estado | keyof typeof Estado | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Marca = LazyLoading extends LazyLoadingDisabled ? EagerMarca : LazyMarca

export declare const Marca: (new (init: ModelInit<Marca>) => Marca) & {
  copyOf(source: Marca, mutator: (draft: MutableModel<Marca>) => MutableModel<Marca> | void): Marca;
}

type EagerCategoria = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Categoria, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly nombreCategoria: string;
  readonly estado: Estado | keyof typeof Estado;
  readonly Atributos?: (CategoriaAtributoNew | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyCategoria = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Categoria, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly nombreCategoria: string;
  readonly estado: Estado | keyof typeof Estado;
  readonly Atributos?: (CategoriaAtributoNew | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Categoria = LazyLoading extends LazyLoadingDisabled ? EagerCategoria : LazyCategoria

export declare const Categoria: (new (init: ModelInit<Categoria>) => Categoria) & {
  copyOf(source: Categoria, mutator: (draft: MutableModel<Categoria>) => MutableModel<Categoria> | void): Categoria;
}

type EagerLinea = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Linea, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly nombreLinea: string;
  readonly estado: Estado | keyof typeof Estado;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyLinea = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Linea, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly nombreLinea: string;
  readonly estado: Estado | keyof typeof Estado;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Linea = LazyLoading extends LazyLoadingDisabled ? EagerLinea : LazyLinea

export declare const Linea: (new (init: ModelInit<Linea>) => Linea) & {
  copyOf(source: Linea, mutator: (draft: MutableModel<Linea>) => MutableModel<Linea> | void): Linea;
}

type EagerInventario = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Inventario, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly inventario: number;
  readonly separado: number;
  readonly costo_promedio?: number | null;
  readonly costo: number;
  readonly precio: number;
  readonly auditoria?: AuditoriaInventario | null;
  readonly ubicacion?: (UbicacionInventario | null)[] | null;
  readonly estado?: Estado | keyof typeof Estado | null;
  readonly Producto?: Producto | null;
  readonly Almacen?: Almacen | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly inventarioProductoId?: string | null;
  readonly inventarioAlmacenId?: string | null;
}

type LazyInventario = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Inventario, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly inventario: number;
  readonly separado: number;
  readonly costo_promedio?: number | null;
  readonly costo: number;
  readonly precio: number;
  readonly auditoria?: AuditoriaInventario | null;
  readonly ubicacion?: (UbicacionInventario | null)[] | null;
  readonly estado?: Estado | keyof typeof Estado | null;
  readonly Producto: AsyncItem<Producto | undefined>;
  readonly Almacen: AsyncItem<Almacen | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly inventarioProductoId?: string | null;
  readonly inventarioAlmacenId?: string | null;
}

export declare type Inventario = LazyLoading extends LazyLoadingDisabled ? EagerInventario : LazyInventario

export declare const Inventario: (new (init: ModelInit<Inventario>) => Inventario) & {
  copyOf(source: Inventario, mutator: (draft: MutableModel<Inventario>) => MutableModel<Inventario> | void): Inventario;
}

type EagerTicket = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Ticket, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly consecutivo: number;
  readonly forma_pago: FormasPago | keyof typeof FormasPago;
  readonly cliente?: string | null;
  readonly telefono?: string | null;
  readonly costo?: number | null;
  readonly precio_venta: number;
  readonly Almacen: Almacen;
  readonly Usuario: Usuario;
  readonly estado: EstadoTicket | keyof typeof EstadoTicket;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly ticketAlmacenId: string;
  readonly ticketUsuarioId: string;
}

type LazyTicket = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Ticket, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly consecutivo: number;
  readonly forma_pago: FormasPago | keyof typeof FormasPago;
  readonly cliente?: string | null;
  readonly telefono?: string | null;
  readonly costo?: number | null;
  readonly precio_venta: number;
  readonly Almacen: AsyncItem<Almacen>;
  readonly Usuario: AsyncItem<Usuario>;
  readonly estado: EstadoTicket | keyof typeof EstadoTicket;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly ticketAlmacenId: string;
  readonly ticketUsuarioId: string;
}

export declare type Ticket = LazyLoading extends LazyLoadingDisabled ? EagerTicket : LazyTicket

export declare const Ticket: (new (init: ModelInit<Ticket>) => Ticket) & {
  copyOf(source: Ticket, mutator: (draft: MutableModel<Ticket>) => MutableModel<Ticket> | void): Ticket;
}

type EagerTicketItem = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<TicketItem, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly consecutivo: number;
  readonly valor: number;
  readonly Productos?: Producto | null;
  readonly Almacen: Almacen;
  readonly Usuario: Usuario;
  readonly Ticket: Ticket;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly ticketItemProductosId?: string | null;
  readonly ticketItemAlmacenId: string;
  readonly ticketItemUsuarioId: string;
  readonly ticketItemTicketId: string;
}

type LazyTicketItem = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<TicketItem, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly consecutivo: number;
  readonly valor: number;
  readonly Productos: AsyncItem<Producto | undefined>;
  readonly Almacen: AsyncItem<Almacen>;
  readonly Usuario: AsyncItem<Usuario>;
  readonly Ticket: AsyncItem<Ticket>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly ticketItemProductosId?: string | null;
  readonly ticketItemAlmacenId: string;
  readonly ticketItemUsuarioId: string;
  readonly ticketItemTicketId: string;
}

export declare type TicketItem = LazyLoading extends LazyLoadingDisabled ? EagerTicketItem : LazyTicketItem

export declare const TicketItem: (new (init: ModelInit<TicketItem>) => TicketItem) & {
  copyOf(source: TicketItem, mutator: (draft: MutableModel<TicketItem>) => MutableModel<TicketItem> | void): TicketItem;
}