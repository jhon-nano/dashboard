
import { Almacen, Consecutivo, ModuloNew } from "../models";
import ConsecutivoService from "../services/consecutivoServices";
import TypesModulos from "../types/typesModulos";


export default class ConsecutivosHelpers {



  private notificacion: any;
  private serviceConsecutivo: any;
  private typesModulos: any;



  constructor(notificacion: any, router: any) {

    this.notificacion = notificacion;
    this.serviceConsecutivo = new ConsecutivoService();
    this.typesModulos = new TypesModulos(null);

  }


  onRowAddTableConsecutivo = (almacen: any ,newData: any): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
          try {

            console.log(newData)

            //console.log(newData)
              const almacenData = new Almacen({
                nombreAlmacen: almacen.nombreAlmacen,
                ciudad: almacen.ciudad,
                codigo: almacen.codigo,
                direccion: almacen.direccion,
                estado: almacen.estado,
                nit: almacen.nit,
                telefono: almacen.telefono 
              })
            
              //console.log(almacenData)

              const modulo = await this.typesModulos.getModulo(newData.ModuloNew.path);
            
       
              const moduloData = new ModuloNew({
                icon: modulo.icon,
                maneja_almacenes: modulo.maneja_almacenes,
                nombreModulo: modulo.nombreModulo,
                path: modulo.path,
                detalle: modulo.detalle
              })
    

              const consecutivoData = new Consecutivo({
                consecutivo:newData.consecutivo,
                codigo: newData.codigo,
                ModuloNew: moduloData,
                Almacen: almacenData,
                consecutivoAlmacenId: almacen.id
              });
     


              const consecutivo =   await this.serviceConsecutivo.create(consecutivoData)
            
              if (consecutivo !== null) {
                this.notificacion("Consecutivo Ingresado!", {
                  variant: "success",
                }); 
              }
              resolve();
          } catch (error: any) {
              reject()
              this.notificacion(error.message, {
                  variant: "error",
              });
          }
      }, 1000);
      })
  };

  onRowUpdateTableConsecutivo = (newData: any, oldData: any): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          
          
          const modulo = await this.typesModulos.getModulo(newData.ModuloNew.path);
            
       
          const moduloData = new ModuloNew({
            icon: modulo.icon,
            maneja_almacenes: modulo.maneja_almacenes,
            nombreModulo: modulo.nombreModulo,
            path: modulo.path,
            detalle: modulo.detalle
          })

          const consecutivoData = new Consecutivo({
            consecutivo:newData.consecutivo,
            codigo: newData.codigo,
            ModuloNew: moduloData,
          });

          const consecutivo =   await this.serviceConsecutivo.update(oldData.tableData.id, consecutivoData)
          
          if (consecutivo !== null) {
            this.notificacion("Consecutivo Actualizado!", {
              variant: "success",
            });
          }
          
          resolve();
        } catch (error: any) {
          reject()
          this.notificacion(error.message, {
              variant: "error",
          })
        }
      }, 1000);
    })
  };

  onRowDeleteTableConsecutivo = (oldData: any): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
            
            const consecutivo =  await this.serviceConsecutivo.delete(oldData.id);
            
            if (consecutivo !== null) {
              this.notificacion("Consecutivo Inactivado!", {
                variant: "success",
              });
            }
            
            resolve();
        } catch (e: any) {
            console.error(e)
            reject()
            this.notificacion(e.message, {
                variant: "error",
            })
        }
      }, 1000);
    })
  };
}


