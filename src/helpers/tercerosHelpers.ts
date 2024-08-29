import { Estado, LazyTercero } from "../models";
import TerceroService from "../services/terceroService";
import { loadingTercero, openTercero } from "../store/actions/terceros";
import TypesTerceros from "../types/typesTerceros";
import FormatUtils from "../utils/formatUtils";

class TercerosHelpers {
  
  private moduloTerceros: TypesTerceros;
  private confirm: any;
  private notificacion: any;

  private store: any;
  private dispatch : any;
  private serviceTercero: TerceroService;
  private utilsFormat: FormatUtils;

  constructor(confirm: any,store: any,notificacion: any,dispatch: any,router:any) {
    this.moduloTerceros = new TypesTerceros(router);
    this.confirm = confirm;
    this.store = store
    this.notificacion = notificacion;
    this.dispatch = dispatch;
    this.serviceTercero = new TerceroService();
    this.utilsFormat = new FormatUtils();
  }

  onSubmitCreateTercero = (data: any) => {

      this.dispatch(loadingTercero(true));
      this.confirm({
        title: "Confirma que desea Registrar el Tercero?",
        description: "Presione el botón CONFIRMAR para REGISTRAR.",
        confirmationText: "CONFIRMAR",
        confirmationButtonProps: {
          variant: "contained",
          color: "primary",
        },
        cancellationText: "CANCELAR",
        cancellationButtonProps: {
          variant: "outlined",
          color: "primary",
        },
      })
      .then(async () => {
        try {
    
          const formattedData: LazyTercero = this.utilsFormat.formatTerceroCreateData(data);
      
          const tercero =  await this.serviceTercero.createOrUpdateTercero(formattedData); 
      
          if (tercero) {
            this.notificacion("Tercero Completado", { variant: "success" });
            //console.log(this.store.open_tercero)
            if(this.store.open_tercero == true){
              //console.log('DIALOG')
              this.dispatch(openTercero(false))
            }else{
              //console.log('CREATE')
              this.moduloTerceros.pushPathView(tercero.id,'/tercero')
            }
          }
        } catch (err) {
          console.error(err);
          this.notificacion("Error Registrando Tercero", { variant: "error" });
        } finally {
          this.dispatch(loadingTercero(false));
        }
      })
      .catch((error: any) => {
        console.error(error)
        this.dispatch(loadingTercero(false));
      });
  }

  onSubmitUpdateTercero = (data: any) => {

    //this.dispatch(loadingTercero(true));
    this.confirm({
      title: "Confirma que desea Actualizar el Tercero?",
      description: "Presione el botón CONFIRMAR para ACTUALIZAR.",
      confirmationText: "CONFIRMAR",
      confirmationButtonProps: {
        variant: "contained",
        color: "primary",
      },
      cancellationText: "CANCELAR",
      cancellationButtonProps: {
        variant: "outlined",
        color: "primary",
      },
    })
    .then(async () => {
      try {
        console.log(data)
        const formattedData = this.utilsFormat.formatTerceroUpdateData(data); // Formatear y validar los datos utilizando los "helpers"
        
        const tercero =  await this.serviceTercero.createOrUpdateTercero(formattedData); // Guardar el Tercero con los datos formateados
    
        if (tercero) {
          this.notificacion("Tercero Actualizado", { variant: "success" });
          this.moduloTerceros.pushPathView(tercero.id,'/tercero')
        }
      } catch (err) {
        console.error(err);
        this.notificacion("Error Registrando Tercero", { variant: "error" });
      } finally {
        this.dispatch(loadingTercero(false));
      }
    })
    .catch((error: any) => {
      console.error(error)
      this.dispatch(loadingTercero(false));
    });
  }

  onSubmitInactivarTercero = (tercero: any) => {

    this.dispatch(loadingTercero(true));
    this.confirm({
      title: `Confirma que desea ${(tercero.estado == Estado.ACTIVO) ? "Inactivar" : "Activar"} el Tercero?.`,
      description: "",
      confirmationText: "CONFIRMAR",
      confirmationButtonProps: {
        variant: "contained",
        color: "primary",
      },
      cancellationText: "CANCELAR",
      cancellationButtonProps: {
        variant: "outlined",
        color: "primary",
      },
    })
    .then(async () => {
      try {
        
        this.serviceTercero.delete(tercero.id)

      } catch (err) {
        console.error(err);
        this.notificacion("Error Registrando Tercero", { variant: "error" });
      } finally {
        this.dispatch(loadingTercero(false));
      }
    })
    .catch((error: any) => {
      console.error(error)
      this.dispatch(loadingTercero(false));
    });
  }


}

export default TercerosHelpers;
