

import { CommentarioSolicitud, LazyCommentarioSolicitud, LazySolicitudCredito, LazyTercero, SolicitudCredito, Tercero } from "../models";
import CustomNotification from "../models/CustomNotification";
import CreditoService from "../services/creditoService";
import TerceroService from "../services/terceroService";
import TypesCredito from "../types/typesCreditos";
import FormatUtils from "../utils/formatUtils";

export default class CreditosHelpers {

  private store: any;
  private moduloCreditos: TypesCredito;
  private confirm: any;
  private notificacion: any;
  private serviceCredito: CreditoService;
  private serviceTercero: TerceroService;
  private utilsFormat : FormatUtils;
 




  constructor(store: any,confirm: any,notificacion: any,router:any) {
    this.store = store;
    this.confirm = confirm;
    this.notificacion = notificacion;
    this.moduloCreditos = new TypesCredito(router);
    this.serviceCredito = new CreditoService();
    this.serviceTercero = new TerceroService();
    this.utilsFormat = new FormatUtils();

  }

  onSubmitCreditoTercero = async (data: any, mensaje: string): Promise<Tercero | null> => {
    try {
      await this.confirm({
        title: `Confirma que desea Registrar el ${mensaje}?`,
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
      });
  
      const formattedData: LazyTercero = this.utilsFormat.formatTerceroCreateData(data);
      const tercero = await this.serviceTercero.createOrUpdateTercero(formattedData);
  
      if (tercero) {
        this.notificacion("Tercero Completado", { variant: "success" });
        //console.log(this.store.open_tercero);
        //console.log(tercero);
        return tercero;
      }
    } catch (err) {

      console.error(err);
      this.notificacion("Error Registrando Tercero", { variant: "error" });
    }
  
    return null; // Si la función llega aquí, devuelve null
  };
  


   onSubmitCreateCredito = async (data: any) => {

    try {
      await this.confirm({
        title: `Confirma que desea Registrar el CREDITO?`,
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
      });
  
      const formattedData: LazySolicitudCredito = this.utilsFormat.formatCreditoCreateData(data);

      const credito = await this.serviceCredito.create(formattedData);
  
      if (credito) {
        this.notificacion("Credito # "+ credito.consecutivo +" Completado", { variant: "success" });
        this.moduloCreditos.pushPathView(credito.id,'/credito')
      }
    } catch (err) {
      //console.log(err)
      this.notificacion("Error Registrando Credito", { variant: "error" });
    }
  
    return null; // Si la función llega aquí, devuelve null
    
    
  }

  onSubmitUpdateCredito = async (data: any) => {

    try {
      await this.confirm({
        title: `Confirma que desea Modificar el CREDITO?`,
        description: "Presione el botón CONFIRMAR para MODIFICARLO.",
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
      });
  
      const formattedData: LazySolicitudCredito = this.utilsFormat.formatCreditoUpdateData(data);

      const credito = await this.serviceCredito.update(data.id ,formattedData);
  
      if (credito) {
        this.notificacion("Credito # "+ credito.consecutivo +"  Actualizado", { variant: "success" });
        this.moduloCreditos.pushPathView(credito.id,'/credito')
      }
    } catch (err) {
      //console.log(err)
      this.notificacion("Error Actualizando el Credito", { variant: "error" });
    }
  
    return null; // Si la función llega aquí, devuelve null
    
    
  }

  handleEditarCredito (credito: any) {
    this.confirm({
      title: "Confirma que desea Editar el Credito?",
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
      this.moduloCreditos.pushPathUpdate(credito.id,'/credito')
    })
    .catch((error: any) => {
      console.error(error)
    });
  
  
  }


  handleRevisarCredito = async (usuario: any, id: string): Promise<SolicitudCredito | null> => {
      try {
        await this.confirm({
          title: `Confirma que desea Revisar el CREDITO?`,
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
        });


        const credito = await this.serviceCredito.updateCreditoRevisado(id, usuario);
    
        if (credito) {
          this.notificacion("Credito Revisado", { variant: "info" });
          //console.log(this.store.open_tercero);

          return credito;
        }
      } catch (err) {
        this.notificacion("Error Registrando Tercero", { variant: "error" });
      }
    
      return null; // Si la función llega aquí, devuelve null
  };
  
  handleAutorizarCredito = async (usuario: any, id: string): Promise<SolicitudCredito | null> => {
    try {
      await this.confirm({
        title: `Confirma que desea Autorizar el CREDITO?`,
        description: "Presione el botón CONFIRMAR para AUTORIZAR.",
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
      });


      const credito = await this.serviceCredito.updateCreditoAutorizar(id, usuario);
  
      if (credito) {
        this.notificacion("Credito Autorizado", { variant: "success" });
        //console.log(this.store.open_tercero);

        return credito;
      }
    } catch (err) {
      this.notificacion("Error Registrando Tercero", { variant: "error" });
    }
  
    return null; // Si la función llega aquí, devuelve null
};

handleRechazarCredito = async (usuario: any, id: string): Promise<SolicitudCredito | null> => {
  try {
    await this.confirm({
      title: `Confirma que desea Rechazar el CREDITO?`,
      description: "Presione el botón CONFIRMAR para RECHAZAR.",
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
    });


    const credito = await this.serviceCredito.updateCreditoRechazar(id, usuario);

    if (credito) {
      this.notificacion("Credito Rechazado", { variant: "warning" });
      //console.log(this.store.open_tercero);

      return credito;
    }
  } catch (err) {
    this.notificacion("Error Registrando Tercero", { variant: "error" });
  }

  return null; // Si la función llega aquí, devuelve null
};
handleAnularCredito = async (usuario: any, id: string): Promise<SolicitudCredito | null> => {
  try {
    await this.confirm({
      title: `Confirma que desea Anular el CREDITO?`,
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
    });


    const credito = await this.serviceCredito.updateCreditoAnulado(id, usuario);

    if (credito) {
      this.notificacion("Credito Anulado", { variant: "error" });
      //console.log(this.store.open_tercero);

      return credito;
    }
  } catch (err) {
    this.notificacion("Error Registrando Tercero", { variant: "error" });
  }

  return null; // Si la función llega aquí, devuelve null
};




  onSubmitComentarioCredito = async (data: any): Promise<CommentarioSolicitud | null> => {

    try {
      await this.confirm({
        title: `Confirma que desea Registrar el Comentario?`,
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
      });

      const formattedData: LazyCommentarioSolicitud = this.utilsFormat.formatComentarioCreditoCreateData(data);

      const comentario = await this.serviceCredito.createComentario(formattedData);
  
      if (comentario) {
        this.notificacion("Comentario Registrado", { variant: "success" });
        return comentario

      }
    } catch (error: any) {

      if (error instanceof CustomNotification) {
        // Mostrar notificación de error
        error.showNotification(this.notificacion);
      }else{
        const error_500 = new CustomNotification(error.message,500);
        error_500.showNotification(this.notificacion);
      }
      return null
    }
  
    return null; // Si la función llega aquí, devuelve null
  };

}