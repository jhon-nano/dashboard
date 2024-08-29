import { DataStore } from "aws-amplify";
import moment from "moment";
import { Almacen, Auditoria, CarteraProveedores, Compra, Estado, LazyCompra, LazyConsecutivo, LazyUsuario } from "../models";
import CustomNotification from "../models/CustomNotification";
import FormatUtils from "../utils/formatUtils";
import { BaseService } from "./baseService";
import ConsecutivoService from "./consecutivoServices";
import TerceroService from "./terceroService";
import AlmacenService from "./almacenService";
import UsuarioService from "./usuarioService";


export interface ICompraService {

  getCompraByNumeroFacturaAndTercero(numero_factura: string, terceroId: string): Promise<any | null>;
  updateCompraRevisada(id: string, data: LazyUsuario): Promise<LazyCompra | null>;
  updateCompraCheckGrabada(id: string): Promise<LazyCompra | null>;
  updateCompraCheckContabilizada(id: string): Promise<LazyCompra | null>;
  updateCompraCheckCompletada(id: string): Promise<LazyCompra | null>;
  updateCompraPDF(id: string, key: string): Promise<LazyCompra | null>;
}

export default class CompraService extends BaseService<Compra> implements ICompraService {



  private serviceConsecutivo: ConsecutivoService;
  private serviceTercero: TerceroService;
  private serviceAlmacen: AlmacenService;
  private serviceUsuario: UsuarioService;
  private utilsFormat: FormatUtils;
  

  constructor() {
    super()

    this.serviceConsecutivo = new ConsecutivoService();
    this.serviceTercero = new TerceroService();
    this.serviceAlmacen = new AlmacenService();
    this.serviceUsuario = new UsuarioService();
    this.utilsFormat = new FormatUtils();
  }


  async getById(id: string): Promise<LazyCompra | null> {

      const compra = await DataStore.query(Compra, id);
    
      if (!compra) {
        throw new CustomNotification("No se pudo obtener la compra.", 404);
      }

      return compra;

  }

  async getAll(): Promise<LazyCompra[] | null> {
      
        return await DataStore.query(Compra);

  }

  async create(data: any, consecutivo: LazyConsecutivo): Promise<LazyCompra | null> {
  

      const tercero = await this.serviceTercero.getById(data.Tercero.id)

      if (!tercero) {
        throw new CustomNotification("Error Tercero.", 404);
      }

      const almacen = await this.serviceAlmacen.getById(data.Almacen.id)

      if (!almacen) {
        throw new CustomNotification("Error Almacen.", 404);
      }

      const usuario = await this.serviceUsuario.getById(data.Usuario.id)

      if (!usuario) {
        throw new CustomNotification("Error Usuario.", 404);
      }







      const numeracion: any = await this.serviceConsecutivo.updateConsecutivo(consecutivo.id);

      if (!consecutivo) {
        throw new CustomNotification("Error Consecutivo.", 404);
      }


      const compraData = new Compra({
        ...data,
        consecutivo: numeracion.consecutivo,
        Tercero: tercero,
        compraTerceroId: tercero.id,
        Almacen: almacen,
        compraAlmacenId: almacen.id,
        Usuario: usuario,
        compraUsuarioId: usuario.id,
        estado: Estado.ACTIVO
      })

      if(!compraData) {
        throw new CustomNotification("Error Compra.", 404);
      }
      

      const compra = await DataStore.save(compraData)

      if (!compra) {
        throw new CustomNotification("Compra no registrada.", 404);
      }

      return compra;

  }
  async update(id: string, data: LazyCompra): Promise<LazyCompra | null> {
    
      const compra = await DataStore.query(Compra, id);

      if (!compra) {
        throw new CustomNotification("Compra no encontrada.", 404);
      }

      const terceroID  = data.compraTerceroId || ''

      const tercero = await this.serviceTercero.getById(terceroID);

      if (!tercero) {
        throw new CustomNotification("Error Tercero.", 404);
      }

      return await DataStore.save(
        Compra.copyOf(compra, (updated) => {
          updated.numero_factura = data.numero_factura || compra.numero_factura;
          updated.fecha_compra = data.fecha_compra || compra.fecha_compra;
          updated.fecha_recibido =  data.fecha_recibido ? data.fecha_recibido : null;
          updated.fecha_vencimiento = data.fecha_vencimiento ? data.fecha_vencimiento : null;
          updated.forma_pago = data.forma_pago || compra.forma_pago;
          updated.Tercero = tercero || data.Tercero;
          updated.compraTerceroId = tercero.id || compra.compraTerceroId;
          updated.observaciones = data.observaciones || compra.observaciones;
          updated.subtotal = data.subtotal || compra.subtotal;
          updated.iva = data.iva || compra.iva;
          updated.retencion = data.retencion || compra.retencion;
          updated.total = data.total || compra.total;
          updated.grabado = data.grabado || compra.grabado;
          updated.compraUsuarioId = data.compraUsuarioId || compra.compraUsuarioId;
          updated.compraTerceroId = tercero.id || compra.compraTerceroId;
          updated.estado = Estado.ACTIVO;
        })
      );

  }

