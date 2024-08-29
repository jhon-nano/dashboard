import { LazyProducto, LazyProductoProveedor } from "../models";
import CustomNotification from "../models/CustomNotification";

export default class ProductosUtils {
    constructor() {
        
    }

    zeroFill(number: any, width: number): string {
        const numStr: string = number.toString();
        const numStrLength: number = numStr.length;
      
        if (numStrLength >= width) {
          return numStr; // El número ya tiene la longitud especificada o es más largo.
        }
      
        const zeroCount: number = width - numStrLength;
        const zeros: string = '0'.repeat(zeroCount);
        return zeros + numStr;
      }



      validarProductoProveedor(productos: LazyProducto[], compra_xml:any,Identification:any): any | null {
        try {
  
          const product =  productos.find((produc) => {
            if (produc.Proveedores?.some((e: any) => e.codigo === Identification && e.nit_proveedor === compra_xml.remitente_id)) {
              return produc; // Salir del bucle interior y del bucle exterior
            }
          });
  
          return product 
        } catch (error: any) {
  
          return null
        }
      }



     validarProductoProveedor2(productos: LazyProducto[], compra_xml:any): boolean {
      try {
      
          return true 

        
        
      
      } catch (error: any) {

        return false
      }
    }
}