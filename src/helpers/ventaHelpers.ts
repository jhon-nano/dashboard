import { Consecutivo, LazyPedido, Pedido, PedidoItem, TipoPedidos } from "../models";
import CustomNotification from "../models/CustomNotification";
import CompraItemService from "../services/compraItemService";
import PedidoService from "../services/pedidoService";
import InventarioService from "../services/inventarioService";
import TypesPedido from "../types/typesPedido";
import FormatUtils from "../utils/formatUtils";
import PedidoItemService from "../services/pedidoItemService";
import ConsecutivoService from "../services/consecutivoServices";
import moment from "moment";
import { openCambioPedido } from "../store/actions/pedidos";

export default class VentaHelpers {

  private moduloPedidos: TypesPedido;
  private confirm: any;
  private notificacion: any;
  private serviceConsecutivo: any;
  private servicePedido: any;
  private servicePedidoItem: any;
  private serviceInventario: any;
  private utilsFormat : FormatUtils;
  private store: any;
  private dispatch : any;



  constructor(store: any,confirm: any,notificacion: any,router:any,dispatch: any) {
    this.store = store;
    this.confirm = confirm;
    this.notificacion = notificacion;
    this.serviceConsecutivo = new ConsecutivoService();
    this.moduloPedidos = new TypesPedido(router,'/ventas');
    this.servicePedido = new PedidoService();
    this.servicePedidoItem = new PedidoItemService();
    this.serviceInventario = new InventarioService();
    this.utilsFormat = new FormatUtils();
    this.dispatch = dispatch;
  }

