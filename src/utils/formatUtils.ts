import moment from "moment";
import {
  AjusteInventario,
  Almacen,
  Compra,
  ComprobanteEgreso,
  Estado,
  EstadoCredito,
  LazyAjusteInventario,
  LazyAjusteInventarioItem,
  LazyAlmacen,
  LazyCarteraProveedores,
  LazyCommentarioSolicitud,
  LazyCompra,
  LazyCotizacion,
  LazyInventario,
  LazyPedido,
  LazyProducto,
  LazySolicitudCredito,
  LazyTercero,
  LazyUsuario, ModuloNew, Pedido, Producto,
  Tercero,
  TipoCarteraProveedores,
  TipoCompras,
  TipoMovimientos,
  TipoPedidos,
  Usuario
} from "../models";
import CustomNotification from "../models/CustomNotification";


export default class FormatUtils {
  

  formatUsuarioData(data: LazyUsuario): LazyUsuario {
    // Campos mínimos requeridos para validar
    if (
      !data.username ||
      !data.nombreUsuario ||
      !data.sub
      // Agrega aquí otros campos requeridos que desees validar
    ) {
      throw new Error("Faltan campos requeridos.");
    }

    const modulos = data.modulos_new?.map((e: any) => new ModuloNew({
      icon: String(e.icon),
      nombreModulo: e.nombreModulo,
      path: e.path,
      maneja_almacenes: e.maneja_almacenes,
      detalle: e?.detalle

    }))


    const usuario = new Usuario({
      username: String(data.username),
      nombreUsuario: String(data.nombreUsuario),
      sub: String(data.sub),
      modulos_new: modulos,
      estado: Estado.ACTIVO
    })

    return usuario ;
  }

  //TERCEROS

  formatTerceroCreateData(data: LazyTercero): LazyTercero {
    console.log(data)
 // Campos mínimos requeridos para validar
    if (
      !data ||
        !data.tipo_tercero ||
        !data.identificacion ||
        !data.direccion ||
        !data.telefono ||
        !data.ciudad 
      // Agrega aquí otros campos requeridos que desees validar
    ) {
      throw new Error("Faltan campos requeridos.");
    }
   

    return {
      ...data,
      tipo_tercero: this.formatTipoTercero(data),
      nombre_completo: this.formatNombreCompleto(data),
      identificacion: data.identificacion,
      expedida: this.formatCiudad(data.expedida),
      lugar_nacimiento: this.formatCiudad(data.lugar_nacimiento),
      fecha_nacimiento: this.formatDate(data.fecha_nacimiento),
      primer_apellido: this.formatStringToUpperCase(data.primer_apellido || ""),
      segundo_apellido: this.formatStringToUpperCase(
        String(data.segundo_apellido)
      ),
      primer_nombre: this.formatStringToUpperCase(data.primer_nombre || ""),
      segundo_nombre: this.formatStringToUpperCase(
        String(data.segundo_nombre)
      ),
      direccion: this.formatStringToUpperCase(data.direccion),
      ciudad: this.formatCiudad(data.ciudad),
      estado:  data.estado || Estado.ACTIVO,
    };
  }

  formatTerceroUpdateData(data: LazyTercero): LazyTercero {
    // Campos mínimos requeridos para validar
    console.log(data)
    if (
      !data.primer_nombre ||
      !data.primer_apellido ||
      !data.direccion 

      // Agrega aquí otros campos requeridos que desees validar
    ) {
      throw new Error("Faltan campos requeridos.");
    }

    return ({
      ...data,
      tipo_tercero: this.formatTipoTercero(data),
      nombre_completo: this.formatNombreCompleto(data),
      dv: this.formatNumber(data.dv),
      identificacion: data.identificacion,
      expedida: this.formatCiudad(data.expedida),
      lugar_nacimiento: this.formatCiudad(data.lugar_nacimiento),
      fecha_nacimiento: this.formatDate(data.fecha_nacimiento),
      primer_apellido: this.formatStringToUpperCase(data.primer_apellido),
      segundo_apellido: this.formatStringToUpperCase(
        String(data.segundo_apellido)
      ),
      primer_nombre: this.formatStringToUpperCase(data.primer_nombre),
      segundo_nombre: this.formatStringToUpperCase(
        String(data.segundo_nombre)
      ),
      direccion: this.formatStringToUpperCase(data.direccion),
      ciudad: this.formatCiudad(data.ciudad),
      estado:  data.estado || Estado.ACTIVO,
    });
  }

  // RESERVAS

  formatReservaData = (   data: any  ) => {
    // campos minimos requeridos para validar
    if (
      !data.identificacion ||
      !data.nombre_completo ||
      !data.producto ||
      !data.marca ||
      !data.modelo ||
      !data.color ||
      !data.motor ||
      !data.chasis ||
      !data.placa
      // Agrega aquí otros campos requeridos que desees validar
    ) {
      throw new Error("Faltan campos requeridos.");
    }
  
    return {
      ...data,
      consecutivo: data.consecutivo.consecutivo,
      fecha: moment().format(),
      identificacion: this.formatNumber(data.identificacion),
      nombre_completo: this.formatStringToUpperCase(data.nombre_completo),
      producto: this.formatStringToUpperCase(data.producto),
      marca: this.formatStringToUpperCase(data.marca),
      modelo: this.formatStringToUpperCase(data.modelo),
      color: this.formatStringToUpperCase(data.color),
      motor: this.formatStringToUpperCase(data.motor),
      chasis: this.formatStringToUpperCase(data.chasis),
      placa: this.formatStringToUpperCase(data.placa),
      detalle: ''
    };
  };

