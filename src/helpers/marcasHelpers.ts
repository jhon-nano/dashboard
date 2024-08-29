
import { Estado, Marca } from "../models";
import MarcaService from "../services/marcaService";

export default class MarcasHelpers {

  private columns: any[];
  private confirm: any;
  private notificacion: any;
  private serviceMarca: any;

  
  constructor(confirm: any,notificacion: any) {
    this.confirm = confirm;
    this.notificacion = notificacion;
    this.serviceMarca = new MarcaService();

    this.columns = [
      {
        title: "ID",
        field: "id",
        align: "center",
        hidden: true,
        filtering: false,
      },
      {
        title: "MARCA",
        field: "nombreMarca",
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


  onSubmitCreateMarca = (data: any) => {

    this.confirm({
      title: "Confirma que desea crear nueva Marca, "+ data.toUpperCase() +"?",
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

        const marcaData = new Marca({nombreMarca: data.toUpperCase(), estado: Estado.ACTIVO});

        const marca =  await this.serviceMarca.create(marcaData); // Guardar el Tercero con los datos formateados
    
        if (marca !== null) {
            this.notificacion("Marca Ingresada!", {
              variant: "success",
            });
        }
      } catch (err) {
        console.error(err);
        this.notificacion("Error Registrando Marca", { variant: "error" });
    
      } 
    })
    .catch((error: any) => {
      console.error(error)
    });
  }

  onRowAddTableMarca = (newData: any): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
          try {

              const marcaData = new Marca({
                nombreMarca: newData.nombreMarca?.toUpperCase(),
                estado: Estado.ACTIVO,
              });
            
              const marca =   await this.serviceMarca.create(marcaData)
            
              if (marca !== null) {
                this.notificacion("Marca Ingresada!", {
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

  onRowUpdateTableMarca = (newData: any, oldData: any): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          
          const marca =   await this.serviceMarca.update(oldData.tableData.id, newData)
          
          if (marca !== null) {
            this.notificacion("Marca Actualizada!", {
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

  onRowDeleteTableMarca = (oldData: any): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
            
            const marca =  await this.serviceMarca.delete(oldData.id);
            
            if (marca !== null) {
              this.notificacion("Marca Inactivado!", {
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


