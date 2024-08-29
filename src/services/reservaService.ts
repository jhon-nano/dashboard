import { DataStore } from "aws-amplify";
import { Estado,  LazyLevantamientoReserva,  LevantamientoReserva } from "../models";
import { BaseService } from "./baseService";

import { useSnackbar } from "notistack";
import CustomNotification from "../models/CustomNotification";
import { IReservaService } from "./interface/IReservaService";
import ProductoService from "./productoService";
import ConsecutivoService from './consecutivoServices';


export default class ReservaService extends BaseService<LevantamientoReserva> implements IReservaService {
  
   
    private serviceProductos: any;
    private serviceConsecutivo: any;
    
    constructor() {
      super()

      this.serviceProductos = new ProductoService();
      this.serviceConsecutivo = new ConsecutivoService()
    }


    async getById(id: string): Promise<LazyLevantamientoReserva | null> {

          const reserva = await DataStore.query(LevantamientoReserva, id);
          if (!reserva) {
            throw new CustomNotification("No se pudo obtener el reserva.", 404);
          }
          return reserva || null;

    };
      
    async getAll(): Promise<LazyLevantamientoReserva[] | null> {

        return await DataStore.query(LevantamientoReserva);
    
    } 

    async create(data: any, consecutivo: any): Promise<LazyLevantamientoReserva | null> {
      

        

        const numeracion = await this.serviceConsecutivo.updateConsecutivo(consecutivo.id);
        if (!consecutivo) {
          throw new CustomNotification("Error Consecutivo.", 404);
        }
        const reserva = await DataStore.save(new LevantamientoReserva({
          ...data,
          consecutivo: numeracion.consecutivo
        }))

        if (!reserva) {
          throw new CustomNotification("LevantamientoReserva no registrado.", 404);
        }
        return reserva;
      
    }
    async update(id: string, data: any): Promise<LazyLevantamientoReserva | null> {
       
            // Buscar la Reserva por su ID
            const reserva = await this.getById(id);
      
            // Verificar si se encontró la Reserva
            if (!reserva) {
              throw new CustomNotification("Reserva no encontrada.", 404);
            }
      
      
            return await DataStore.save(
              LevantamientoReserva.copyOf(reserva, (updated) => {
                updated.identificacion = Number(data.identificacion) || reserva.identificacion;
                updated.nombre_completo = data.nombre_completo?.toUpperCase() || reserva.nombre_completo;
                updated.marca = data.marca?.toUpperCase() || reserva.marca;
                updated.modelo = data.modelo?.toUpperCase() || reserva.modelo;
                updated.color = data.color?.toUpperCase() || reserva.color;
                updated.motor = data.motor?.toUpperCase() || reserva.motor;
                updated.chasis = data.chasis?.toUpperCase() || reserva.chasis;
                updated.placa = data.placa?.toUpperCase() || reserva.placa;
                updated.producto = data.producto?.toUpperCase() || reserva.producto;

              })
            );
        
    }

    async delete(reservaId: string): Promise<LazyLevantamientoReserva | null> {
   
        // Buscar la Reserva por su ID
        const reserva = await this.getById(reservaId);
  
        // Verificar si se encontró la Reserva
        if (!reserva) {
          throw new CustomNotification("Reserva no encontrada.", 404);
        }
  
        // Buscar Productos asociados a la Reserva
        const reservas = await this.serviceProductos.getProductosByReservaId(reservaId);
  
        // Verificar si hay Productos asociados
        if (reservas.length > 0) {
          throw new CustomNotification(
            "No se puede inactivar la reserva porque hay productos asociados.",
            409,
            { reservasAsociadas: reservas }
          );
        }
  
        // Inactivar la Reserva y guardar los cambios
        return await DataStore.save(
          LevantamientoReserva.copyOf(reserva, (updated) => {
            updated.nombre_completo = Estado.INACTIVO;
          })
        );
     
    }

    //----------------------------------------------------------------------------



//-----------------------------AYUDADORES---------------------------------------------

        
    formatStringToUpperCase = (str: string) => {
      if (str == undefined) str = "";
    
      return typeof str === "string" ? str.toUpperCase() : str;
    };
    removeSpacesUpperCase(cadena: string | any): string {
      return this.formatStringToUpperCase(cadena).replace(/\s+$/, "");
    }

}
