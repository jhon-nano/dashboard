import { CarteraProveedores, Compra, CompraItem } from "../models";
import CustomNotification from "../models/CustomNotification";
import CarteraProveedoresServices from "../services/carteraProveedoresServices";

import CompraItemService from "../services/compraItemService";
import CompraService from "../services/compraService";
import InventarioService from "../services/inventarioService";
import TerceroService from "../services/terceroService";
import { openFinalizarCompra } from "../store/actions/compras";
import TypesCompra from "../types/typesCompra";
import FormatUtils from "../utils/formatUtils";

export default class ComprasHelpers {

  private moduloCompras: TypesCompra;
  private confirm: any;
  private notificacion: any;
  private serviceCompra: any;
  private serviceCompraItem: any;
  private serviceCarteraProveedores: CarteraProveedoresServices;
  private serviceTercero: any;
  private serviceInventario: any;
  private utilsFormat : FormatUtils;
  private store: any;
  private dispatch : any;

  constructor(store: any,confirm: any,notificacion: any,router:any,dispatch: any) {
    this.store = store;
    this.confirm = confirm;
    this.notificacion = notificacion;
    this.moduloCompras = new TypesCompra(router);
    this.serviceTercero = new TerceroService();
    this.serviceCompra = new CompraService();
    this.serviceCompraItem = new CompraItemService();
    this.serviceCarteraProveedores = new CarteraProveedoresServices(CarteraProveedores);
    this.serviceInventario = new InventarioService();
    this.utilsFormat = new FormatUtils();
    this.dispatch = dispatch;
  }


  
  onSubmitCreateCompra = async (data: any) => {

    console.log(data)

    this.confirm({
      title: "Confirma que desea Ingresar la Compra?",
      description: "Presione el botón CONFIRMAR para INGRESAR.",
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
      try {
        
        if (data.items.length == 0) {
          throw new CustomNotification("La compra debe tener productos para Ingresar.", 404);
        }  
  

            // Utilizamos reduce para agrupar y realizar las operaciones necesarias
        const productosAgrupados = await data.items.reduce((acumulador: any, producto: any) => {
          const idProducto = producto.Producto.value;
          if (!acumulador[idProducto]) {
              // Si el producto aún no está en el acumulador, lo inicializamos
              acumulador[idProducto] = {
                  ...producto,
                  cantidadItem: Number(producto.cantidadItem),
                  totalItem: producto.totalItem,
                  costoItem: Number(producto.costoItem ) * Number(producto.cantidadItem),
                  precio: producto.precio * Number(producto.cantidadItem),
                  ivaItem: producto.ivaItem
              };
          } else {
              // Si el producto ya está en el acumulador, sumamos las cantidades y totales
              acumulador[idProducto].cantidadItem += Number(producto.cantidadItem);
              acumulador[idProducto].totalItem += producto.totalItem;
              acumulador[idProducto].ivaItem += producto.ivaItem;
              acumulador[idProducto].precio += producto.precio * Number(producto.cantidadItem);
              // Calculamos el nuevo costo promedio
              acumulador[idProducto].costoItem += Number(producto.costoItem)  * Number(producto.cantidadItem);
          }
          return acumulador;
        }, []);

        // Calculamos el costo promedio dividiendo el costo total entre la cantidad total
         for (const idProducto in productosAgrupados) {
          productosAgrupados[idProducto].costoItem /= productosAgrupados[idProducto].cantidadItem;
          productosAgrupados[idProducto].precio /= productosAgrupados[idProducto].cantidadItem;
        }


        console.log(data)


        // Aquí abriríamos el diálogo para el pago
        const odata = await this.openFinalizarCompraDialog(data); // Asumiendo que `data.total` es el total del pedido

        console.log(odata)
        
        if(odata !== null){

        let compraData = this.utilsFormat.formatCompraCreateData(data, odata)

        if(compraData){


          const compra: Compra = await this.serviceCompra.create(compraData,data.Consecutivo); // Guardar el Tercero con los datos formateados
            
          if(!compra){
            throw new CustomNotification("Error al registrar la Compra.", 404);
          }



     
          Object.values(productosAgrupados).map(async (element:any) => {
            const item = this.utilsFormat.formatCompraItemCreateData(element,compra,data.Almacen)
            await this.serviceCompraItem.create(item);
            await this.serviceInventario.actualizarInventario(
              data.Almacen.id, 
              item?.compraItemProductoId, 
              Number(item?.cantidad),
              Number(item?.costo_item),
              parseInt(element?.precio))
          })

     
            const carteraData = this.utilsFormat.formatCompraCreateCarteraData(compra)
  
      

           await this.serviceCarteraProveedores.create(carteraData);
          



          if (compra && compra !== null) {

            localStorage.removeItem('formCompraCreate');

              this.notificacion("Compra Ingresada!", {
                variant: "success",
              });
              this.moduloCompras.pushPathView(compra.id,'/compra');
              
          }
        }

        }else{
          this.notificacion("Compra Cancelado!", {
            variant: "warning",
          })
        }



      } catch (error: any) {
        if (error instanceof CustomNotification) {
          // Mostrar notificación de error
          error.showNotification(this.notificacion);
        }else{
          const error_500 = new CustomNotification(error.message,500);
          error_500.showNotification(this.notificacion);
        }
  }})
    .catch((error: any) => {
      console.error(error)
    });
  }

