import { Cotizacion } from "../models";
import CustomNotification from "../models/CustomNotification";
import CotizacionService from "../services/cotizacionService";
import InventarioService from "../services/inventarioService";
import TypesCotizacion from "../types/typesCotizacion";
import TypesVenta from "../types/typesVentas";
import FormatUtils from "../utils/formatUtils";


export default class CotizacionHelpers {

  private moduloCotizaciones: TypesVenta;
  private confirm: any;
  private notificacion: any;
  private serviceCotizacion: any;
  private serviceCotizacionItem: any;
  private serviceInventario: any;
  private utilsFormat : FormatUtils;
  private store: any;

  constructor(confirm: any,notificacion: any,router:any) {

    this.confirm = confirm;
    this.notificacion = notificacion;
    this.moduloCotizaciones = new TypesVenta(router);
    this.serviceCotizacion = new CotizacionService();

    this.serviceInventario = new InventarioService();
    this.utilsFormat = new FormatUtils();

  }

  onSubmitCreateCotizacion = (data: any) => {

    console.log(data)
    if (data.productos.length == 0) {
      this.notificacion("La cotizacion debe tener productos para Ingresar.", {
        variant: "warning",
      })
      //throw new CustomNotification("La cotizacion debe tener productos para Ingresar.", 404);
    }  else{


    this.confirm({
      title: "Confirma que desea Ingresar el Cotizacion?",
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

    
        let cotizacionData = this.utilsFormat.formatCotizacionCreateData(data)
   


        if (cotizacionData == null) {
          throw new CustomNotification("Error Format Cotizacion.", 404);
        }  

  
        const cotizacion: Cotizacion = await this.serviceCotizacion.create(cotizacionData,data.Consecutivo); // Guardar el Tercero con los datos formateados
       
       
        if(!cotizacion){
            throw new CustomNotification("Error al registrar el Cotizacion.", 404);
        }



        if (cotizacion !== null) {
          
            this.notificacion("Cotizacion Ingresado!", {
              variant: "success",
            })
          
              this.moduloCotizaciones.pushPathView(cotizacion.id,'/cotizacion');
              
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


  }
  onSubmitUpdateCotizacion = (data: any) => {
    console.log(data)
    this.confirm({
      title: "Confirma que desea Actualizar la Cotizacion?",
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
        

         
        let cotizacionData = this.utilsFormat.formatCotizacionUpdateData(data)
        console.log(cotizacionData)


        if (cotizacionData == null) {
          throw new CustomNotification("Error Format Cotizacion.", 404);
        }  
        console.log(data.id)

        const cotizacion: Cotizacion = await this.serviceCotizacion.update(data.id,cotizacionData); // Guardar el Tercero con los datos formateados
       
       
        if(!cotizacion){
            throw new CustomNotification("Error al registrar el Cotizacion.", 404);
        }



        if (cotizacion !== null) {
          
            this.notificacion("Cotizacion Ingresado!", {
              variant: "success",
            })
          
              this.moduloCotizaciones.pushPathView(cotizacion.id,'/cotizacion');
              
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

  handleEditarCotizacion (pedido: any) {
    this.confirm({
      title: "Confirma que desea Editar el Cotizacion?",
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
      this.moduloCotizaciones.pushPathUpdate(pedido.id,'/cotizacion')
    })
    .catch((error: any) => {
      console.error(error)
    });


  }


}