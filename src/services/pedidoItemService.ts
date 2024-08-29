import { DataStore } from "aws-amplify";
import { PedidoItem, LazyPedidoItem, Estado, TipoPedidos } from "../models";
import { BaseService } from "./baseService";

import CustomNotification from "../models/CustomNotification";
import InventarioService from "./inventarioService";




export default class PedidoItemService extends BaseService<PedidoItem>  {
  
    

  private serviceInventario: any;

    constructor() {
      super()
      this.serviceInventario = new InventarioService();
    }


    async getById(id: string): Promise<LazyPedidoItem | null> {

          const pedidoItem = await DataStore.query(PedidoItem, id);
          if (!pedidoItem) {
            throw new CustomNotification("No se pudo obtener el pedidoItem.", 404);
          }
          return pedidoItem || null;

    };
      
    async getAll(): Promise<LazyPedidoItem[] | null> {
  
        return await DataStore.query(PedidoItem);

    } 

    async create(data: any): Promise<LazyPedidoItem | null> {

   


        const pedidoItem = await DataStore.save(new PedidoItem(data))

        if (!pedidoItem) {
          throw new CustomNotification("PedidoItem no registrado.", 404);
        }
        return pedidoItem;

    }
    async update(id: string, data: any): Promise<LazyPedidoItem | null> {

            // Buscar la PedidoItem por su ID
            const pedidoItem = await this.getById(id);
      
            // Verificar si se encontró la PedidoItem
            if (!pedidoItem) {
              throw new CustomNotification("PedidoItem no encontrada.", 404);
            }
      
      
            return await DataStore.save(
              PedidoItem.copyOf(pedidoItem, (updated) => {
                updated.consecutivo = data.consecutivo || pedidoItem.consecutivo;
              })
            );

    }

    async delete(compraItemId: string): Promise<LazyPedidoItem | null> {
  
        // Buscar la PedidoItem por su ID
        const pedidoItem = await this.getById(compraItemId);
  
        // Verificar si se encontró la PedidoItem
        if (!pedidoItem) {
          throw new CustomNotification("PedidoItem no encontrada.", 404);
        }
  
          // Buscar la PedidoItem por su ID
          const Pedido = await pedidoItem.Pedido;

           
        if(Pedido?.tipo_pedido !== TipoPedidos.SEPARADO){
          const cantidad = Number(pedidoItem.cantidad)
          await this.serviceInventario.actualizarSaldoInventario(pedidoItem.pedidoItemAlmacenId, pedidoItem.pedidoItemProductoId, cantidad )           
        } else{
          const cantidad = Number(pedidoItem.cantidad) 
         await this.serviceInventario.actualizarSeparadoInventario(pedidoItem.pedidoItemAlmacenId, pedidoItem.pedidoItemProductoId, cantidad )          
        }   
        // Inactivar la PedidoItem y guardar los cambios
        return await DataStore.save(
          PedidoItem.copyOf(pedidoItem, (updated) => {
            updated.cantidad = 0;
            updated.costo_item = 0;
            updated.iva_item = 0;
            updated.total_item = 0;
            updated.estado = Estado.INACTIVO
          })
        );

    }

    //----------------------------------------------------------------------------


    async getItemPedidoByPedido(pedidoId: string): Promise<any> {

      const model_pedido = await DataStore.query(PedidoItem, (c) =>
        c.and((c) => [
          c.pedidoItemPedidoId.eq(pedidoId)
        ])
      );

      if(model_pedido.length == 0){
        return null;
      }

      return model_pedido;

    
  }


//-----------------------------AYUDADORES---------------------------------------------

        


}