  // PRODUCTOS

  formatProductoData(data: any) {  // campos minimos requeridos para validar
    //
    if (
      !data.linea ||
      !data.categoria ||
      !data.marca ||
      !data.nombreProducto ||
      !data.iva
      // Agrega aquí otros campos requeridos que desees validar
    ) {
      throw new Error("Faltan campos requeridos en los datos del producto.");
    }
  
    return({
      nombreProducto: this.removeSpacesUpperCase(data.nombreProducto),
      descripcion: data.descripcion,
      barras: data.barras && this.removeSpacesUpperCase(data.barras),
      presentacion: data.presentacion && this.removeSpacesUpperCase(data.presentacion),
      datos_producto: data.datos_producto,
      iva: this.formatNumber(data.iva),
      productoLineaId: data.linea.id,
      productoCategoriaId: data.categoria.id,
      productoMarcaId: data.marca.id,
      estado: Estado.ACTIVO,
    });
  };

  formatProductoUpdateData(data: any):LazyProducto {  // campos minimos requeridos para validar
    

console.log(data)

    if (
      !data.linea ||
      !data.categoria ||
      !data.marca ||
      !data.nombreProducto 
      // Agrega aquí otros campos requeridos que desees validar
    ) {
      throw new Error("Faltan campos requeridos en los datos del producto.");
    }
  
    return new Producto({
      nombreProducto: this.removeSpacesUpperCase(data.nombreProducto),
      descripcion: data.descripcion,
      barras: data.barras && this.removeSpacesUpperCase(data.barras),
      presentacion: data.presentacion && this.removeSpacesUpperCase(data.presentacion),
      datos_producto: data.datos_producto,
      iva: this.formatNumber(data.iva),
      productoLineaId: data.linea.id,
      productoCategoriaId: data.categoria.id,
      productoMarcaId: data.marca.id,
      estado: Estado.ACTIVO,
    });
  };
  formatProductoUpdateDataAll(data: any):LazyProducto {  // campos minimos requeridos para validar

  
    return new Producto({
      nombreProducto: this.removeSpacesUpperCase(data.nombreProducto),
      descripcion: data.descripcion,
      barras: data.barras && this.removeSpacesUpperCase(data.barras),
      presentacion: data.presentacion && this.removeSpacesUpperCase(data.presentacion),
      productoCategoriaId: data.productoCategoriaId,
      productoLineaId: data.productoLineaId,
      productoMarcaId: data.productoMarcaId,
      datos_producto: data.datos_producto,
      iva: this.formatNumber(data.iva),
      estado: Estado.ACTIVO,
    });
  };
    // INVENTARIOS

    formatInventarioUpdateData(newData: any): LazyInventario | null {  // campos minimos requeridos para validar
      //console.log(newData)
      if (
        !newData.precio ||
        !newData.inventario ||
        !newData.costo 
        // Agrega aquí otros campos requeridos que desees validar
      ) {
        throw new Error("Faltan campos requeridos en los datos del inventario.");
      }
    
      return ({
        ...newData,
        costo: this.formatNumber(newData.costo),
        inventario: this.formatNumber(newData.inventario),
        separado: this.formatNumber(newData.separado),
        precio: this.formatNumber(newData.precio),
      });
    };

  // COMPRAS
  formatCompraCreateRegistroData = (   data: any  ): LazyCompra | null => {

    //
     
     if (
       !data.Consecutivo ||
       !data.Almacen ||
       !data.Usuario ||
       !data.Tercero 
       // Agrega aquí otros campos requeridos que desees validar
     ) {
       throw new CustomNotification("Faltan campos requeridos para la Compra.", 401);
     }
 
 
 // Crear instancia de Tercero a partir de los datos recibidos
 
     return {
       ...data,
       tipo_compra: TipoCompras.COMPRA,
       consecutivo: data.Consecutivo.consecutivo,
       fecha_compra: moment(data.fecha_compra).format(),
       fecha_recibido: data.fecha_recibido ? moment(data.fecha_recibido).format() : null,
       fecha_vencimiento: data.fecha_vencimiento ? moment(data.fecha_vencimiento).format() : null,
       numero_factura: this.formatStringToUpperCase(data.numero_factura),
       subtotal: this.formatNumber(data.subtotal),
       iva: this.formatNumber(data.iva),
       retencion: this.formatNumber(data.retencion),
       total: this.formatNumber(data.total),
       compraAlmacenId: data.Almacen.id,
       Almacen: this.convertirAAlmacen(data.Almacen),
       compraUsuarioId: data.Usuario.id,
       Usuario: data.Usuario,
       compraTerceroId: data.Tercero.id,
       Tercero: this.convertirATercero(data.Tercero),
       grabado: data.grabado || false,
     };
 
   };


