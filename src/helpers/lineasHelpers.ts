
import { Estado, Linea } from "../models";
import LineaService from "../services/lineaService";

export default class LineasHelpers {

  private columns: any[];
  private confirm: any;
  private notificacion: any;
  private serviceLinea: any;

  
  constructor(confirm: any,notificacion: any) {
    this.confirm = confirm;
    this.notificacion = notificacion;
    this.serviceLinea = new LineaService();

    this.columns = [
      {
        title: "ID",
        field: "id",
        align: "center",
        hidden: true,
        filtering: false,
      },
      {
        title: "LINEA",
        field: "nombreLinea",
        type: "string",
        align: "left",
        headerStyle: {
          width: "100%",
          maxWidth: "100%",
          align: "center",
          color: "white",
        },
        cellStyle: (rowData: any) => ({
          width: "100%",
          maxWidth: "100%",
        }),
      },
      {
        title: "ESTADO",
        field: "estado",
        lookup: Estado,
        editable: 'never',
        initialEditValue: Estado.ACTIVO,
        filtering: false,
        align: "center",
        headerStyle: {
          width: "5%",
          maxWidth: "5%",
          align: "center",
        },
        cellStyle: (rowData: any) => ({
          width: "5%",
          maxWidth: "5%",
        }),
      },
    ];
  }


  onSubmitCreateLinea = (data: any) => {

    this.confirm({
      title: "Confirma que desea crear nueva Linea, "+ data.toUpperCase() +"?",
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

        const lineaData = new Linea({nombreLinea: data.toUpperCase(), estado: Estado.ACTIVO});

        const linea =  await this.serviceLinea.create(lineaData); // Guardar el Tercero con los datos formateados
    
        if (linea !== null) {
            this.notificacion("Linea Ingresada!", {
              variant: "success",
            });
        }
      } catch (err) {
        console.error(err);
        this.notificacion("Error Registrando Linea", { variant: "error" });
    
      } 
    })
    .catch((error: any) => {
      console.error(error)
    });
  }

  onRowAddTableLinea = (newData: any): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
          try {

              const lineaData = new Linea({
                nombreLinea: newData.nombreLinea?.toUpperCase(),
                estado: Estado.ACTIVO,
              });
            
              const linea =   await this.serviceLinea.create(lineaData)
            
              if (linea !== null) {
                this.notificacion("Linea Ingresada!", {
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

  onRowUpdateTableLinea = (newData: any, oldData: any): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          
          const linea =   await this.serviceLinea.update(oldData.tableData.id, newData)
          
          if (linea !== null) {
            this.notificacion("Linea Actualizada!", {
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

  onRowDeleteTableLinea = (oldData: any): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
            
            const linea =  await this.serviceLinea.delete(oldData.id);
            
            if (linea !== null) {
              this.notificacion("Linea Inactivado!", {
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