  onSubmitUpdateCompra = (data: any) => {
    console.log(data)
    this.confirm({
      title: "Confirma que desea Ingresar la Compra?",
      description: "Presione el botón CONFIRMAR para INGRESAR.",
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
      try {
        

            // Utilizamos reduce para agrupar y realizar las operaciones necesarias
            const productosAgrupados = await data.items.reduce((acumulador: any, producto: any) => {
              const idProducto = producto.Producto.value;
              if (!acumulador[idProducto]) {
                  // Si el producto aún no está en el acumulador, lo inicializamos
                  acumulador[idProducto] = {
                      ...producto,
                      cantidadItem: Number(producto.cantidadItem),
                      totalItem: producto.totalItem,
                      costoItem: Number(producto.costoItem ) * Number(producto.cantidadItem),
                      precio: producto.precio * Number(producto.cantidadItem),
                      ivaItem: producto.ivaItem
                  };
              } else {
                  // Si el producto ya está en el acumulador, sumamos las cantidades y totales
                  acumulador[idProducto].cantidadItem += Number(producto.cantidadItem);
                  acumulador[idProducto].totalItem += producto.totalItem;
                  acumulador[idProducto].ivaItem += producto.ivaItem;
                  acumulador[idProducto].precio += producto.precio * Number(producto.cantidadItem);
                  // Calculamos el nuevo costo promedio
                  acumulador[idProducto].costoItem += Number(producto.costoItem)  * Number(producto.cantidadItem);
              }
              return acumulador;
            }, []);
    
            // Calculamos el costo promedio dividiendo el costo total entre la cantidad total
             for (const idProducto in productosAgrupados) {
              productosAgrupados[idProducto].costoItem /= productosAgrupados[idProducto].cantidadItem;
              productosAgrupados[idProducto].precio /= productosAgrupados[idProducto].cantidadItem;
            }

            
        // Aquí abriríamos el diálogo para el pago
        const odata = await this.openFinalizarCompraDialog(data); // Asumiendo que `data.total` es el total del pedido

        console.log(odata)
        
        if(odata !== null){


        let compraData = this.utilsFormat.formatCompraUpdateData(data,odata)
        
        console.log(compraData);
          

        if(compraData){


          const compra: Compra = await this.serviceCompra.update(compraData.id,compraData); // Guardar el Tercero con los datos formateados
            
          if(!compra){
            throw new CustomNotification("Error al registrar la Compra.", 404);
          }

          Object.values(productosAgrupados).map(async (element:any) => {
            const item = this.utilsFormat.formatCompraItemCreateData(element,compra,data.Almacen)
            await this.serviceCompraItem.create(item)
            await this.serviceInventario.actualizarInventario(
              data.Almacen.id, 
              item?.compraItemProductoId, 
              Number(item?.cantidad),
              Number(item?.costo_item),
              parseInt(element?.precio))
          })

 


    
          const carteraData = this.utilsFormat.formatCompraCreateCarteraData(compra)
  
      
          await this.serviceCarteraProveedores.create(carteraData);



          if (compra && compra !== null) {
            localStorage.removeItem('formCompraUpdate-' + data.id);
              this.notificacion("Compra Ingresada!", {
                variant: "success",
              });
              this.moduloCompras.pushPathView(compra.id,'/compra');
              
          }

        }else{
          this.notificacion("Compra Cancelado!", {
            variant: "warning",
          })
        }




        }
      } catch (error: any) {
        console.error(error)
        if (error instanceof CustomNotification) {
          // Mostrar notificación de error
          error.showNotification(this.notificacion);
        }else{
          const error_500 = new CustomNotification(error.message,500);
          error_500.showNotification(this.notificacion);
        }
  }})
    .catch((error: any) => {
      console.error(error)
    });
  }

  onSubmitCreateRegistroCompra = (data: any) => {

    this.confirm({
      title: "Confirma que desea Registrar la Compra?",
      description: "Presione el botón CONFIRMAR para REGISTRAR.",
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
      try {
        
      


        const compraData = this.utilsFormat.formatCompraCreateRegistroData(data)
        //console.log(compraData)
        if(compraData){
          const compra =  await this.serviceCompra.create(compraData,data.Consecutivo); // Guardar el Tercero con los datos formateados
            
          if (compra !== null) {
              this.notificacion("Compra Ingresada!", {
                variant: "success",
              });
              this.moduloCompras.pushPathView(compra.id,'/compra');
              
          }
        }
      } catch (err) {
        console.error(err);
        this.notificacion("Error Registrando Compra", { variant: "warning" });
        this.notificacion(err, { variant: "error" });
      } 
    })
    .catch((error: any) => {
      console.error(error)
    });
  }

