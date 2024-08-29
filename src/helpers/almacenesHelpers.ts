import { useConfirm } from "material-ui-confirm";
import { useSnackbar } from "notistack";

import { Estado, Almacen } from "../models";
import AlmacenService from "../services/almacenService";
import CustomNotification from "../models/CustomNotification";

export default class AlmacenesHelpers {


  private notificacion: any;
  private serviceAlmacen: any;

  
  constructor(notificacion: any) {
    this.notificacion = notificacion;
    this.serviceAlmacen = new AlmacenService();


  }


  onRowAddTableAlmacen = (newData: any): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
          try {

              const almacenData = new Almacen({
                codigo: newData.codigo,
                nit: newData.nit,
                nombreAlmacen: newData.nombreAlmacen,
                direccion: newData.direccion,
                telefono: newData.telefono,
                ciudad: newData.ciudad,
                estado: Estado.ACTIVO,
              });
            
              const almacen =   await this.serviceAlmacen.create(almacenData)
            
              if (almacen !== null) {
                this.notificacion("Almacen Ingresada!", {
                  variant: "success",
                }); 
              }
              resolve();
            } catch (error: any) {
              reject()
              if (error instanceof CustomNotification) {
                // Mostrar notificación de error
                error.showNotification(this.notificacion);
              }else{
                const error_500 = new CustomNotification(error.message,500);
                error_500.showNotification(this.notificacion);
              }
              return null
            }
      }, 1000);
      })
  };

  onRowUpdateTableAlmacen = (newData: any, oldData: any): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          
          const almacen =   await this.serviceAlmacen.update(oldData.tableData.id, newData)
          
          if (almacen !== null) {
            this.notificacion("Almacen Actualizada!", {
              variant: "success",
            });
          }
          
          resolve();
        } catch (error: any) {
          reject()
          if (error instanceof CustomNotification) {
            // Mostrar notificación de error
            error.showNotification(this.notificacion);
          }else{
            const error_500 = new CustomNotification(error.message,500);
            error_500.showNotification(this.notificacion);
          }
            return null
          }
      }, 1000);
    })
  };

  onRowDeleteTableAlmacen = (oldData: any): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
            
            const almacen =  await this.serviceAlmacen.delete(oldData.id);
            
            if (almacen !== null) {
              this.notificacion("Almacen Inactivado!", {
                variant: "success",
              });
            }
            
            resolve();
        } catch (e: any) {
            console.error(e)
            reject()
            this.notificacion(e.message, {
                variant: "error",
            })
        }
      }, 1000);
    })
  };


  onRowAddTableAlmacenCaja = (newData: any, inventarioId: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
          try {
   


              const inventario =  await this.serviceAlmacen.createCaja(inventarioId,newData)
            
              if (inventario !== null) {
                this.notificacion("Caja Ingresada!", {
                  variant: "success",
                         }); 
               }
              resolve();
            } catch (error: any) {
              reject()
              if (error instanceof CustomNotification) {
                // Mostrar notificación de error
                error.showNotification(this.notificacion);
              }else{
                const error_500 = new CustomNotification(error.message,500);
                error_500.showNotification(this.notificacion);
              }
              return null
            }
      }, 1000);
      })
  };

  onRowUpdateTableAlmacenCaja = (newData: any, oldData: any, inventarioId: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
          try {
   


              const inventario =  await this.serviceAlmacen.updateCaja(inventarioId,newData,oldData)
            
              if (inventario !== null) {
                this.notificacion("Caja Ingresada!", {
                  variant: "success",
                         }); 
               }
              resolve();
            } catch (error: any) {
              reject()
              if (error instanceof CustomNotification) {
                // Mostrar notificación de error
                error.showNotification(this.notificacion);
              }else{
                const error_500 = new CustomNotification(error.message,500);
                error_500.showNotification(this.notificacion);
              }
              return null
            }
      }, 1000);
      })
  };





}


