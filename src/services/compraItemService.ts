import { DataStore, Predicates } from "aws-amplify";
import { CompraItem, LazyCompraItem } from "../models";
import { BaseService } from "./baseService";

import CustomNotification from "../models/CustomNotification";
import { ICompraItemService } from "./interface/ICompraItemService";
import ProductoService from "./productoService";
import { Estado } from '../models/index';



export default class CompraItemService extends BaseService<CompraItem> implements ICompraItemService {
  
    

    
    constructor() {
      super()
    }


    async getById(id: string): Promise<LazyCompraItem | null> {

          const compraItem = await DataStore.query(CompraItem, id);
          if (!compraItem) {
            throw new CustomNotification("No se pudo obtener el compraItem.", 404);
          }
          return compraItem || null;

    };
      
    async getAll(): Promise<LazyCompraItem[] | null> {
  
        return await DataStore.query(CompraItem);

    } 

    async create(data: any, consecutivo: any): Promise<LazyCompraItem | null> {

  
      console.log(data)

        const compraItem = await DataStore.save(new CompraItem(data))

        if (!compraItem) {
          throw new CustomNotification("CompraItem no registrado.", 404);
        }
        return compraItem;

    }
    async update(id: string, data: any): Promise<LazyCompraItem | null> {

            // Buscar la CompraItem por su ID
            const compraItem = await this.getById(id);
      
            // Verificar si se encontró la CompraItem
            if (!compraItem) {
              throw new CustomNotification("CompraItem no encontrada.", 404);
            }
      
      
            return await DataStore.save(
              CompraItem.copyOf(compraItem, (updated) => {
                //updated.identificacion = Number(data.identificacion) || compraItem.identificacion;
                //updated.nombre_completo = data.nombre_completo?.toUpperCase() || compraItem.nombre_completo;
                //updated.marca = data.marca?.toUpperCase() || compraItem.marca;
                //updated.modelo = data.modelo?.toUpperCase() || compraItem.modelo;
                //updated.color = data.color?.toUpperCase() || compraItem.color;
                //updated.motor = data.motor?.toUpperCase() || compraItem.motor;
                //updated.chasis = data.chasis?.toUpperCase() || compraItem.chasis;
                //updated.placa = data.placa?.toUpperCase() || compraItem.placa;
                //updated.producto = data.producto?.toUpperCase() || compraItem.producto;

              })
            );

    }

    async delete(compraItemId: string): Promise<LazyCompraItem | null> {
  
        // Buscar la CompraItem por su ID
        const compraItem = await this.getById(compraItemId);
  
        // Verificar si se encontró la CompraItem
        if (!compraItem) {
          throw new CustomNotification("CompraItem no encontrada.", 404);
        }
  
  
        // Inactivar la CompraItem y guardar los cambios
        return await DataStore.save(
          CompraItem.copyOf(compraItem, (updated) => {
            updated.cantidad = 0;
            updated.costo_item = 0;
            updated.iva_item = 0;
            updated.total_item = 0;

          })
        );

    }

    //----------------------------------------------------------------------------

    async getItemCompraByCompra(compraId: string): Promise<any> {

      const model_compra = await DataStore.query(CompraItem, (c) =>
        c.and((c) => [
          c.compraItemCompraId.eq(compraId)
        ])
      );

      if(model_compra.length == 0){
        return null;
      }

      return model_compra;
    }


//-----------------------------AYUDADORES---------------------------------------------

        


}
