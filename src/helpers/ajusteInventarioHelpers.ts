import { AjusteInventario } from "../models";
import CustomNotification from "../models/CustomNotification";
import AjusteInventarioItemService from "../services/ajusteInventarioItemService";
import AjusteInventarioService from "../services/ajusteInventarioService";
import InventarioService from "../services/inventarioService";
import { openAjusteRapido } from "../store/actions/inventarios";
import TypesCompra from "../types/typesCompra";
import TypesInventario from "../types/typesInventarios";
import FormatUtils from "../utils/formatUtils";

export default class AjusteInventarioHelpers {

  private moduloCompras: TypesCompra;
  private moduloInventarios: TypesInventario;
  private confirm: any;
  private notificacion: any;
  private dispatch : any;
  private serviceAjusteInventario: any;
  private serviceAjusteInventarioItem: any;
  private serviceInventario: any;
  private utilsFormat : FormatUtils;
  private store: any;

  constructor(store: any,confirm: any,notificacion: any,dispatch: any,router:any) {
    this.store = store;
    this.confirm = confirm;
    this.notificacion = notificacion;
    this.dispatch = dispatch;
    this.moduloCompras = new TypesCompra(router);
    this.moduloInventarios = new TypesInventario(router);
    this.serviceAjusteInventario = new AjusteInventarioService();
    this.serviceAjusteInventarioItem = new AjusteInventarioItemService();
    this.serviceInventario = new InventarioService();
    this.utilsFormat = new FormatUtils();

  }

  onSubmitCreateAjusteInventarioRapido = (data: any) => {
    //console.log(data)
    this.confirm({
      title: "Confirma que desea Ajustar el Producto?",
      description: data?.Producto.nombreProducto,
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


    
        let ajusteData = this.utilsFormat.formatAjusteInventarioRapidoCreateData(data);

        if(ajusteData){


        const ajuste: AjusteInventario = await this.serviceAjusteInventario.create(ajusteData,data.Consecutivo); // Guardar el Tercero con los datos formateados
        
        if(!ajuste){
          throw new CustomNotification("Error al registrar la AjusteInventario.", 404);
        }
      
        const item= this.utilsFormat.formatAjusteInventarioItemRapidoCreateData(data,ajuste);

        await this.serviceAjusteInventarioItem.create(item);

        await this.serviceInventario.actualizarSaldoInventario(data.Almacen.id, data.Producto.id, Number(data.cantidad), data.costo);
 


      


        if (ajuste && ajuste !== null) {
            this.notificacion("Ajuste Rapido Ingresado!", {
              variant: "success",
            });
            this.dispatch(openAjusteRapido(false))
            
        }
        }else{
          this.notificacion("La cantidad debe ser distinto a cero!", {
            variant: "warning",
          });

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


  onSubmitCreateTraslado = (data : any) => {
    console.log(data)
    this.confirm({
      title: "Confirma que desea Trasladar los Productos?",
      description: `Almacen Destino: ${data?.almacen_destino.nombreAlmacen}`,
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

 
      let ajusteData = this.utilsFormat.formatTrasladoCreateData(data);

      if(ajusteData){


      const ajuste: AjusteInventario = await this.serviceAjusteInventario.create(ajusteData,data.Consecutivo); // Guardar el Tercero con los datos formateados
      
      if(!ajuste){
        throw new CustomNotification("Error al registrar la AjusteInventario.", 404);
      }

      console.log(data.items)

      data.items.map(async (element: any) => {
        console.log(element)
        let ajusteItemDataOrigen = this.utilsFormat.formatTrasladoItemCreateDataOrigen(element,ajuste,ajuste.ajusteInventarioAlmacenId);

   
          const ajusteItemOrigen = await this.serviceAjusteInventarioItem.create(ajusteItemDataOrigen);
  
    
   
          await this.serviceInventario.actualizarInventario(
            ajusteItemOrigen.ajusteInventarioItemAlmacenId, 
            ajusteItemOrigen.ajusteInventarioItemProductoId, 
            Number(ajusteItemOrigen?.cantidad),
            Number(element?.item.costo),
            parseInt(element?.item.precio))
          

          let ajusteItemDataDestino = this.utilsFormat.formatTrasladoItemCreateDataDestino(element,ajuste,data.almacen_destino.id);
    
          const ajusteItemDestino  =  await this.serviceAjusteInventarioItem.create(ajusteItemDataDestino);

          await this.serviceInventario.actualizarInventario(
            ajusteItemDestino.ajusteInventarioItemAlmacenId, 
            ajusteItemDestino.ajusteInventarioItemProductoId, 
            Number(ajusteItemDestino?.cantidad),
            Number(element?.item.costo),
            parseInt(element?.item.precio))
        
      })
    

      if (ajuste && ajuste !== null) {
          this.notificacion("Traslado Ingresado!", {
            variant: "success",
          });
          
          this.moduloInventarios.pushPath()
          
      }
      }
    
        
    })
    .catch((error: any) => {
      //console.log(error)
      if (error instanceof CustomNotification) {
        // Mostrar notificación de error
        error.showNotification(this.notificacion);
      }else{
        const error_500 = new CustomNotification(error?.message,500);
        error_500.showNotification(this.notificacion);
      }
    });
  }






//-----------------------------------








}