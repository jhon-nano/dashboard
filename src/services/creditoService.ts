import { DataStore } from "aws-amplify";
import { CommentarioSolicitud, EstadoCredito, LazyCommentarioSolicitud, LazySolicitudCredito, SolicitudCredito } from "../models";
import { BaseService } from "./baseService";

import CustomNotification from "../models/CustomNotification";

import moment from "moment";
import ConsecutivoService from './consecutivoServices';
import ProductoService from "./productoService";


interface ICreditoService  {


  }



export default class CreditoService extends BaseService<SolicitudCredito> implements ICreditoService {
  

    private serviceProductos: any;
    private serviceConsecutivo: any;
    
    constructor() {
      super()
 
      this.serviceProductos = new ProductoService();
      this.serviceConsecutivo = new ConsecutivoService()
    }


    async getById(id: string): Promise<LazySolicitudCredito | null> {

          const credito = await DataStore.query(SolicitudCredito, id);
          if (!credito) {
            throw new CustomNotification("No se pudo obtener el credito.", 404);
          }
          return credito || null;

    };
      
    async getAll(): Promise<LazySolicitudCredito[] | null> {

        return await DataStore.query(SolicitudCredito);

    } 

    async create(data: any): Promise<LazySolicitudCredito | null> {
      

        const credito = await DataStore.save(new SolicitudCredito(data))

        if (!credito) {
          throw new CustomNotification("Solicitud Credito no registrado.", 404);
        }

        const numeracion = await this.serviceConsecutivo.updateConsecutivo(data.Consecutivo.id);
        if (!numeracion) {
          throw new CustomNotification("Error Consecutivo.", 404);
        }

        return credito;

    }

    async update(id: string, data: any): Promise<LazySolicitudCredito | null> {
        
            // Buscar la Credito por su ID
            const credito = await this.getById(id);
      
            // Verificar si se encontró la Credito
            if (!credito) {
              throw new CustomNotification("Credito no encontrada.", 404);
            }
      
      
            return await DataStore.save(
              SolicitudCredito.copyOf(credito, (updated) => {

                updated.cliente = data.cliente || credito.cliente;
                updated.codeudor = data.codeudor || credito.codeudor;
                updated.segundo_codeudor = data.segundo_codeudor || credito.segundo_codeudor;

                updated.relacion_credito = data.relacion_credito || credito.relacion_credito;
                updated.articulo = data.articulo || credito.articulo;
                updated.valor_articulo = data.valor_articulo || credito.valor_articulo;
                updated.inicial = data.inicial || credito.inicial;
                updated.cuotas = data.cuotas || credito.cuotas;
                updated.valor_cuota = data.valor_cuota || credito.valor_cuota;


                updated.solicitudCreditoClienteId = data.solicitudCreditoClienteId || credito.solicitudCreditoClienteId;
                updated.solicitudCreditoCodeudorId = data.solicitudCreditoCodeudorId || credito.solicitudCreditoCodeudorId;
                updated.solicitudCreditoSegundoCodeudorId = data.solicitudCreditoSegundoCodeudorId || credito.solicitudCreditoSegundoCodeudorId;







              })
            );

    }

    async delete(creditoId: string): Promise<LazySolicitudCredito | null> {
      
        // Buscar la Credito por su ID
        const credito = await this.getById(creditoId);
  
        // Verificar si se encontró la Credito
        if (!credito) {
          throw new CustomNotification("Credito no encontrada.", 404);
        }
  
        // Buscar Productos asociados a la Credito
        const creditos = await this.serviceProductos.getProductosByCreditoId(creditoId);
  
        // Verificar si hay Productos asociados
        if (creditos.length > 0) {
          throw new CustomNotification(
            "No se puede inactivar la credito porque hay productos asociados.",
            409,
            { creditosAsociadas: creditos }
          );
        }
  
        // Inactivar la Credito y guardar los cambios
        return await DataStore.save(
          SolicitudCredito.copyOf(credito, (updated) => {
            updated.estado = EstadoCredito.ANULADO;
          })
        );

    }

