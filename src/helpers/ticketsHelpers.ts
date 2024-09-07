
import CustomNotification from "../models/CustomNotification";

import TicketService from "../services/ticketService";

import TypesTickets from "../types/typesTickets";
import FormatUtils from "../utils/formatUtils";
import TicketsUtils from "../utils/productosUtils";


export default class TicketsHelpers {

  private moduloTickets: TypesTickets;
  private confirm: any;
  private notificacion: any;
  private router: any;
  private dispatch : any;
  private serviceTicket: TicketService;

  private utilsFormat : FormatUtils;
  private utilsTicket : TicketsUtils;


  constructor(dispatch : any,confirm : any,notificacion : any,router : any) {
    this.dispatch = dispatch;
    this.confirm = confirm;
    this.notificacion = notificacion;
    this.router = router;
    this.moduloTickets = new TypesTickets(router)
    this.serviceTicket = new TicketService();

    this.utilsFormat = new FormatUtils();
    this.utilsTicket = new TicketsUtils();
  }



  onSubmitCreateTicket = (data: any) => {
    console.log(data)
    this.confirm({
      title: "Confirma que desea Crear el Ticket?",
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
        //console.log(data.barras)




        const formattedData = this.utilsFormat.formatTicketData(data); // Formatear y validar los datos utilizando los "helpers"
 
        const ticket = await this.serviceTicket.create(formattedData, data.Consecutivo); // Guardar el Ticket con los datos formateados
        //console.log(ticket)
         if(ticket !== null ) {

          this.notificacion("Ticket Registrado!", {
            variant: "success",
          });

          this.moduloTickets.pushPathView(ticket.id,'/ticket')
        }
      } catch (error: any) {
        console.error(error);
        if (error instanceof CustomNotification) {
          // Mostrar notificación de error
          error.showNotification(this.notificacion);
        }else{
          const error_500 = new CustomNotification(error.message,500);
          error_500.showNotification(this.notificacion);
        }
        return false
      }
    })
    .catch((error: any) => {
      console.error(error)
    });
  }




}