  formatCompraCreateData = (   data: any, odata: any  ): LazyCompra | null => {

   //
    
    if (
      !data.Consecutivo ||
      !data.Almacen ||
      !data.Usuario ||
      !data.Tercero 
      // Agrega aquí otros campos requeridos que desees validar
    ) {
      throw new CustomNotification("Faltan campos requeridos para la Compra.", 401);
    }


// Crear instancia de Tercero a partir de los datos recibidos

    return {
      ...data,
      tipo_compra: TipoCompras.COMPRA,
      consecutivo: data.Consecutivo.consecutivo,
      fecha_compra: moment(data.fecha_compra).format(),
      fecha_recibido: data.fecha_recibido ? moment(data.fecha_recibido).format() : null,
      fecha_vencimiento: odata.fecha_vencimiento ? moment(odata.fecha_vencimiento).format() : moment().format(),
      numero_factura: this.formatStringToUpperCase(data.numero_factura),
      subtotal: this.formatNumber(data.subtotal),
      iva: this.formatNumber(data.iva),
      retencion: this.formatNumber(data.retencion),
      total: this.formatNumber(data.total),
      compraAlmacenId: data.Almacen.id,
      Almacen: this.convertirAAlmacen(data.Almacen),
      compraUsuarioId: data.Usuario.id,
      Usuario: data.Usuario,
      compraTerceroId: data.Tercero.id,
      Tercero: this.convertirATercero(data.Tercero),
      grabado: data.grabado || false,
      forma_pago: odata.forma_pago.value,
      observaciones: odata.observaciones
    };

  };

  formatCompraCreateCarteraData = (  compra: any  ): any | null => {
 // Crear instancia de Tercero a partir de los datos recibidos
 
     return {
      documento: compra.numero_factura,
      documento_original: compra.numero_factura,
      fecha: compra.fecha_compra,
      fecha_vencimiento: compra.fecha_vencimiento,
      valor: compra.total,
      saldo: compra.total,
      tipo_venta: compra.forma_pago,
      observaciones: compra.observaciones,
      carteraProveedoresUsuarioId: compra.compraUsuarioId,
      carteraProveedoresAlmacenId: compra.compraAlmacenId,
      carteraProveedoresTerceroId: compra.compraTerceroId,
      carteraProveedoresCompraId: compra.id
     };
 
   };

  formatCompraItemCreateData = (data: any, compra: Compra,almacen:Almacen  ): any | null => {

    //
     
     if (
       !compra ||
       !data ||
       !almacen
       // Agrega aquí otros campos requeridos que desees validar
     ) {
       throw new CustomNotification("Faltan campos requeridos para la Compra Item.", 401);
     }
   
     


     return {
      costo_item: this.formatNumber(data.costoItem),
      iva_item: this.formatNumber(data.ivaItem),
      total_item: this.formatNumber(data.totalItem),
      compraItemAlmacenId: almacen.id,
      cantidad: this.formatNumber(data.cantidadItem),
      compraItemCompraId: compra.id,
      compraItemProductoId: data.Producto.id,
      consecutivo: compra.consecutivo
    }
 
  };

  formatCompraDevolucionCreateData = (   data: any  ): LazyCompra | null => {

    //
     
     if (
       !data.Consecutivo ||
       !data.Almacen ||
       !data.Usuario ||
       !data.Tercero 
       // Agrega aquí otros campos requeridos que desees validar
     ) {
       throw new CustomNotification("Faltan campos requeridos para la Compra.", 401);
     }
   


     const { createdAt,updatedAt , ...otrosdATOS} = data;

     return {
       ...otrosdATOS,
       tipo_compra: TipoCompras.DEVOLUCION,
       consecutivo: data.Consecutivo.consecutivo,
       fecha_compra: moment(data.fecha_compra).format(),
       fecha_recibido: data.fecha_recibido ? moment(data.fecha_recibido).format() : null,
       fecha_vencimiento: data.fecha_vencimiento ? moment(data.fecha_vencimiento).format() : null,
       numero_factura: this.formatStringToUpperCase('DEV-'+data.numero_factura),
       subtotal: this.formatNumber(data.subtotal),
       iva: this.formatNumber(data.iva),
       retencion: this.formatNumber(data.retencion),
       total: this.formatNumber(data.total),
       compraAlmacenId: data.Almacen.id,
       Almacen: data.Almacen,
       compraUsuarioId: data.Usuario.id,
       Usuario: data.Usuario,
       compraTerceroId: data.Tercero.id,
       Tercero: data.Tercero,
       grabado: data.grabado || false,
     };
 
  };

  formatCompraItemDevolucionCreateData = (data: any, compra: Compra,almacen:Almacen  ): any | null => {

    //
     
     if (
       !compra ||
       !data ||
       !almacen
       // Agrega aquí otros campos requeridos que desees validar
     ) {
       throw new CustomNotification("Faltan campos requeridos para la Compra Item.", 401);
     }
   
     


     return {
      costo_item: this.formatNumber(data.costo_item),
      iva_item: this.formatNumber(data.iva_item),
      total_item: this.formatNumber(data.total_item),
      compraItemAlmacenId: almacen.id,
      cantidad: this.formatNumber(data.cantidadDevolver),
      compraItemCompraId: compra.id,
      compraItemProductoId: data.Producto.id,
      consecutivo: compra.consecutivo
    }
 
  };

