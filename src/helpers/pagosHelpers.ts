import { CarteraProveedores, ComprobanteEgreso, ComprobanteEgresoDocumento, TipoComprobanteEgreso } from "../models";
import CustomNotification from "../models/CustomNotification";
import CarteraProveedoresServices from "../services/carteraProveedoresServices";


import ComprobantesEgresoDocumentoService from "../services/comprobantesEgresoDocumentoService";
import ComprobantesEgresoService from "../services/comprobantesEgresoService";
import TypesDocumentos from "../types/typesDocumentos";
import FormatUtils from "../utils/formatUtils";

export default class PagosHelpers {


  private confirm: any;
  private moduloPago : TypesDocumentos;
  private notificacion: any;
  private serviceComprobantesEgreso: ComprobantesEgresoService;
  private serviceComprobantesEgresoDocumento: ComprobantesEgresoDocumentoService;
  private serviceCarteraProveedores: CarteraProveedoresServices;
  private utilsFormat : FormatUtils;


  constructor(confirm: any,notificacion: any,dispatch: any,router:any) {

    this.confirm = confirm;
    this.notificacion = notificacion;
    this.serviceComprobantesEgreso = new ComprobantesEgresoService(ComprobanteEgreso);
    this.serviceComprobantesEgresoDocumento = new ComprobantesEgresoDocumentoService(ComprobanteEgresoDocumento);
    this.serviceCarteraProveedores = new CarteraProveedoresServices(CarteraProveedores);
    
    this.utilsFormat = new FormatUtils();
    this.moduloPago = new TypesDocumentos(router)
  }



  onSubmitCreatePago = async (data: any) => {
    try {
      console.log(data);
  
      await new Promise((resolve, reject) => {
        this.confirm({
          title: "Confirma que desea registrar el PAGO?",
          description: `Tercero: ${data?.Tercero.nombre_completo}`,
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
          .then(resolve)
          .catch(reject);
      });
  
      const pagoData = this.utilsFormat.formatPagoCreateData(data);
      if (pagoData) {
        const pago: ComprobanteEgreso = await this.serviceComprobantesEgreso.createUpdateConsecutivo(pagoData, data.Consecutivo);
  
        if (pago.tipo_documento === TipoComprobanteEgreso.ANTICIPO) {
          const carteraData = this.utilsFormat.formatPagoCreateAnticipoCarteraData(data);
          await this.serviceCarteraProveedores.create(carteraData);
        } else {
          for (const documento of data.documentos) {
            const pagoDocumentoData = this.utilsFormat.formatPagoDocumentoCreateData(documento, pago);
            await this.serviceComprobantesEgresoDocumento.create(pagoDocumentoData);
            console.log(this.serviceCarteraProveedores);
            await this.serviceCarteraProveedores.actualizarSaldo(documento.id,documento.abono)
          }
        }
  
        if (pago !== null) {
          this.notificacion("Pago Ingresado!", { variant: "success" });
          this.moduloPago.pushPathView(pago.id,'/pago');
        }
      }
    } catch (error: any) {
      const errorNotification = error instanceof CustomNotification
        ? error
        : new CustomNotification(error?.message, 500);
  
      errorNotification.showNotification(this.notificacion);
    }
  };
  






//-----------------------------------








}