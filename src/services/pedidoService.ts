import { DataStore } from "aws-amplify";
import { Estado, LazyConsecutivo, LazyPedido, Pedido, PedidoItem, TipoPedidos } from "../models";
import { BaseService } from "./baseService";

import CustomNotification from "../models/CustomNotification";
import { IPedidoService } from "./interface/IPedidoService";
import ConsecutivoService from "./consecutivoServices";
import TerceroService from "./terceroService";
import moment from "moment";


export default class PedidoService extends BaseService<Pedido>  implements IPedidoService {


  private serviceConsecutivo: ConsecutivoService;
  private serviceTercero: TerceroService;

  

  constructor() {
    super()

    this.serviceConsecutivo = new ConsecutivoService();
    this.serviceTercero = new TerceroService();

  }



  async create(data: any, consecutivo: LazyConsecutivo): Promise<LazyPedido | null> {
   
    let numeracion: any = 0

    if(data.tipo_pedido !== TipoPedidos.SEPARADO){
      const Consecutivo = await this.serviceConsecutivo.updateConsecutivo(consecutivo.id);
      numeracion = Consecutivo?.consecutivo
    }



    if (!consecutivo) {
      throw new CustomNotification("Error Consecutivo.", 404);
    }


    const pedido = await DataStore.save(new Pedido({
      fecha_pedido: data.fecha_pedido,
      observaciones: data.observaciones,
      tipo_pedido: data.tipo_pedido,
      forma_pago: data.forma_pago,
      total: data.total,
      cambio: data.cambio,
      iva: data.iva,
      subtotal: data.subtotal,
      consecutivo: numeracion,
      pedidoTerceroId: data.Tercero.id,
      pedidoAlmacenId: data.Almacen.id,
      pedidoUsuarioId: data.Usuario.id,
      estado: Estado.ACTIVO
    }))

    if (!pedido) {
      throw new CustomNotification("Pedido no registrado.", 404);
    }

    return pedido;
}


    async update(id: string, data: LazyPedido): Promise<LazyPedido | null> {
        
            // Buscar la Categoria por su ID
            const pedido = await this.getById(id);
      
            // Verificar si se encontró la Categoria
            if (!pedido) {
              throw new CustomNotification("Pedido no encontrado.", 404);
            }
      

            
            return await DataStore.save(
              Pedido.copyOf(pedido, (updated) => {
                updated.consecutivo = data.consecutivo || pedido.consecutivo;
                updated.fecha_pedido = moment(data.fecha_pedido).format() || pedido.fecha_pedido;
                updated.forma_pago = data.forma_pago || pedido.forma_pago;
                updated.tipo_pedido = data.tipo_pedido || pedido.tipo_pedido;
                updated.subtotal = data.subtotal ;
                updated.observaciones = data.observaciones || pedido.observaciones;
                updated.iva = data.iva ;
                updated.total = data.total ;
                updated.cambio = data.cambio;
                updated.estado = Estado.ACTIVO;
              })
            );

    }

    async getById(id: string): Promise<LazyPedido | null> {

            const pedido = await DataStore.query(Pedido, id);
            if (!pedido) {
              throw new CustomNotification("No se pudo obtener el categoria.", 404);
            }
            return pedido ;

    }

    async getAll(): Promise<LazyPedido[] | null> {

            return await DataStore.query(Pedido);

    }
    async delete(id: string): Promise<LazyPedido | null> {

            // Buscar la Categoria por su ID
            const pedido = await this.getById(id);
      
            // Verificar si se encontró la Categoria
            if (!pedido) {
              throw new CustomNotification("Pedido no encontrado.", 404);
            }
      
 
            // Inactivar la Categoria y guardar los cambios
            return await DataStore.save(
              Pedido.copyOf(pedido, (updated) => {
                updated.subtotal = 0;
                updated.iva = 0;
                updated.total = 0;
                updated.estado = Estado.INACTIVO;
              })
            );

    }

   
    //-----------------------------------------------------------------------------------





   
    //-----------------------------------------------------------------------------------

        
    formatStringToUpperCase = (str: string) => {
      if (str == undefined) str = "";
    
      return typeof str === "string" ? str.toUpperCase() : str;
    };
    removeSpacesUpperCase(cadena: string | any): string {
      return this.formatStringToUpperCase(cadena).replace(/\s+$/, "");
    }

}