  formatCompraUpdateRecibidaData = (   data: any  ): LazyCompra | null => {

    //
     
     if (
       !data.Almacen ||
       !data.Usuario ||
       !data.Tercero 
       // Agrega aquí otros campos requeridos que desees validar
     ) {
       throw new CustomNotification("Faltan campos requeridos para la Compra.", 401);
     }
   
     return {
       ...data,
       fecha_compra: moment(data.fecha_compra).format(),
       fecha_recibido: data.fecha_recibido ? moment(data.fecha_recibido).format() : null,
       fecha_vencimiento: data.fecha_vencimiento ? moment(data.fecha_vencimiento).format() : null,
       numero_factura: this.formatStringToUpperCase(data.numero_factura),
       subtotal: this.formatNumber(data.subtotal),
       iva: this.formatNumber(data.iva),
       retencion: this.formatNumber(data.retencion),
       total: this.formatNumber(data.total),
       compraTerceroId: data.Tercero.id,
       Tercero: data.Tercero,
       compraUsuarioId: data.Usuario.id,
       Usuario: data.Usuario,
     };
 
  };

  formatCompraUpdateRegistroData = (   data: any  ): LazyCompra | null => {

    //
     
     if (
       !data.Almacen ||
       !data.Usuario ||
       !data.Tercero 
       // Agrega aquí otros campos requeridos que desees validar
     ) {
       throw new CustomNotification("Faltan campos requeridos para la Compra.", 401);
     }
   
     return {
       ...data,
       fecha_compra: moment(data.fecha_compra).format(),
       fecha_recibido: data.fecha_recibido ? moment(data.fecha_recibido).format() : null,
       fecha_vencimiento: data.fecha_vencimiento ? moment(data.fecha_vencimiento).format() : null,
       numero_factura: this.formatStringToUpperCase(data.numero_factura),
       subtotal: this.formatNumber(data.subtotal),
       iva: this.formatNumber(data.iva),
       retencion: this.formatNumber(data.retencion),
       total: this.formatNumber(data.total),
       compraTerceroId: data.Tercero.id,
       Tercero: data.Tercero
     };
 
  };

  formatCompraUpdateData = (   data: any, odata: any  ): LazyCompra | null => {

   
      
      if (
        !data.items 
        // Agrega aquí otros campos requeridos que desees validar
      ) {
        throw new CustomNotification("La compra debe tener productos para ingresar.", 401);
      }
      
      return {
        ...data,
        fecha_compra: moment(data.fecha_compra).format(),
        fecha_recibido: data.fecha_recibido ? moment(data.fecha_recibido).format() : null,
        fecha_vencimiento: odata.fecha_vencimiento ? moment(odata.fecha_vencimiento).format() : moment().format(),
        numero_factura: this.formatStringToUpperCase(data.numero_factura),
        subtotal: this.formatNumber(data.subtotal),
        iva: this.formatNumber(data.iva),
        retencion: this.formatNumber(data.retencion),
        total: this.formatNumber(data.total),
        compraTerceroId: data.Tercero.id,
        Tercero: data.Tercero,
        grabado: true,
        forma_pago: odata.forma_pago.value,
        observaciones: odata.observaciones
      };
      
  };
   // CARTERA_PROVEEDORES
   



  // CREDITOS
   
  formatCreditoCreateData = (   data: any  ): LazySolicitudCredito  => {

     
     if (
       !data.Consecutivo ||
       !data.Almacen ||
       !data.Usuario ||
       !data.Cliente 
       // Agrega aquí otros campos requeridos que desees validar
     ) {
       throw new CustomNotification("Faltan campos requeridos para el Credito.", 401);
     }
   
     return {
        ...data,
        consecutivo: data.Consecutivo.consecutivo,
        fecha: moment().format(),

        cliente: data.Cliente,
        codeudor: data.Codeudor ? data.Codeudor : {},
        segundo_codeudor: data.Codeudor2 ? data.Codeudor : {},
        estado: EstadoCredito.PENDIENTE,

        relacion_credito: this.formatStringToUpperCase(data.relacion_credito),
        articulo: this.formatStringToUpperCase(data.articulo),
        valor_articulo: this.formatNumber(data.valor_articulo),
        inicial: this.formatNumber(data.inicial),
        cuotas: this.formatNumber(data.cuotas.label),
        valor_cuota: this.formatNumber(data.valor_cuota),
      
        Almacen: data.Almacen,
        solicitudCreditoAlmacenId:data.Almacen.id,
        Cliente: data.Cliente,
        solicitudCreditoClienteId: data.Cliente.id,
        solicitudCreditoCodeudorId: data.Codeudor ? data.Codeudor.id : null,
        solicitudCreditoSegundoCodeudorId: data.Codeudor2 ? data.Codeudor2.id : null,
        Usuario: data.Usuario,
        solicitudCreditoUsuarioId: data.Usuario.id,


       
     };
 
   };

