import { useConfirm } from "material-ui-confirm";
import { useSnackbar } from "notistack";

import { Categoria, CategoriaAtributoNew, Estado } from "../models";
import CategoriaService from "../services/categoriaService";

export default class CategoriasHelpers {


   columns_atributos: any[];
  private confirm: any;
  private notificacion: any;
  private serviceCategoria: any;

  
  constructor(confirm: any,notificacion: any) {
    this.confirm = confirm;
    this.notificacion = notificacion;
    this.serviceCategoria = new CategoriaService();

    this.columns_atributos = [

      {
          title: "NOMBRE",
          field: "nombre",
          type: "string",
          align: "left",

          defaultSort: "asc",
          headerStyle: {
              width: "100%",
              maxWidth: "100%",
              align: "center",
          },
          cellStyle: (rowData: any) => ({
              width: "100%",
              maxWidth: "100%",
          }),
      },
      {
          title: "TIPO",
          field: "tipo",
          type: "string",
          align: "left",
          lookup: {
              "text": "TEXTO",
              "date": "FECHA",
              "number": "NUMERICO",
          },
          defaultSort: "asc",
          headerStyle: {
              width: "100%",
              maxWidth: "100%",
              align: "center",
          },
          cellStyle: (rowData: any) => ({
              width: "100%",
              maxWidth: "100%",
          }),
      },
      {
          title: "FACTURACION",
          field: "facturacion",
          type: "boolean",
          align: "left",
          defaultSort: "asc",
          initialEditValue: false,
          headerStyle: {
              width: "100%",
              maxWidth: "100%",
              align: "center",
          },
          cellStyle: (rowData: any) => ({
              width: "100%",
              maxWidth: "100%",
          }),
      },
      {
          title: "FILTRAR",
          field: "filtrar",
          type: "boolean",
          align: "left",
          initialEditValue: true,
          defaultSort: "asc",
          headerStyle: {
              width: "100%",
              maxWidth: "100%",
              align: "center",
          },
          cellStyle: (rowData: any) => ({
              width: "100%",
              maxWidth: "100%",
          }),
      },

  ];

  }


  onSubmitCreateCategoria = (data: any) => {

    this.confirm({
      title: "Confirma que desea crear nueva Categoria, "+ data.toUpperCase() +"?",
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

        const categoriaData = new Categoria({nombreCategoria: data.toUpperCase(), Atributos: [], estado: Estado.ACTIVO});

        const categoria =  await this.serviceCategoria.create(categoriaData); // Guardar el Tercero con los datos formateados
    
        if (categoria !== null) {
            this.notificacion("Categoria Ingresada!", {
              variant: "success",
            });
        }
      } catch (err) {
        console.error(err);
        this.notificacion("Error Registrando Categoria", { variant: "error" });
    
      } 
    })
    .catch((error: any) => {
      console.error(error)
    });
  }

  onRowAddTableCategoria = (newData: any): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
          try {

              const categoriaData = new Categoria({
                nombreCategoria: newData.nombreCategoria?.toUpperCase(),
                Atributos: [],
                estado: Estado.ACTIVO,
              });
            
              const categoria =   await this.serviceCategoria.create(categoriaData)
            
              if (categoria !== null) {
                this.notificacion("Categoria Ingresada!", {
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

  onRowUpdateTableCategoria = (newData: any, oldData: any): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          
          const categoria =   await this.serviceCategoria.update(oldData.tableData.id, newData)
          
          if (categoria !== null) {
            this.notificacion("Categoria Actualizada!", {
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

  onRowDeleteTableCategoria = (oldData: any): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
            
            const categoria =  await this.serviceCategoria.delete(oldData.id);
            
            if (categoria !== null) {
              this.notificacion("Categoria Inactivado!", {
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

  onRowAddTableCategoriaAtributos = (categoria: any ,newData: any): Promise<void> => {
    return new Promise((resolve, reject) => {
       setTimeout(async () => {
          try{
            const atributos = categoria.Atributos;

            // Convierte el nombre a mayúsculas
            newData.nombre = newData.nombre.toLowerCase();

            const { nombre, facturacion, tipo, filtrar} = newData;

            const data = new CategoriaAtributoNew({nombre: nombre, facturacion: facturacion, tipo: tipo, filtrar: filtrar});

            
            await this.serviceCategoria.updateCategoriaAtributos(categoria.id, [...atributos, data])
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

  onRowUpdateTableCategoriaAtributos = (categoria: any ,newData: any, oldData: any): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          
          const atributos = categoria.Atributos;
          const dataUpdate = [...atributos];

          const index = oldData.tableData.index;

          // Convierte el nombre a mayúsculas
          newData.nombre = newData.nombre.toLowerCase();

          const { nombre, facturacion, tipo, filtrar} = newData;

          dataUpdate[index] = new CategoriaAtributoNew({nombre: nombre, facturacion: facturacion, tipo: tipo, filtrar: filtrar});
          await this.serviceCategoria.updateCategoriaAtributos(categoria.id, [...dataUpdate])
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

  onRowDeleteTableCategoriaAtributos = (categoria: any,oldData: any): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
            
          const atributos = categoria.Atributos;
          const dataDelete = [...atributos];
          //console.log(oldData)
          const index = dataDelete.findIndex((element) => element.nombre == oldData.nombre);
          dataDelete.splice(index, 1);

          this.serviceCategoria.updateCategoriaAtributos(categoria.id, [...dataDelete])
          resolve()
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