  async delete(id: string): Promise<LazyCompra | null> {
       
    const compra = await DataStore.query(Compra, id);

    if (!compra) {
      throw new CustomNotification("Compra no encontrada.", 404);
    }

    return await DataStore.save(
      Compra.copyOf(compra, (updated) => {
        updated.numero_factura = 'A-' + updated.numero_factura;
        updated.subtotal = 0;
        updated.iva = 0;
        updated.retencion = 0;
        updated.total = 0;
        updated.estado = Estado.INACTIVO;
      })
    );
  }

  //---------------------------------------------------------------------------------

  async getCompraByNumeroFacturaAndTercero(numero_factura: string, terceroId: string): Promise<any> {

      const model_compra = await DataStore.query(Compra, (c) =>
        c.and((c) => [
          c.numero_factura.eq(numero_factura.toUpperCase()),
          c.compraTerceroId.eq(terceroId),
        ])
      );

      if(model_compra.length == 0){
        return null;
      }

      return model_compra;

    
  }

  async updateCompraRevisada(id: string, data: LazyUsuario): Promise<LazyCompra | null> {
   
      const compra: LazyCompra | undefined = await DataStore.query(Compra, id);

      if (!compra) {
        throw new CustomNotification("Compra no encontrada.", 404);
      }

      const auditoria = new Auditoria({fecha: moment().format(), UsuarioID: data.id})
      //console.log(compra.Revisados)
      let Revisado: (Auditoria | null)[] | null = []
      //console.log(Revisado)
      if (compra.Revisados == null) {
        Revisado.push(auditoria);
      } else {
        Revisado = compra.Revisados.concat(auditoria); // Concatena y asigna el nuevo array a Revisado
      }
      
      //console.log(Revisado)
      return await DataStore.save(
        Compra.copyOf(compra, (updated) => {
          updated.Revisados =
          Revisado || compra.Revisados;

          updated.estado = Estado.ACTIVO;
        })
      );

  }

  async updateCompraCheckGrabada(id: string): Promise<LazyCompra | null> {

      const compra = await DataStore.query(Compra, id);

      if (!compra) {
        throw new CustomNotification("Compra no encontrada.", 404);
      }


   
      return await DataStore.save(
        Compra.copyOf(compra, (updated) => {
          updated.grabado = !compra.grabado;
        })
      );

  }

  async updateCompraCheckContabilizada(id: string): Promise<LazyCompra | null> {
  
      const compra = await DataStore.query(Compra, id);

      if (!compra) {
        throw new CustomNotification("Compra no encontrada.", 404);
      }


   
      return await DataStore.save(
        Compra.copyOf(compra, (updated) => {
          updated.contabilizado = !compra.contabilizado;
        })
      );

  }

  async updateCompraCheckCompletada(id: string): Promise<LazyCompra | null> {

      const compra = await DataStore.query(Compra, id);

      if (!compra) {
        throw new CustomNotification("Compra no encontrada.", 404);
      }


   
      return await DataStore.save(
        Compra.copyOf(compra, (updated) => {
          updated.revisado = !compra.revisado;
        })
      );

  }

  async updateCompraPDF(id: string, key: string): Promise<LazyCompra | null> {

      const compra = await DataStore.query(Compra, id);

      if (!compra) {
        throw new CustomNotification("Compra no encontrada.", 404);
      }


   
      return await DataStore.save(
        Compra.copyOf(compra, (updated) => {
          updated.archivoPDF = key;
        })
      );

  }

  async getCompraByCartera(compraID: string): Promise<any> {

    const model_compra = await DataStore.query(CarteraProveedores, (c) =>
      c.and((c) => [
        c.carteraProveedoresCompraId.eq(compraID)
      ])
    );

    return model_compra;

  
}

}