   formatCreditoUpdateData = (   data: any  ): LazySolicitudCredito  => {

     
    if (
      !data.Almacen ||
      !data.Usuario ||
      !data.Cliente 
      // Agrega aquí otros campos requeridos que desees validar
    ) {
      throw new CustomNotification("Faltan campos requeridos para el Credito.", 401);
    }
  
    return {
       ...data,

       cliente: data.Cliente,
       codeudor: data.Codeudor ? data.Codeudor : {},
       segundo_codeudor: data.Codeudor2 ? data.Codeudor : {},
       estado: EstadoCredito.PENDIENTE,

       relacion_credito: this.formatStringToUpperCase(data.relacion_credito),
       articulo: this.formatStringToUpperCase(data.articulo),
       valor_articulo: this.formatNumber(data.valor_articulo),
       inicial: this.formatNumber(data.inicial),
       cuotas: this.formatNumber(data.cuotas.value),
       valor_cuota: this.formatNumber(data.valor_cuota),
     
       Almacen: data.Almacen,
       solicitudCreditoAlmacenId:data.Almacen.id,
       Cliente: data.Cliente,
       solicitudCreditoClienteId: data.Cliente.id,
       solicitudCreditoCodeudorId: data.Codeudor ? data.Codeudor.id : null,
       solicitudCreditoSegundoCodeudorId: data.Codeudor2 ? data.Codeudor2.id : null,
       Usuario: data.Usuario,
       solicitudCreditoUsuarioId: data.Usuario.id,


      
    };

  };
   formatComentarioCreditoCreateData = (   data: any  ): LazyCommentarioSolicitud  => {

     //
    if (
      !data.Usuario
      // Agrega aquí otros campos requeridos que desees validar
    ) {
      throw new CustomNotification("Faltan campos requeridos para el Credito.", 401);
    }
  
    return {
       ...data,
   
       fecha: moment().format(),


      
    };

  };

  // AJUSTES INVENTARIO

  formatAjusteInventarioRapidoCreateData = (   data: any  ): LazyAjusteInventario | null => {



    if (
      !data.Consecutivo ||
      !data.Almacen ||
      !data.Usuario ||
      !data.Producto 
       // Agrega aquí otros campos requeridos que desees validar
    ) {
      throw new CustomNotification("Faltan campos requeridos para el Ajuste de Inventario.", 401);
    }

    return {
      ...data,
      consecutivo: data.Consecutivo.consecutivo,
      fecha_ajuste: moment(data.fecha_compra).format(),
      total: this.formatNumber(data.cantidad) * this.formatNumber(data.costo) ,
      Almacen: data.Almacen,
      ajusteInventarioAlmacenId: data.Almacen.id,
      ajusteInventarioUsuarioId: data.Usuario.id,
      Usuario: data.Usuario,
      tipo_ajuste: data.tipo_ajuste.label,
      tipo_movimiento: TipoMovimientos.AJUSTES_INVENTARIO
    };
  };

  formatAjusteInventarioItemRapidoCreateData = (   data: any, ajuste: AjusteInventario  ) => {



    if (
      !data.Producto 
       // Agrega aquí otros campos requeridos que desees validar
    ) {
      throw new CustomNotification("Faltan Producto requerido para el Ajuste de Inventario.", 401);
    }

    return {

      consecutivo: data.Consecutivo.consecutivo,
      cantidad: this.formatNumber(data.cantidad),
      costo_item: this.formatNumber(data.costo),
      total_item: this.formatNumber(data.cantidad) * this.formatNumber(data.costo) ,
      ajusteInventarioItemAlmacenId: data.Almacen.id,
      ajusteInventarioItemProductoId: data.Producto.id,
      ajusteInventarioItemAjusteInventarioId: ajuste.id,
    };
  };

  formatTrasladoCreateData = (   data: any  ): LazyAjusteInventario | null => {



    if (
      !data.Consecutivo ||
      !data.Almacen ||
      !data.Usuario 
       // Agrega aquí otros campos requeridos que desees validar
    ) {
      throw new CustomNotification("Faltan campos requeridos para el Ajuste de Inventario.", 401);
    }

    return {
      ...data,
      consecutivo: data.Consecutivo.consecutivo,
      fecha_ajuste: moment(data.fecha_compra).format(),
      total: this.formatNumber(data.total) ,
      Almacen: data.Almacen,
      ajusteInventarioAlmacenId: data.Almacen.id,
      ajusteInventarioUsuarioId: data.Usuario.id,
      Usuario: data.Usuario,
      tipo_ajuste: 'TRASLADO',
      tipo_movimiento: TipoMovimientos.TRASLADO
    };
  };
  formatTrasladoItemCreateDataOrigen = (   data: any, ajuste: AjusteInventario, almacenID: string  ): LazyAjusteInventarioItem | null => {



    if (
      !data.item.Producto 
       // Agrega aquí otros campos requeridos que desees validar
    ) {
      throw new CustomNotification("Faltan Producto requerido para el Ajuste de Inventario.", 401);
    }

    return {
      ...data,
      consecutivo: ajuste.consecutivo,
      cantidad: this.formatNumber(data.cantidadItem * -1),
      costo_item: this.formatNumber(data.costoItem),
      total_item: this.formatNumber(data.cantidadItem) * this.formatNumber(data.costoItem) ,
      ajusteInventarioItemAlmacenId: almacenID,
      ajusteInventarioItemProductoId: data.item.inventarioProductoId,
      ajusteInventarioItemAjusteInventarioId: ajuste.id,
    };
  };
  formatTrasladoItemCreateDataDestino = (   data: any, ajuste: AjusteInventario, almacenID: string  ): LazyAjusteInventarioItem | null => {



    if (
      !data.item.Producto 
       // Agrega aquí otros campos requeridos que desees validar
    ) {
      throw new CustomNotification("Faltan Producto requerido para el Ajuste de Inventario.", 401);
    }

    return {
      ...data,
      consecutivo: ajuste.consecutivo,
      cantidad: this.formatNumber(data.cantidadItem),
      costo_item: this.formatNumber(data.costoItem),
      total_item: this.formatNumber(data.cantidadItem) * this.formatNumber(data.costoItem) ,
      ajusteInventarioItemAlmacenId: almacenID,
      ajusteInventarioItemProductoId: data.item.inventarioProductoId,
      ajusteInventarioItemAjusteInventarioId: ajuste.id,
    };
  };
  // COTIZACION

