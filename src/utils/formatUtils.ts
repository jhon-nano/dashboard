import {
  EstadoTicket,
  LazyAlmacen,

  LazyInventario,

  LazyProducto,

  LazyTicket,

  LazyUsuario, ModuloNew, Producto,
  Usuario
} from "../models";
import { Estado } from '../models/index';


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



  // PRODUCTOS

  formatProductoData(data: any) {  // campos minimos requeridos para validar
    //
    if (
      !data.nombreProducto 
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

      estado: Estado.ACTIVO,
    });
  };

  formatProductoUpdateData(data: any):LazyProducto {  // campos minimos requeridos para validar
    

console.log(data)

    if (
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
          !newData.precio
          // Agrega aquí otros campos requeridos que desees validar
        ) {
          throw new Error("Faltan campos requeridos en los datos del inventario.");
        }
      
        return ({
          ...newData,
          precio: this.formatNumber(newData.precio),
        });
      };




      formatTicketData(data: any): LazyTicket {  // campos minimos requeridos para validar
        //
        if (
          !data.Almacen ||
          !data.Usuario ||
          !data.Consecutivo 
          // Agrega aquí otros campos requeridos que desees validar
        ) {
          throw new Error("Faltan campos requeridos en los datos del ticket.");
        }
      
        return({
          ...data,
          ticketAlmacenId: data.Almacen.id,
          ticketUsuarioId: data.Usuario.id,
          forma_pago: data.forma_pago.value,
          estado: EstadoTicket.PENDIENTE,
          precio_venta: this.formatNumber(data.valor_total)
        });
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
      tradeName: data.tradeName,
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



}
