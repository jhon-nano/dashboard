
import { Estado } from "../models";
import CustomNotification from "../models/CustomNotification";
import InventarioService from "../services/inventarioService";
import { openUpdatePrecio } from "../store/actions/inventarios";
import FormatUtils from "../utils/formatUtils";

export default class InventariosHelpers {


  private notificacion: any;
  private serviceInventario: any;
  private utilsFormat : FormatUtils;
  private dispatch : any;
  private confirm: any;

  constructor(notificacion: any,dispatch: any,confirm: any) {
    this.notificacion = notificacion;
    this.serviceInventario = new InventarioService();
    this.utilsFormat = new FormatUtils();
    this.dispatch = dispatch;
    this.confirm = confirm;
  }


  handleInactivarInventario (id: any) {
    this.confirm({
      title: "Confirma que desea Inactivar el Inventario?",
      description: "Presione el botón CONFIRMAR para INACTIVAR.",
      confirmationText: "CONFIRMAR",
      confirmationButtonProps: {
        variant: "contained",
        color: "primary",
      },
      cancellationText: "CANCELAR",
      cancellationButtonProps: {
        variant: "outlined",
        color: "error",
      },
    })
    .then(async () => {


      const inventario = await this.serviceInventario.delete(id);

      if (inventario !== null) {
        this.notificacion("Inventario Inactivo!", {
          variant: "success",
        });
    
        
    }
    })
    .catch((error: any) => {
      if (error instanceof CustomNotification) {
        // Mostrar notificación de error
        error.showNotification(this.notificacion);
      }else{
        const error_500 = new CustomNotification(error.message,500);
        error_500.showNotification(this.notificacion);
      }
    });


  }

  handleActivarInventario (id: any) {
    this.confirm({
      title: "Confirma que desea Activar el Inventario?",
      description: "Presione el botón CONFIRMAR para INACTIVAR.",
      confirmationText: "CONFIRMAR",
      confirmationButtonProps: {
        variant: "contained",
        color: "primary",
      },
      cancellationText: "CANCELAR",
      cancellationButtonProps: {
        variant: "outlined",
        color: "error",
      },
    })
    .then(async () => {


      const inventario = await this.serviceInventario.activar(id);

      if (inventario !== null) {
        this.notificacion("Inventario Activo!", {
          variant: "success",
        });
    
        
    }
    })
    .catch((error: any) => {
      if (error instanceof CustomNotification) {
        // Mostrar notificación de error
        error.showNotification(this.notificacion);
      }else{
        const error_500 = new CustomNotification(error.message,500);
        error_500.showNotification(this.notificacion);
      }
    });


  }


  onRowAddTableInventario = (newData: any, inventarioProductoId: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
          try {
            console.log(newData)
              const inventarioData = {
                costo: 0,
                inventario: 0,
                precio: Math.floor(newData.precio),
                separado: 0,
                inventarioAlmacenId: newData.inventarioAlmacenId,
                inventarioProductoId: inventarioProductoId,
                estado: Estado.ACTIVO,
              };
              console.log(inventarioData)
              const inventario =  await this.serviceInventario.create(inventarioData)
            
              if (inventario !== null) {
                this.notificacion("Inventario Ingresada!", {
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


  
  onRowUpdateTableInventario = (newData: any, oldData: any): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          
          const formatInventaio = this.utilsFormat.formatInventarioUpdateData(newData);

          const inventario =   await this.serviceInventario.update(oldData.tableData.id, formatInventaio)
          
          if (inventario !== null) {
            this.notificacion("Inventario Actualizado!", {
              variant: "success",
            });
          }
          
          resolve();
        } catch (error: any) {
          console.log(error)
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

  onRowDeleteTableInventario = (oldData: any): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
            
            const inventario =  await this.serviceInventario.delete(oldData.id);
            
            if (inventario !== null) {
              this.notificacion("Inventario Inactivado!", {
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

  onSubmitUpdatePrecio = (precio: any, inventarioID: string) => {

    this.confirm({
      title: "Confirma que desea Ajustar el Precio?",
      description: 'data?.Producto?.nombreProducto',
      confirmationText: "CONFIRMAR",
      confirmationButtonProps: {
        variant: "contained",
        color: "primary",
      },
      cancellationText: "CANCELAR",
      cancellationButtonProps: {
        variant: "outlined",
        color: "error",
      },
    })
    .then(async () => {

       const inventario = await this.serviceInventario.actualizarPrecio(inventarioID, precio);
 
      if(inventario){
        this.notificacion("Precio Actualizado!", {
          variant: "success",
        });
        this.dispatch(openUpdatePrecio(false))
      }

      


 



    })
    .catch((error: any) => {
      //console.log(error)
      if (error instanceof CustomNotification) {
        // Mostrar notificación de error
        error.showNotification(this.notificacion);
      }else{
        const error_500 = new CustomNotification(error.message,500);
        error_500.showNotification(this.notificacion);
      }
    });
  }


  onRowUpdatePrecio = (newData: any, oldData: any): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
            
          const inventario = await this.serviceInventario.actualizarPrecio(oldData.id, newData.precio);
          console.log(inventario)
          if(inventario){
            this.notificacion("Precio Actualizado!", {
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

  onRowAllUpdatePrecio = (changes : any): Promise<void> => {

    return new Promise((resolve, reject) => {
      setTimeout(() => {
          Object.values(changes).map(async (changes: any) => {
            
            const { newData, oldData } =  changes;
            const inventario = await this.serviceInventario.actualizarPrecio(oldData.id, newData.precio);
            console.log(inventario)
            if(inventario){
              this.notificacion("Precio Actualizado!", {
                variant: "success",
              });
            }
              
              resolve();

          } )
          resolve();
      }, 1000);
  });

  };

  onRowAddTableInventarioUbicaciones = (newData: any, inventarioId: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
          try {
   


              const inventario =  await this.serviceInventario.createUbicacion(inventarioId,newData)
            
              if (inventario !== null) {
                this.notificacion("Ubicacion Ingresada!", {
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

  onRowUpdateTableInventarioUbicaciones = (newData: any, oldData: any, inventarioId: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
          try {
   


              const inventario =  await this.serviceInventario.updateUbicacion(inventarioId,newData,oldData)
            
              if (inventario !== null) {
                this.notificacion("Ubicacion Ingresada!", {
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

  onRowDeleteTableInventarioUbicaciones = (oldData: any, inventarioId: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
          try {
            console.log(oldData)


              const inventario =  await this.serviceInventario.deleteUbicacion(inventarioId,oldData)
            
              if (inventario !== null) {
                this.notificacion("Ubicacion Eliminada!", {
                  variant: "error",
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