  formatCotizacionCreateData = (   data: any  ): LazyCotizacion | null => {

    //
     
     if (
       !data.Consecutivo ||
       !data.Almacen ||
       !data.Usuario
       // Agrega aquí otros campos requeridos que desees validar
     ) {
       throw new CustomNotification("Faltan campos requeridos para el Cotizacion.", 401);
     }


     let productos: [] = data.productos.map((element: any, i: number) => {
      if(element.Producto.id){
        return {
          id:  element.Producto.id,
          consecutivo: data.Consecutivo.consecutivo,
          codigo_item: element.Producto.codigo,
          nombre_item: element.Producto.nombreProducto,
          cantidad: this.formatNumber(element.cantidad),
          costo_item: element.costo_item,
          subtotal_item: element.subtotal_item,
          iva_item: element.iva_item,
          total_item: element.total_item,
          estado: Estado.ACTIVO
        }
      }else{
        return {
          id:  i +1+'',
          consecutivo: data.Consecutivo.consecutivo,

          codigo_item: "0",
          nombre_item: element.Producto.nombreProducto,
          cantidad: element.cantidad,
          costo_item: 0,
          subtotal_item: element.subtotal_item,
          iva_item: element.iva_item,
          total_item: element.total_item,
          estado: Estado.ACTIVO
        }
      }
     })
     
if(data.Tercero){
  const { value,label, createdAt, updatedAt, ...tercero } = data.Tercero
   
  return {
   ...data,
    consecutivo: data.Consecutivo.consecutivo,
    cliente:  !data.Tercero ? data.cliente  :  data.Tercero ,
    productos: productos,
    fecha_cotizacion: moment(data.fecha_cotizacion).format(),
    subtotal: this.formatNumber(data.subtotal),
    iva: this.formatNumber(data.iva),
    total: this.formatNumber(data.total),
    cotizacionAlmacenId: data.Almacen.id,
    Almacen: data.Almacen,
    cotizacionUsuarioId: data.Usuario.id,
    Usuario: data.Usuario,
    cotizacionTerceroId: data.Tercero?.id,
    Tercero: new Tercero(tercero),
    estado: Estado.ACTIVO
  };


}else{
  return {
    ...data,
     consecutivo: data.Consecutivo.consecutivo,
     cliente:  !data.Tercero ? data.cliente  :  data.Tercero ,
     productos: productos,
     fecha_cotizacion: moment(data.fecha_cotizacion).format(),
     subtotal: this.formatNumber(data.subtotal),
     iva: this.formatNumber(data.iva),
     total: this.formatNumber(data.total),
     cotizacionAlmacenId: data.Almacen.id,
     Almacen: data.Almacen,
     cotizacionUsuarioId: data.Usuario.id,
     Usuario: data.Usuario,
     cotizacionTerceroId: undefined,
     Tercero: undefined,
     estado: Estado.ACTIVO
   };
}
 
   };

   formatCotizacionUpdateData = (   data: any  ): LazyCotizacion | null => {

    //
     


     let productos: [] = data.productos.map((element: any, i: number) => {
      if(element.Producto?.id){
        return {
          id:  element.Producto.id,
          consecutivo: data.consecutivo,
          codigo_item: element.codigo_item,
          nombre_item: element.nombre_item,
          cantidad: this.formatNumber(element.cantidad),
          costo_item: element.costo_item,
          subtotal_item: element.subtotal_item,
          iva_item: element.iva_item,
          total_item: element.total_item,
          estado: Estado.ACTIVO
        }
      }else{
        return {
          id:  i +1+'',
          consecutivo: data.consecutivo,
          codigo_item: "0",
          nombre_item: element.nombre_item,
          cantidad: element.cantidad,
          costo_item: 0,
          subtotal_item: element.subtotal_item,
          iva_item: element.iva_item,
          total_item: element.total_item,
          estado: Estado.ACTIVO
        }
      }
     })
     

  return {
    ...data,
     consecutivo: data.consecutivo,
     cliente:  data.cliente,
     productos: productos,
     fecha_cotizacion: moment(data.fecha_cotizacion).format(),
     subtotal: this.formatNumber(data.subtotal),
     iva: this.formatNumber(data.iva),
     total: this.formatNumber(data.total),
     cotizacionAlmacenId: data.Almacen.id,
     Almacen: data.Almacen,
     cotizacionUsuarioId: data.Usuario.id,
     Usuario: data.Usuario,
     cotizacionTerceroId: undefined,
     Tercero: undefined,
     estado: Estado.ACTIVO
   };

 
   };