  onSubmitUpdateRegistroCompra = (data: any) => {

    this.confirm({
      title: "Confirma que desea Actualizar la Compra?",
      description: "Presione el botón CONFIRMAR para ACTUALIZAR.",
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
      try {
        

        const compraData = this.utilsFormat.formatCompraUpdateRegistroData(data)
        //console.log(compraData)
        if(compraData){
          const compra =  await this.serviceCompra.update(data.id,compraData); // Guardar el Tercero con los datos formateados
            
          if (compra !== null) {
              this.notificacion("Compra Actualizada!", {
                variant: "success",
              });
              this.moduloCompras.pushPathView(compra.id,'/compra');
              
            }
        }
      } catch (err) {
        console.error(err);
        this.notificacion("Error Registrando Compra", { variant: "warning" });
        this.notificacion(err, { variant: "error" });
      } 
    })
    .catch((error: any) => {
      console.error(error)
    });
  }

  onSubmitUpdateRecibidaCompra = (data: any) => {

    this.confirm({
      title: "Confirma que desea Recibir la Compra?",
      description: "Presione el botón CONFIRMAR para RECIBIR.",
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
      try {
        

        const compraData = this.utilsFormat.formatCompraUpdateRecibidaData(data)

        if(compraData){
          const compra =  await this.serviceCompra.update(data.id,compraData); // Guardar el Tercero con los datos formateados
            
          if (compra !== null) {
              this.notificacion("Compra Actualizada!", {
                variant: "success",
              });
              this.moduloCompras.pushPathView(compra.id,'/compra');
              
            }
        }
      } catch (err) {
        console.error(err);
        this.notificacion("Error Registrando Compra", { variant: "warning" });
        this.notificacion(err, { variant: "error" });
      } 
    })
    .catch((error: any) => {
      console.error(error)
    });
  }

  onSubmitCreateDevolucionCompraDocumento = (data: any) => {
    
    this.confirm({
      title: "Confirma que desea Ingresar la Devolucion?",
      description: "Presione el botón CONFIRMAR para INGRESAR.",
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
      try {
        

        let compraData = this.utilsFormat.formatCompraDevolucionCreateData(data)

        if(compraData){


          const compra: Compra = await this.serviceCompra.create(compraData, data.Consecutivo); // Guardar el Tercero con los datos formateados
            
          if(!compra){
            throw new CustomNotification("Error al registrar la Compra.", 404);
          }

          data.items.filter((element: any) => element.cantidadDevolver > 0).map(async (element:any) => {
            const item = this.utilsFormat.formatCompraItemDevolucionCreateData(element,compra,data.Almacen)
            await this.serviceCompraItem.create(item)
            const cantidad = Number(element.cantidadDevolver) * -1

            await this.serviceInventario.actualizarSaldoInventario(item.compraItemAlmacenId, item.compraItemProductoId, cantidad )
          })

          if (compra && compra !== null) {
            localStorage.removeItem('formCompraDevolucion-' + data.id);
              this.notificacion("Devolucion Ingresada!", {
                variant: "success",
              });
              this.moduloCompras.pushPathView(compra.id,'/compra');
              
          }
        }
      } catch (error: any) {
        console.error(error)
        if (error instanceof CustomNotification) {
          // Mostrar notificación de error
          error.showNotification(this.notificacion);
        }else{
          const error_500 = new CustomNotification(error.message,500);
          error_500.showNotification(this.notificacion);
        }
  }})
    .catch((error: any) => {
      console.error(error)
    });
  }

  handleCheckGrabadoCompra (data: any) {
    this.confirm({
      title: "Confirma que desea Grabar la Compra?",
      description: "Presione el botón CONFIRMAR para GRABAR.",
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
      const compra = this.serviceCompra.updateCompraCheckGrabada(data.id)

      if (compra !== null) {
        this.notificacion("Compra Grabada!", {
          variant: "success",
        });
    
        
    }
    })
    .catch((error: any) => {
      console.error(error)
    });


  }

  handleCheckContabilizadaCompra (data: any) {
    this.confirm({
      title: "Confirma que desea Contabilizar la Compra?",
      description: "Presione el botón CONFIRMAR para CONTABILIZAR.",
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
      const compra = this.serviceCompra.updateCompraCheckContabilizada(data.id)

      if (compra !== null) {
        this.notificacion("Compra Contabilizada!", {
          variant: "success",
        });
    
        
    }
    })
    .catch((error: any) => {
      console.error(error)
    });


  }