  onSubmitCreateVenta = (data: any) => {

    this.confirm({
      title: "Confirma que desea Ingresar el Pedido?",
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
      
   try{     
        if (data.items.length == 0) {
          throw new CustomNotification("El pedido debe tener productos para Ingresar.", 404);
        }  


          // Aquí abriríamos el diálogo para el pago
        const cambio = await this.openPaymentDialog(data.total); // Asumiendo que `data.total` es el total del pedido

          console.log("Cambio recibido: ", cambio);






        console.log(data.items)

            // Utilizamos reduce para agrupar y realizar las operaciones necesarias
            const productosAgrupados = await data.items.reduce((acumulador: any, producto: any) => {
              const idProducto = producto.Producto.id;
              if (!acumulador[idProducto]) {
                  // Si el producto aún no está en el acumulador, lo inicializamos
                  acumulador[idProducto] = {
                      ...producto,
                      cantidad: Number(producto.cantidad),
                      costo_item: Number(producto.costo_item ) ,
                      iva_item: producto.iva_item,
                      subtotal_item: producto.subtotal_item,
                      total_item: producto.total_item,
                  };
              } else {
                  // Si el producto ya está en el acumulador, sumamos las cantidades y totales
                  acumulador[idProducto].cantidad += Number(producto.cantidad);
                  acumulador[idProducto].total_item += producto.total_item;
                  acumulador[idProducto].subtotal_item += producto.subtotal_item;
                  acumulador[idProducto].iva_item += producto.iva_item;
              }
              return acumulador;
            }, []);
    
            // Calculamos el costo promedio dividiendo el costo total entre la cantidad total
             for (const idProducto in productosAgrupados) {
              productosAgrupados[idProducto].costo_item /= productosAgrupados[idProducto].cantidad;
            }

            

            console.log(productosAgrupados)


    
        let pedidoData = this.utilsFormat.formatPedidoCreateData({...data, cambio})
   


        if (pedidoData == null) {
          throw new CustomNotification("Error Format Pedido.", 404);
        }  

   
        const pedido: Pedido = await this.servicePedido.create(pedidoData,data.Consecutivo); // Guardar el Tercero con los datos formateados
          if(!pedido){
            throw new CustomNotification("Error al registrar el Pedido.", 404);
        }
        
        Object.values(productosAgrupados).map(async (element:any) => {
            const item = this.utilsFormat.formatPedidoItemCreateData(element,pedido,data.Almacen)
            const pedidoItem = await this.servicePedidoItem.create(item)
            if(pedido.tipo_pedido !== TipoPedidos.SEPARADO){
              const cantidad = Number(element.cantidad) * -1
              await this.serviceInventario.actualizarSaldoInventario(pedidoItem.pedidoItemAlmacenId, pedidoItem.pedidoItemProductoId, cantidad )           
            } else{
              const cantidad = Number(element.cantidad) * -1
              await this.serviceInventario.actualizarSeparadoInventario(pedidoItem.pedidoItemAlmacenId, pedidoItem.pedidoItemProductoId, cantidad )          
            }
          })

        if (pedido !== null) {
          
            this.notificacion("Pedido Ingresado!", {
              variant: "success",
            })
          
             this.moduloPedidos.pushPathView(pedido.id,'/pedido');
              
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
  }





      })
    .catch((error: any) => {
      console.error(error)
    });
  }











  
  onSubmitUpdatePedido = (data: any) => {

    this.confirm({
      title: "Confirma que desea Actualizar el Pedido?",
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
        



        let pedidoData = this.utilsFormat.formatPedidoUpdateData(data)
   
        const pedido: Pedido = await this.servicePedido.update(data.id,pedidoData); // Guardar el Tercero con los datos formateados
          if(!pedido){
            throw new CustomNotification("Error al registrar el Pedido.", 404);
        }
        console.log(data)
        data.items.map(async (element:any) => {
          console.log(element.pedidoItemID)
          if(!element.pedidoItemID){
            const item = this.utilsFormat.formatPedidoItemCreateData(element,pedido,data.Almacen)
            const pedidoItem = await this.servicePedidoItem.create(item)

            if(data.tipo_pedido !== TipoPedidos.SEPARADO){
              const cantidad = Number(element.cantidad) * -1
              await this.serviceInventario.actualizarSaldoInventario(pedidoItem.pedidoItemAlmacenId, pedidoItem.pedidoItemProductoId, cantidad )           
            } else{
              const cantidad = Number(element.cantidad) * -1
             await this.serviceInventario.actualizarSeparadoInventario(pedidoItem.pedidoItemAlmacenId, pedidoItem.pedidoItemProductoId, cantidad )          
            }
          }
          })

        if (pedido !== null) {
          
            this.notificacion("Pedido Ingresado!", {
              variant: "success",
            })
          
              this.moduloPedidos.pushPathView(pedido.id,'/pedido');
              
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

  handleEditarPedido (pedido: any) {
    this.confirm({
      title: "Confirma que desea Editar el Pedido?",
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
      this.moduloPedidos.pushPathUpdate(pedido.id,'/pedido')
    })
    .catch((error: any) => {
      console.error(error)
    });


  }

  handleFinalizarPedidoSeparado (data: any, forma_pago: string, items: any) {
    this.confirm({
      title: "Confirma que desea Finalizar el Separado?",
      description: "Presione el botón CONFIRMAR para FINALIZAR.",
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
      
      let numeracion = data.consecutivo
      if(data.consecutivo == 0 ){
        const Consecutivo =  await this.serviceConsecutivo.getConsecutivoByAlmacenAndCodigo(data.pedidoAlmacenId, 'PEDIDO');
        const {consecutivo} =  await this.serviceConsecutivo.updateConsecutivo(Consecutivo.id);
        numeracion = consecutivo
      }


  
        console.log(data,items)
        const pedidoData: LazyPedido = {
          ...data,
          tipo_pedido: TipoPedidos.PEDIDO,
          fecha_pedido: moment().format(),
          forma_pago: forma_pago,
          consecutivo: numeracion 
        }
      
        const pedido: Pedido = await this.servicePedido.update(data.id,pedidoData); 



        items.map(async (element:any) => {
          console.log(element)
          const item = this.utilsFormat.formatPedidoItemUpdateDataSeparado(pedido,element)
           await this.servicePedidoItem.update(element.id,item)
            await this.serviceInventario.actualizarSeparado(element.pedidoItemAlmacenId, element.pedidoItemProductoId, element.cantidad )          
        
        })


        // Guardar el Tercero con los datos formateados
         
        
      if(!pedido){
          throw new CustomNotification("Error al registrar el Pedido.", 404);
      }
    })
    .catch((error: any) => {
      console.error(error)
    });


  }


  handleAnularPedido (pedidoData: any) {
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

      const pedido: Pedido = await this.servicePedido.delete(pedidoData.id); // Guardar el Tercero con los datos formateados


      const pedidoItems = await this.servicePedidoItem.getItemPedidoByPedido(pedido.id);
      pedidoItems.map(async (registro: PedidoItem) =>{
         await this.servicePedidoItem.delete(registro.id);
       })


      if (pedido !== null) {
        this.notificacion("Pedido Anulada!", {
          variant: "success",
        })
      }
    })
    .catch((error: any) => {
      console.error(error)
    });


  }

  // Función que maneja la apertura del PaymentDialog
openPaymentDialog = (total: number) => {
  return new Promise<number>((resolve) => {
    const handleClose = () => {
      this.closeDialog(); // Asegúrate de que este método cierra el diálogo
    };
    const handleAccept = (changeDue: number) => {
      resolve(changeDue);
      this.closeDialog();
    };
    this.setDialogOpen(true, handleClose, handleAccept, total);
  });
};


setDialogOpen = (isOpen: boolean, handleClose: () => void, handleAccept: (changeDue: number) => void, total: number) => {
 this.dispatch(openCambioPedido({
    isPaymentDialogOpen: isOpen,
    handleClosePaymentDialog: handleClose,
    handleAcceptPaymentDialog: handleAccept,
    totalPedido: total,
  }));
};

closeDialog = () => {
  this.dispatch(openCambioPedido({
      isPaymentDialogOpen: false,
    }))
};


}