    //----------------------------------------------------------------------------

    async createComentario(data: any): Promise<LazyCommentarioSolicitud | null> {
      

        const comentario = await DataStore.save(new CommentarioSolicitud(data))

        if (!comentario) {
          throw new CustomNotification("Comentario no registrado.", 404);
        }

        return comentario;

    }


    async updateCredito(id: string, data: any): Promise<LazySolicitudCredito | null> {
        
            // Buscar la Credito por su ID
            const credito = await this.getById(id);
      
            // Verificar si se encontró la Credito
            if (!credito) {
              throw new CustomNotification("Credito no encontrada.", 404);
            }
      
      
            return await DataStore.save(
              SolicitudCredito.copyOf(credito, (updated) => {

              })
            );

    }

    async updateCreditoPendiente(id: string, data: any): Promise<LazySolicitudCredito | null> {
      
          // Buscar la Credito por su ID
          const credito = await this.getById(id);
    
          // Verificar si se encontró la Credito
          if (!credito) {
            throw new CustomNotification("Credito no encontrada.", 404);
          }
    
    
          return await DataStore.save(
            SolicitudCredito.copyOf(credito, (updated) => {

            })
          );

    }

    async updateCreditoRevisado(id: string, usuario: any): Promise<LazySolicitudCredito | null> {
    
      
      //console.log(id,usuario)
        // Buscar la Credito por su ID
        const credito = await this.getById(id);

        // Verificar si se encontró la Credito
        if (!credito) {
          throw new CustomNotification("Credito no encontrada.", 404);
        }


        return await DataStore.save(
          SolicitudCredito.copyOf(credito, (updated) => {
            updated.solicitudCreditoUsuarioRevisadoId = 
            usuario.id || credito.solicitudCreditoUsuarioRevisadoId;
            updated.fecha_revisado =
            moment().format() || credito.fecha_revisado;
            updated.estado = EstadoCredito.REVISADO;
          })
        );

    }

    async updateCreditoAutorizar(id: string, usuario: any): Promise<LazySolicitudCredito | null> {
        
            // Buscar la Credito por su ID
            const credito = await this.getById(id);

            // Verificar si se encontró la Credito
            if (!credito) {
              throw new CustomNotification("Credito no encontrada.", 404);
            }


            return await DataStore.save(
              SolicitudCredito.copyOf(credito, (updated) => {
                updated.solicitudCreditoUsuarioAutorizadoId = 
                usuario.id || credito.solicitudCreditoUsuarioAutorizadoId;
                updated.fecha_autorizado =
                moment().format() || credito.fecha_autorizado;
                updated.estado = EstadoCredito.AUTORIZADO;
              })
            );

    }
    async updateCreditoRechazar(id: string, usuario: any): Promise<LazySolicitudCredito | null> {
      
          // Buscar la Credito por su ID
          const credito = await this.getById(id);

          // Verificar si se encontró la Credito
          if (!credito) {
            throw new CustomNotification("Credito no encontrada.", 404);
          }


          return await DataStore.save(
            SolicitudCredito.copyOf(credito, (updated) => {
              updated.estado = EstadoCredito.RECHAZADO;
            })
          );

  }
  async updateCreditoAnulado(id: string, usuario: any): Promise<LazySolicitudCredito | null> {
    
        // Buscar la Credito por su ID
        const credito = await this.getById(id);

        // Verificar si se encontró la Credito
        if (!credito) {
          throw new CustomNotification("Credito no encontrada.", 404);
        }


        return await DataStore.save(
          SolicitudCredito.copyOf(credito, (updated) => {
            updated.estado = EstadoCredito.ANULADO;
          })
        );

}
    //-----------------------------AYUDADORES---------------------------------------------

        
    formatStringToUpperCase = (str: string) => {
      if (str == undefined) str = "";
    
      return typeof str === "string" ? str.toUpperCase() : str;
    };
    removeSpacesUpperCase(cadena: string | any): string {
      return this.formatStringToUpperCase(cadena).replace(/\s+$/, "");
    }

}
