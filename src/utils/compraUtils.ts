import { Storage } from "aws-amplify";
import { parseString } from "xml2js";
import { Almacen, Compra } from "../models";
import CustomNotification from "../models/CustomNotification";
import CompraService from "../services/compraService";
import { compraXML } from "../store/actions/compras";

export default  class CompraUtils {


  private notificacion: any;

  private dispatch : any;
  private serviceCompra: CompraService;


  constructor(notificacion: any,dispatch: any) {
    this.notificacion = notificacion;
    this.dispatch = dispatch;
    this.serviceCompra = new CompraService();
  }



  handleFileUpload = (event: any): boolean => {
    try {
      const file = event.target.files[0];
      const reader = new FileReader();
      
      reader.onload = (e: any) => {
        const xmlString = e.target.result;
  
        // Convertir XML a JSON
        parseString(xmlString, (err: any, result: any) => {
          if (err) {
            console.error('Error al analizar el XML:', err);
            return;
          }
          //console.log(result)
          const documento = {
            numero_documento: result.AttachedDocument['cbc:ParentDocumentID'][0],
            fecha: result.AttachedDocument["cbc:IssueDate"][0],
            remitente_id:result.AttachedDocument["cac:SenderParty"][0]["cac:PartyTaxScheme"][0]["cbc:CompanyID"][0]["_"],
            remitente_name:result.AttachedDocument["cac:SenderParty"][0]["cac:PartyTaxScheme"][0]["cbc:RegistrationName"][0],
            destinatario_id:result.AttachedDocument["cac:ReceiverParty"][0]["cac:PartyTaxScheme"][0]["cbc:CompanyID"][0]["_"],
            destinatario_name:result.AttachedDocument["cac:ReceiverParty"][0]["cac:PartyTaxScheme"][0]["cbc:RegistrationName"][0],
          };
  
          const xmlInterno = result.AttachedDocument['cac:Attachment'][0]['cac:ExternalReference'][0]['cbc:Description'];
       
          // Ahora puedes analizar el XML interno
          parseString(xmlInterno, (err: any, resultadoInterno: any) => {
            if (err) {
              console.error('Error al analizar el XML interno:', err);
              return;
            }
            //console.log(resultadoInterno)
            const productos_data = resultadoInterno.Invoice['cac:InvoiceLine'].map((producto: any) => {
            
              let  percent ;

              if (
                producto['cac:TaxTotal'] &&
                producto['cac:TaxTotal'][0] &&
                producto['cac:TaxTotal'][0]['cac:TaxSubtotal'] &&
                producto['cac:TaxTotal'][0]['cac:TaxSubtotal'][0] &&
                producto['cac:TaxTotal'][0]['cac:TaxSubtotal'][0]['cac:TaxCategory'] &&
                producto['cac:TaxTotal'][0]['cac:TaxSubtotal'][0]['cac:TaxCategory'][0] &&
                producto['cac:TaxTotal'][0]['cac:TaxSubtotal'][0]['cac:TaxCategory'][0]['cbc:Percent']
              ) {
                // Now you can safely access the property
                 percent = producto['cac:TaxTotal'][0]['cac:TaxSubtotal'][0]['cac:TaxCategory'][0]['cbc:Percent'][0];
                // Rest of your code here
              } else {
                console.error("Some properties are undefined. Check your data structure.");
              }


              let taxAmount;
              if (
                producto['cac:TaxTotal'] &&
                producto['cac:TaxTotal'][0] &&
                producto['cac:TaxTotal'][0]['cbc:TaxAmount'] &&
                producto['cac:TaxTotal'][0]['cbc:TaxAmount'][0] &&
                producto['cac:TaxTotal'][0]['cbc:TaxAmount'][0]['_']
              ) {
                // Now you can safely access the 'cbc:TaxAmount' property
                 taxAmount = producto['cac:TaxTotal'][0]['cbc:TaxAmount'][0]['_'];
                // Rest of your code here
              } else {
                console.error("Some properties are undefined. Check your data structure.");
              }

              let taxableAmount;

              if (
                producto['cac:TaxTotal'] &&
                producto['cac:TaxTotal'][0] &&
                producto['cac:TaxTotal'][0]['cac:TaxSubtotal'] &&
                producto['cac:TaxTotal'][0]['cac:TaxSubtotal'][0] &&
                producto['cac:TaxTotal'][0]['cac:TaxSubtotal'][0]['cbc:TaxableAmount'] &&
                producto['cac:TaxTotal'][0]['cac:TaxSubtotal'][0]['cbc:TaxableAmount'][0] &&
                producto['cac:TaxTotal'][0]['cac:TaxSubtotal'][0]['cbc:TaxableAmount'][0]['_']
              ) {
                // Now you can safely access the 'cbc:TaxableAmount' property
                taxableAmount = producto['cac:TaxTotal'][0]['cac:TaxSubtotal'][0]['cbc:TaxableAmount'][0]['_'];
                // Rest of your code here
              } else {
                console.error("Some properties are undefined. Check your data structure.");
              }

              let taxSubtotal

              if (
                producto['cac:TaxTotal'] &&
                producto['cac:TaxTotal'][0] &&
                producto['cac:TaxTotal'][0]['cac:TaxSubtotal'] &&
                producto['cac:TaxTotal'][0]['cac:TaxSubtotal'][0] &&
                producto['cac:TaxTotal'][0]['cac:TaxSubtotal'][0]['cbc:TaxAmount'] &&
                producto['cac:TaxTotal'][0]['cac:TaxSubtotal'][0]['cbc:TaxAmount'][0] &&
                producto['cac:TaxTotal'][0]['cac:TaxSubtotal'][0]['cbc:TaxAmount'][0]['_']
              ) {
                // Now you can safely access the 'cbc:TaxAmount' property within 'cac:TaxSubtotal'
                 taxSubtotal = producto['cac:TaxTotal'][0]['cac:TaxSubtotal'][0]['cbc:TaxAmount'][0]['_'];
                // Rest of your code here
              } else {
                console.error("Some properties are undefined. Check your data structure.");
              }

              let taxSchemeID;

              if (
                producto['cac:TaxTotal'] &&
                producto['cac:TaxTotal'][0] &&
                producto['cac:TaxTotal'][0]['cac:TaxSubtotal'] &&
                producto['cac:TaxTotal'][0]['cac:TaxSubtotal'][0] &&
                producto['cac:TaxTotal'][0]['cac:TaxSubtotal'][0]['cac:TaxCategory'] &&
                producto['cac:TaxTotal'][0]['cac:TaxSubtotal'][0]['cac:TaxCategory'][0] &&
                producto['cac:TaxTotal'][0]['cac:TaxSubtotal'][0]['cac:TaxCategory'][0]['cac:TaxScheme'] &&
                producto['cac:TaxTotal'][0]['cac:TaxSubtotal'][0]['cac:TaxCategory'][0]['cac:TaxScheme'][0] &&
                producto['cac:TaxTotal'][0]['cac:TaxSubtotal'][0]['cac:TaxCategory'][0]['cac:TaxScheme'][0]['cbc:ID'] &&
                producto['cac:TaxTotal'][0]['cac:TaxSubtotal'][0]['cac:TaxCategory'][0]['cac:TaxScheme'][0]['cbc:ID'][0]
              ) {
                // Now you can safely access the 'cbc:ID' property within 'cac:TaxScheme'
                taxSchemeID = producto['cac:TaxTotal'][0]['cac:TaxSubtotal'][0]['cac:TaxCategory'][0]['cac:TaxScheme'][0]['cbc:ID'][0];
                // Rest of your code here
              } else {
                console.error("Some properties are undefined. Check your data structure.");
              }


              let taxSchemeName;

              if (
                producto['cac:TaxTotal'] &&
                producto['cac:TaxTotal'][0] &&
                producto['cac:TaxTotal'][0]['cac:TaxSubtotal'] &&
                producto['cac:TaxTotal'][0]['cac:TaxSubtotal'][0] &&
                producto['cac:TaxTotal'][0]['cac:TaxSubtotal'][0]['cac:TaxCategory'] &&
                producto['cac:TaxTotal'][0]['cac:TaxSubtotal'][0]['cac:TaxCategory'][0] &&
                producto['cac:TaxTotal'][0]['cac:TaxSubtotal'][0]['cac:TaxCategory'][0]['cac:TaxScheme'] &&
                producto['cac:TaxTotal'][0]['cac:TaxSubtotal'][0]['cac:TaxCategory'][0]['cac:TaxScheme'][0] &&
                producto['cac:TaxTotal'][0]['cac:TaxSubtotal'][0]['cac:TaxCategory'][0]['cac:TaxScheme'][0]['cbc:Name'] &&
                producto['cac:TaxTotal'][0]['cac:TaxSubtotal'][0]['cac:TaxCategory'][0]['cac:TaxScheme'][0]['cbc:Name'][0]
              ) {
                // Now you can safely access the 'cbc:Name' property within 'cac:TaxScheme'
                taxSchemeName = producto['cac:TaxTotal'][0]['cac:TaxSubtotal'][0]['cac:TaxCategory'][0]['cac:TaxScheme'][0]['cbc:Name'][0];
                // Rest of your code here
              } else {
                console.error("Some properties are undefined. Check your data structure.");
              }

              
              const productoObj = {
                ID: producto['cbc:ID'][0],
                Description: producto["cac:Item"][0]["cbc:Description"][0],
                Identification: producto['cac:Item'][0]['cac:StandardItemIdentification'][0]['cbc:ID'][0]['_'],
            
                Percent: percent,
                InvoicedQuantity: producto['cbc:InvoicedQuantity'][0]['_'],
                PriceAmount: producto['cac:Price'][0]['cbc:PriceAmount'][0]['_'],

                LineExtensionAmount: producto['cbc:LineExtensionAmount'][0]['_'],
                TaxAmount: taxAmount,
                TaxableAmount: taxableAmount,
                TaxSubtotal: taxSubtotal,
                TaxSchemeID:taxSchemeID,
                TaxSchemeName: taxSchemeName,
              };
        
              return productoObj;
            });

            let taxableAmount

            if (
              resultadoInterno.Invoice &&
              resultadoInterno.Invoice['cac:TaxTotal'] &&
              resultadoInterno.Invoice['cac:TaxTotal']['0'] &&
              resultadoInterno.Invoice['cac:TaxTotal']['0']['cac:TaxSubtotal'] &&
              resultadoInterno.Invoice['cac:TaxTotal']['0']['cac:TaxSubtotal']['0'] &&
              resultadoInterno.Invoice['cac:TaxTotal']['0']['cac:TaxSubtotal']['0']['cbc:TaxableAmount'] &&
              resultadoInterno.Invoice['cac:TaxTotal']['0']['cac:TaxSubtotal']['0']['cbc:TaxableAmount']['0'] &&
              resultadoInterno.Invoice['cac:TaxTotal']['0']['cac:TaxSubtotal']['0']['cbc:TaxableAmount']['0']['_']
            ) {
              // Now you can safely access the 'cbc:TaxableAmount' property within 'cac:TaxSubtotal'
              taxableAmount = resultadoInterno.Invoice['cac:TaxTotal']['0']['cac:TaxSubtotal']['0']['cbc:TaxableAmount']['0']['_'];
              // Rest of your code here
            } else {
              console.error("Some properties are undefined. Check your data structure.");
            }
            
            let taxAmount

            if (
              resultadoInterno.Invoice &&
              resultadoInterno.Invoice['cac:TaxTotal'] &&
              resultadoInterno.Invoice['cac:TaxTotal']['0'] &&
              resultadoInterno.Invoice['cac:TaxTotal']['0']['cac:TaxSubtotal'] &&
              resultadoInterno.Invoice['cac:TaxTotal']['0']['cac:TaxSubtotal']['0'] &&
              resultadoInterno.Invoice['cac:TaxTotal']['0']['cac:TaxSubtotal']['0']['cbc:TaxAmount'] &&
              resultadoInterno.Invoice['cac:TaxTotal']['0']['cac:TaxSubtotal']['0']['cbc:TaxAmount']['0'] &&
              resultadoInterno.Invoice['cac:TaxTotal']['0']['cac:TaxSubtotal']['0']['cbc:TaxAmount']['0']['_']
            ) {
              // Now you can safely access the 'cbc:TaxAmount' property within 'cac:TaxSubtotal'
              taxAmount = resultadoInterno.Invoice['cac:TaxTotal']['0']['cac:TaxSubtotal']['0']['cbc:TaxAmount']['0']['_'];
              // Rest of your code here
            } else {
              console.error("Some properties are undefined. Check your data structure.");
            }



            this.dispatch(compraXML({
              ...documento,
              items: productos_data,
              subtotal: taxableAmount,
              iva: taxAmount,
            }));


          });
        });
      };
  
      reader.readAsText(file);
      return true
    } catch (error: any) {
      console.error(error)
      if (error instanceof CustomNotification) {
        this.notificacion(error.message, {
          variant: 'authModuloReport',
          data: error.data
        });
      } else {
        const error_500 = new CustomNotification(error.message, 500);
        error_500.showNotification(this.notificacion);
      }
      this.dispatch(compraXML(null));
      return false
    }
  };
  


  async handleFileUploadPDF (event: any, compra: Compra,almacen:Almacen): Promise<any> {
    try {
      const file = event.target.files[0];
      const rutaArchivo = `${almacen?.codigo}/compras/${compra?.consecutivo}/` ;
      const key = await Storage.put(rutaArchivo+ file.name, file, {
        contentType: "application/pdf", // contentType is optional
      });
      await this.serviceCompra.updateCompraPDF(compra.id,rutaArchivo+ file.name)
      return key;
    } catch (error: any) {
      console.error(error)
      if (error instanceof CustomNotification) {
        this.notificacion(error.message, {
          variant: 'authModuloReport',
          data: error.data
        });
      } else {
        const error_500 = new CustomNotification(error.message, 500);
        error_500.showNotification(this.notificacion);
      }
      this.dispatch(compraXML(null));
      return false
    }
  };
  

  
  
}