  // PEDIDO

  formatPedidoCreateData = (   data: any  ): LazyPedido | null => {

    //
     
     if (
       !data.Consecutivo ||
       !data.Almacen ||
       !data.Usuario ||
       !data.Tercero 
       // Agrega aquí otros campos requeridos que desees validar
     ) {
       throw new CustomNotification("Faltan campos requeridos para el Pedido.", 401);
     }

     let tipo_pedido = TipoPedidos.PEDIDO;

     if(data.forma_pago.value == TipoPedidos.SEPARADO){
      tipo_pedido = TipoPedidos.SEPARADO
     }
   
     return {
      ...data,
       fecha_pedido: moment(data.fecha_pedido).format(),
       subtotal: this.formatNumber(data.subtotal),
       iva: this.formatNumber(data.iva),
       total: this.formatNumber(data.total),
       cambio: this.formatNumber(data.cambio),
       forma_pago: data.forma_pago.value,
       tipo_pedido: tipo_pedido,
       pedidoAlmacenId: data.Almacen.id,
       Almacen: data.Almacen,
       pedidoUsuarioId: data.Usuario.id,
       Usuario: data.Usuario,
       pedidoTerceroId: data.Tercero.id,
       Tercero: data.Tercero,
     };
 
   };


   formatPedidoUpdateData = (   data: any  ): LazyPedido | null => {

    console.log(data)

     return {
      ...data,
       subtotal: this.formatNumber(data.subtotal),
       iva: this.formatNumber(data.iva),
       total: this.formatNumber(data.total),
       forma_pago: data.forma_pago.value,
       cambio: this.formatNumber(data.cambio),
     };
 
   };


   formatPedidoItemCreateData = (data: any, pedido: Pedido,almacen:Almacen  ): any | null => {

    
     
     if (
       !pedido ||
       !data ||
       !almacen
       // Agrega aquí otros campos requeridos que desees validar
     ) {
       throw new CustomNotification("Faltan campos requeridos para el Peido Item.", 401);
     }
   



     return {
      cantidad: this.formatNumber(data.cantidad),
      consecutivo: pedido.consecutivo,
      costo_item: this.formatNumber(data.costo_item),
      iva_item: this.formatNumber(data.iva_item),
      subtotal_item: this.formatNumber(data.subtotal_item),
      total_item: this.formatNumber(data.total_item),
      pedidoItemAlmacenId: almacen.id,
      pedidoItemProductoId: data.Producto.id,
      pedidoItemPedidoId: pedido.id,
      datos_producto: data.datos_producto,
      estado: Estado.ACTIVO
    }
 
   };
   formatPedidoItemUpdateDataSeparado = (pedido: any, pedidoItem: any ): any | null => {


    return {

      ...pedidoItem,
     consecutivo: pedido.consecutivo,

   }

  };




  formatPagoCreateData = (   data: any  ): any | null => {



    if (
      !data.Tercero ||
      !data.Consecutivo ||
      !data.Almacen ||
      !data.Usuario ||
      !data.tipo_pago
       // Agrega aquí otros campos requeridos que desees validar
    ) {
      throw new CustomNotification("Faltan campos requeridos para el Pago.", 401);
    }

    return {
      fecha: moment(data.fecha).format(),
      tipo_documento: data.tipo_pago.value,
      comprobanteEgresoAlmacenId: data.Almacen.id,
      comprobanteEgresoUsuarioId: data.Usuario.id,
      comprobanteEgresoTerceroId: data.Tercero.id,
      descuentos: this.formatNumber(data.descuentos) ,
      valor: this.formatNumber(data.total) ,
      observaciones: data.observaciones,
    };
  };

  formatPagoDocumentoCreateData = (   data: any, pago: ComprobanteEgreso  ): any | null => {

console.log(data)

    if (
      !pago
       // Agrega aquí otros campos requeridos que desees validar
    ) {
      throw new CustomNotification("Faltan campos requeridos para el Pago.", 401);
    }

    return {
      consecutivo: pago.consecutivo,
      fecha: moment(pago.fecha).format(),
      valor: this.formatNumber(data.abono) ,
      documento: data.documento,
      documento_original: data.documento_original,
      comprobanteEgresoDocumentoComprobanteEgresoId : pago.id,
      comprobanteEgresoDocumentoAlmacenId: pago.comprobanteEgresoAlmacenId,
      comprobanteEgresoDocumentoTerceroId: pago.comprobanteEgresoTerceroId,

    };
  };

