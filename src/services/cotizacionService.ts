import { DataStore } from "aws-amplify";
import { Cotizacion, Estado, LazyConsecutivo, LazyCotizacion } from "../models";
import { BaseService } from "./baseService";

import CustomNotification from "../models/CustomNotification";
import ConsecutivoService from "./consecutivoServices";
import { ICotizacionService } from "./interface/ICotizacionService";
import TerceroService from "./terceroService";


export default class CotizacionService extends BaseService<Cotizacion>  implements ICotizacionService {


  private serviceConsecutivo: ConsecutivoService;
  private serviceTercero: TerceroService;

  

  constructor() {
    super()

    this.serviceConsecutivo = new ConsecutivoService();
    this.serviceTercero = new TerceroService();

  }



  async create(data: any, consecutivo: LazyConsecutivo): Promise<LazyCotizacion | null> {
   
    const numeracion: any = await this.serviceConsecutivo.updateConsecutivo(consecutivo.id);

    if (!consecutivo) {
      throw new CustomNotification("Error Consecutivo.", 404);
    }


    const cotizacion = await DataStore.save(new Cotizacion({
        ...data,
      consecutivo: numeracion.consecutivo,


    }))

    if (!cotizacion) {
      throw new CustomNotification("Cotizacion no registrado.", 404);
    }

    return cotizacion;
}


    async update(id: string, data: LazyCotizacion): Promise<LazyCotizacion | null> {
   
            // Buscar la Categoria por su ID
            const cotizacion = await this.getById(id);
      
            // Verificar si se encontró la Categoria
            if (!cotizacion) {
              throw new CustomNotification("Cotizacion no encontrado.", 404);
            }
      

            
            return await DataStore.save(
              Cotizacion.copyOf(cotizacion, (updated) => {
                updated.cliente = data.cliente;
                updated.productos = data.productos;
                updated.total = data.total;
                updated.estado = Estado.ACTIVO;
              })
            );

    }

    async getById(id: string): Promise<LazyCotizacion | null> {

            const cotizacion = await DataStore.query(Cotizacion, id);
            if (!cotizacion) {
              throw new CustomNotification("No se pudo obtener el categoria.", 404);
            }
            return cotizacion ;

    }

    async getAll(): Promise<LazyCotizacion[] | null> {

            return await DataStore.query(Cotizacion);

    }

    async delete(id: string): Promise<LazyCotizacion | null> {

            // Buscar la Categoria por su ID
            const cotizacion = await this.getById(id);
      
            // Verificar si se encontró la Categoria
            if (!cotizacion) {
              throw new CustomNotification("Cotizacion no encontrado.", 404);
            }

            // Inactivar la Categoria y guardar los cambios
            return await DataStore.save(
              Cotizacion.copyOf(cotizacion, (updated) => {
                updated.estado = Estado.INACTIVO;
              })
            );

    }


}
