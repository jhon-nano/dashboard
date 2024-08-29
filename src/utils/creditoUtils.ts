import { EstadoCredito } from "../models";

export default  class CreditoUtils {



  private theme : any;


  constructor(theme : any) {

    this.theme = theme


  }

  colorEstadoTheme(estado: EstadoCredito) {

  
    switch (estado) {
      case EstadoCredito.PENDIENTE:
        return this.theme.palette.grey[500];
  
      case EstadoCredito.REVISADO:
        return this.theme.palette.info.light;
      case EstadoCredito.AUTORIZADO:
        return this.theme.palette.success.light;
      case EstadoCredito.ANULADO:
        return this.theme.palette.error.light;
      case EstadoCredito.RECHAZADO:
        return this.theme.palette.warning.light;
  
      default:
        return "";
    }
  }

  

  
  
}