  handleCheckCompletadaCompra (data: any) {
    this.confirm({
      title: "Confirma que desea Completar la Compra?",
      description: "Presione el botón CONFIRMAR para COMPLETAR.",
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
      const compra = this.serviceCompra.updateCompraCheckCompletada(data.id)

      if (compra !== null) {
        this.notificacion("Compra Completada!", {
          variant: "success",
        });
    
        
    }
    })
    .catch((error: any) => {
      console.error(error)
    });


  }

  handleRevisarCompra (data: any) {
    this.confirm({
      title: "Confirma que desea Revisar la Compra?",
      description: "Presione el botón CONFIRMAR para REVISAR.",
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
      const compra = this.serviceCompra.updateCompraRevisada(data.id,this.store.usuario)

      if (compra !== null) {
        this.notificacion("Compra Revisada!", {
          variant: "success",
        });
    
        
    }
    })
    .catch((error: any) => {
      console.error(error)
    });


  }
  
  handleRecibirCompra (compra: any) {
    this.confirm({
      title: "Confirma que desea Ingresar la Compra?",
      description: "Presione el botón CONFIRMAR para INGRESAR.",
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
      this.moduloCompras.pushPathUpdate(compra.id,'/recibida')
    })
    .catch((error: any) => {
      console.error(error)
    });


  }
  
  handleIngresarCompraRegistrada (compra: any) {
    this.confirm({
      title: "Confirma que desea Ingresar la Compra?",
      description: "Presione el botón CONFIRMAR para INGRESAR.",
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
      this.moduloCompras.pushPathUpdate(compra.id,'/compra')
    })
    .catch((error: any) => {
      console.error(error)
    });


  }

  handleEditarCompra (compra: any) {
    this.confirm({
      title: "Confirma que desea Editar la Compra?",
      description: "Presione el botón CONFIRMAR para EDITAR.",
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
      this.moduloCompras.pushPathUpdate(compra.id,'/compra')
    })
    .catch((error: any) => {
      console.error(error)
    });


  }

  handleDevolucionCompra (compra: any) {
    this.confirm({
      title: "Confirma que desea realizar Devolucion a la Compra?",
      description: "Presione el botón CONFIRMAR para DEVOLUCION.",
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
      this.moduloCompras.pushPathUpdate(compra.id,'/devolucion')
    })
    .catch((error: any) => {
      console.error(error)
    });


  }

  handleAnularCompra (compraData: any) {
    this.confirm({
      title: "Confirma que desea Anular la Compra?",
      description: "Presione el botón CONFIRMAR para ANULAR.",
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

      const compra: Compra = await this.serviceCompra.delete(compraData.id); // Guardar el Tercero con los datos formateados


      const compraItems = await this.serviceCompraItem.getItemCompraByCompra(compra.id);

      //console.log(compraItems)



      compraItems.map(async (registro: CompraItem) =>{

        const cantidad = Number(registro.cantidad) * -1

         await this.serviceInventario.actualizarSaldoInventario(registro.compraItemAlmacenId, registro.compraItemProductoId, cantidad )
         await this.serviceCompraItem.delete(registro.id);

        })


      if (compra !== null) {
        this.notificacion("Compra Anulada!", {
          variant: "success",
        })
      }
    })
    .catch((error: any) => {
      console.error(error)
    });


  }

  handleCheckCartera (compra: any) {

    
    this.confirm({
      title: "Confirma que desea Registrar en Cartera?",
      description: "Presione el botón CONFIRMAR para REGISTRAR.",
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


     
      const carteraData = this.utilsFormat.formatCompraCreateCarteraData(compra)
  
      

      const comprad = await this.serviceCarteraProveedores.create(carteraData);
     
      if (comprad !== null) {
        this.notificacion("Compra Completada!", {
          variant: "success",
        });
    
        
    }
    })
    .catch((error: any) => {
      console.error(error)
    });


  }

  // Función que maneja la apertura del PaymentDialog
  openFinalizarCompraDialog = (data: any) => {
    return new Promise<any>((resolve) => {
      const handleClose = () => {
        this.closeDialog(); // Asegúrate de que este método cierra el diálogo
      };
      const handleAccept = (data: any) => {
        resolve(data);
        this.closeDialog();
      };
      this.setDialogOpen(true, handleClose, handleAccept);
    });
  };
  
  
  setDialogOpen = (isOpen: boolean, handleClose: () => void, handleAccept: (changeDue: number) => void) => {
   this.dispatch(openFinalizarCompra({
    isOpen: isOpen,
      handleCloseDialog: handleClose,
      handleAcceptDialog: handleAccept,
    }));
  };
  
  closeDialog = () => {
    this.dispatch(openFinalizarCompra({
      isOpen: false,
      }))
  };

  
}