  formatPagoUpdateCarteraData = (   data: any  ): any | null => {



    if (
      !data.Tercero ||
      !data.Consecutivo ||
      !data.Almacen ||
      !data.Usuario ||
      !data.tipo_pago
       // Agrega aquí otros campos requeridos que desees validar
    ) {
      throw new CustomNotification("Faltan campos requeridos para el Pago.", 401);
    }

    return {
      documento: 'ANTICIPO-'+ (data.Consecutivo.consecutivo + 1) ,
      documento_original: 'ANTICIPO',
      fecha: moment(data.fecha).format(),
      fecha_vencimiento: moment(data.fecha).format(),
      valor: this.formatNumber(data.total),
      saldo: this.formatNumber(data.saldo) - this.formatNumber(data.abono) ,
      tipo_venta: TipoCarteraProveedores.ANTICIPO,
      tipo_cartera: TipoCarteraProveedores.ANTICIPO,
      observaciones: data.observaciones,
      carteraProveedoresUsuarioId: data.Usuario.id,
      carteraProveedoresAlmacenId: data.Almacen.id,
      carteraProveedoresTerceroId: data.Tercero.id,
    };
  };
  formatPagoCreateAnticipoCarteraData = (   data: any  ): any | null => {



    if (
      !data.Tercero ||
      !data.Consecutivo ||
      !data.Almacen ||
      !data.Usuario ||
      !data.tipo_pago
       // Agrega aquí otros campos requeridos que desees validar
    ) {
      throw new CustomNotification("Faltan campos requeridos para el Pago.", 401);
    }

    return {
      documento: 'ANTICIPO-'+ (data.Consecutivo.consecutivo + 1) ,
      documento_original: 'ANTICIPO',
      fecha: moment(data.fecha).format(),
      fecha_vencimiento: moment(data.fecha).format(),
      valor: this.formatNumber(data.total) * -1 ,
      saldo: this.formatNumber(data.total) * -1 ,
      tipo_venta: TipoCarteraProveedores.ANTICIPO,
      tipo_cartera: TipoCarteraProveedores.ANTICIPO,
      observaciones: data.observaciones,
      carteraProveedoresUsuarioId: data.Usuario.id,
      carteraProveedoresAlmacenId: data.Almacen.id,
      carteraProveedoresTerceroId: data.Tercero.id,
    };
  };


  
   //--------------------------------------------------------------------

  formatNombreCompleto(data: any) {
    if (data.tipo_tercero === "CC" || data.tipo_tercero.value === "CC") {
      return [
        data.primer_nombre,
        data.segundo_nombre,
        data.primer_apellido,
        data.segundo_apellido,
      ]
        .filter(Boolean)
        .map(this.formatStringToUpperCase)
        .join(" ");
    } else {
      return this.formatStringToUpperCase(data.nombre_completo);
    }
  }



  formatTipoTercero(data: any) {
    return typeof data.tipo_tercero === "string"
      ? data.tipo_tercero
      : data.tipo_tercero.value;
  }

  formatCiudad(ciudad: any) {
    return ciudad ? ciudad.ciudad : "";
  }

  formatIdentificacion(identificacion: number) {
    return Number(identificacion);
  }

  formatDate(date: any) {
    if (!date || date === "Fecha inválida") {
      return new Date().toISOString();
    }

    const parsedDate = new Date(date);
    return isNaN(parsedDate.getTime())
      ? new Date().toISOString()
      : parsedDate.toISOString();
  }
  
  formatNumber = (str: any) => {
    if (typeof str === 'string') {

      const number = Number(str.replace(/,/g, ""));
      return isNaN(number) ? 0 : number;
    } else {
      return Number(str);
    }
  };

  formatStringToUpperCase(str: string) {
    return typeof str === "string" ? str.toUpperCase() : str;
  }

  removeSpacesUpperCase(cadena: string | any): string {
    return this.formatStringToUpperCase(cadena).replace(/\s+$/, "");
  }
  


  convertirAAlmacen  (data: any): LazyAlmacen | null {
    if (!data) {
      return null;
    }
  
    // Crear instancia de LazyAlmacen utilizando los datos proporcionados
    const almacen: LazyAlmacen = {
      ...data,
      id: data.id,
      codigo: data.codigo || null,
      nit: data.nit || null,
      nombreAlmacen: data.nombreAlmacen,
      direccion: data.direccion || null,
      ciudad: data.ciudad || null,
      telefono: data.telefono || null,
      secciones: data.secciones || null,
      estantes: data.estantes || null,
      niveles: data.niveles || null,
      cajas: data.cajas || null,
      cajas_registradoras: data.cajas_registradoras || null,
      estado: data.estado || null,
      createdAt: data.createdAt || null,
      updatedAt: data.updatedAt || null,
    };
  
    return almacen;
  };

  convertirATercero (data: any): LazyTercero | null {
    if (!data) {
      return null;
    }
  
    // Crear instancia de LazyTercero utilizando los datos proporcionados
    const tercero: LazyTercero = {
      ...data,
      id: data.id,
      tipo_tercero: data.tipo_tercero,
      identificacion: data.identificacion,
      dv: data.dv || null,
      expedida: data.expedida || null,
      lugar_nacimiento: data.lugar_nacimiento || null,
      fecha_nacimiento: data.fecha_nacimiento || null,
      nombre_completo: data.nombre_completo,
      primer_apellido: data.primer_apellido || null,
      segundo_apellido: data.segundo_apellido || null,
      primer_nombre: data.primer_nombre || null,
      segundo_nombre: data.segundo_nombre || null,
      direccion: data.direccion || null,
      telefono: data.telefono || null,
      ciudad: data.ciudad || null,
      correo: data.correo || null,
      datos_personales: data.datos_personales || null,
      estado: data.estado || null,
      createdAt: data.createdAt || null,
      updatedAt: data.updatedAt || null,
    };
  
    return tercero;
  };

}
