import { useConfirm } from "material-ui-confirm";
import moment from "moment";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import ReservaService from "../services/reservaService";
import FormatUtils from "../utils/formatUtils";
import TypesReservas from "../types/typesReservas";


export default class ReservasHelpers {

  private moduloReserva: TypesReservas;
  private confirm: any;
  private router: any;
  private notificacion: any;
  private serviceReserva: ReservaService;
  private utilsFormat : FormatUtils;
  
  constructor(confirm: any,notificacion: any,router: any) {
    this.moduloReserva = new TypesReservas(router)
    this.confirm = confirm;
    this.notificacion = notificacion;
    this.router = router
    this.serviceReserva = new ReservaService();
    this.utilsFormat = new FormatUtils();
  }


  onSubmitCreateReserva = (data: any) => {
    
    this.confirm({
      title: "Confirma que desea Registrar el Levantamiento Reserva?",
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

        const formattedData = this.utilsFormat.formatReservaData(data); // Formatear y validar los datos utilizando los "helpers"
        //console.log(formattedData)
        const reserva = await this.serviceReserva.create(formattedData, data.consecutivo); // Guardar el Tercero con los datos formateados
        //console.log(reserva)
        if (reserva !== null) {
            this.notificacion("Reserva Ingresada!", {
              variant: "success",
            });
            this.moduloReserva.pushPathView(reserva.id,'/reserva')

        }
      } catch (err) {
        console.error(err);
        this.notificacion("Error Registrando Reserva", { variant: "error" });
    
      } 
    })
    .catch((error: any) => {
      console.error(error)
    });
  }


  onSubmitUpdateReserva = (data: any) => {
    
    this.confirm({
      title: "Confirma que desea Modificar el Levantamiento Reserva?",
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


        const reserva = await this.serviceReserva.update(this.router.query.id, data); // Guardar el Tercero con los datos formateados
        //console.log(reserva)
        if (reserva !== null) {
            this.notificacion("Reserva Actualizada!", {
              variant: "success",
            });
            this.moduloReserva.pushPathView(reserva.id,'/reserva')
        }
      } catch (err) {
        console.error(err);
        this.notificacion("Error Actualizando Reserva", { variant: "error" });
    
      } 
    })
    .catch((error: any) => {
      console.error(error)
    });
  }



  


}
