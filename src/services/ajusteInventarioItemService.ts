import { DataStore } from "aws-amplify";
import { AjusteInventarioItem, LazyAjusteInventarioItem } from "../models";
import { BaseService } from "./baseService";

import CustomNotification from "../models/CustomNotification";

export interface IAjusteInventarioItemService {

 

}


export default class AjusteInventarioItemItemService extends BaseService<AjusteInventarioItem> implements IAjusteInventarioItemService {
  
    constructor() {
      super()
    }


    async getById(id: string): Promise<LazyAjusteInventarioItem | null> {

          const ajusteInventarioItem = await DataStore.query(AjusteInventarioItem, id);
          if (!ajusteInventarioItem) {
            throw new CustomNotification("No se pudo obtener el ajusteInventarioItem.", 404);
          }
          return ajusteInventarioItem || null;

    };
      
    async getAll(): Promise<LazyAjusteInventarioItem[] | null> {
  
        return await DataStore.query(AjusteInventarioItem);

    } 

    async create(data: any, consecutivo: any): Promise<LazyAjusteInventarioItem | null> {

  


        const ajusteInventarioItem = await DataStore.save(new AjusteInventarioItem(data))

        if (!ajusteInventarioItem) {
          throw new CustomNotification("AjusteInventarioItem no registrado.", 404);
        }
        return ajusteInventarioItem;

    }
    async update(id: string, data: any): Promise<LazyAjusteInventarioItem | null> {

            // Buscar la AjusteInventarioItem por su ID
            const ajusteInventarioItem = await this.getById(id);
      
            // Verificar si se encontró la AjusteInventarioItem
            if (!ajusteInventarioItem) {
              throw new CustomNotification("AjusteInventarioItem no encontrada.", 404);
            }
      
      
            return await DataStore.save(
              AjusteInventarioItem.copyOf(ajusteInventarioItem, (updated) => {
                //updated.identificacion = Number(data.identificacion) || ajusteInventarioItem.identificacion;
                //updated.nombre_completo = data.nombre_completo?.toUpperCase() || ajusteInventarioItem.nombre_completo;
                //updated.marca = data.marca?.toUpperCase() || ajusteInventarioItem.marca;
                //updated.modelo = data.modelo?.toUpperCase() || ajusteInventarioItem.modelo;
                //updated.color = data.color?.toUpperCase() || ajusteInventarioItem.color;
                //updated.motor = data.motor?.toUpperCase() || ajusteInventarioItem.motor;
                //updated.chasis = data.chasis?.toUpperCase() || ajusteInventarioItem.chasis;
                //updated.placa = data.placa?.toUpperCase() || ajusteInventarioItem.placa;
                //updated.producto = data.producto?.toUpperCase() || ajusteInventarioItem.producto;

              })
            );

    }

    async delete(compraItemId: string): Promise<LazyAjusteInventarioItem | null> {
  
        // Buscar la AjusteInventarioItem por su ID
        const ajusteInventarioItem = await this.getById(compraItemId);
  
        // Verificar si se encontró la AjusteInventarioItem
        if (!ajusteInventarioItem) {
          throw new CustomNotification("AjusteInventarioItem no encontrada.", 404);
        }
  
  
        // Inactivar la AjusteInventarioItem y guardar los cambios
        return await DataStore.save(
          AjusteInventarioItem.copyOf(ajusteInventarioItem, (updated) => {
            updated.cantidad = 0;
            updated.total_item = 0;

          })
        );

    }




}
