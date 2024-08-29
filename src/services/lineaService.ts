import { DataStore } from "aws-amplify";
import { Estado, LazyLinea, Linea } from "../models";
import CustomNotification from "../models/CustomNotification";
import { BaseService } from "./baseService";
import { ILineaService } from "./interface/ILineaService";
import ProductoService from "./productoService";


export default class LineaService extends BaseService<Linea> implements ILineaService {
 


  private serviceProductos: any;
  
  constructor() {
    super()

    this.serviceProductos = new ProductoService();
  }



    async getById(id: string): Promise<LazyLinea | null> {

          const linea = await DataStore.query(Linea, id);
          if (!linea) {
            throw new CustomNotification("No se pudo obtener el linea por id.", 404);
          }
          return linea || null;

    };

    async getAll(): Promise<LazyLinea[] | null> {
 
        return await DataStore.query(Linea);

    }

    async create(data: LazyLinea): Promise<LazyLinea | null> {
        
            // El campo nombreLinea está vacío o tiene menos de 3 caracteres
            if (!data.nombreLinea || data.nombreLinea.length < 3) {
              throw new CustomNotification("El nombre está vacío o tiene menos de 3 caracteres.", 404);
            }

            const existe = await this.getLineaByNombre(
            this.removeSpacesUpperCase(data.nombreLinea)
            );
      
            // Verificar si se encontró la Linea con ese Nombre
            if (existe == null || existe.length > 0 ) {
              throw new CustomNotification("Linea ya existe.", 404);
            }
      
            return await DataStore.save(data);


    }

    async update(id: string, data: LazyLinea): Promise<LazyLinea | null> {
     
            // Buscar la Linea por su ID
            const linea = await this.getById(id);
      
            // Verificar si se encontró la Linea
            if (!linea) {
              throw new CustomNotification("Línea no encontrada.", 404);
            }
          
            // validamos que no exista 
            const existe = await this.getLineaByNombre(
                this.removeSpacesUpperCase(data.nombreLinea)
            );
      
            // Filtrar el resultado para excluir la marca que se está actualizando validando id
            const otrasDatosConElMismoNombre = existe?.filter(
              (m) => m.id !== data.id
            );
      
            // Verificar si existe otra marca activa con el mismo nombre
            if (!otrasDatosConElMismoNombre || otrasDatosConElMismoNombre.length > 0) {
              throw new CustomNotification("Ya existe una Linea con ese nombre.", 404);
            }


            if (!data.nombreLinea || data.nombreLinea.length < 3) {
              // El campo nombreLinea está vacío o tiene menos de 3 caracteres
              // Puedes manejar la validación aquí, mostrar un mensaje de error, etc.
              throw new CustomNotification("El nombre está vacío o tiene menos de 3 caracteres.", 404);
            }
      
            return await DataStore.save(
              Linea.copyOf(linea, (updated) => {
                updated.nombreLinea =
                data.nombreLinea.toUpperCase() || linea.nombreLinea.toUpperCase();
                updated.estado = Estado.ACTIVO;
              })
            );

    }

    async delete(lineaId: string): Promise<LazyLinea | null> {
 
        // Buscar la Linea por su ID
        const linea = await this.getById(lineaId);
  
        // Verificar si se encontró la Linea
        if (!linea) {
          throw new CustomNotification("Línea no encontrada.", 404);
        }
  
        // Buscar Productos asociados a la Linea
        const lineas = await this.serviceProductos.getProductosByLineaId(lineaId);
  
        // Verificar si hay Productos asociados
        if (lineas.length > 0) {
          throw new CustomNotification(
            "No se puede inactivar la línea porque hay productos asociados.",
            409,
            { lineasAsociadas: lineas }
          );
        }
  
        // Inactivar la Linea y guardar los cambios
        return await DataStore.save(
          Linea.copyOf(linea, (updated) => {
            updated.estado = Estado.INACTIVO;
          })
        );

    }

//------------------------------------------------------------------------------------


    async getLineaByNombre(nombreLinea: string): Promise<LazyLinea[] | null> {


          if (!nombreLinea || nombreLinea.length < 3) {
            throw new CustomNotification("El nombre está vacío o tiene menos de 3 caracteres.", 404);
          }

          const linea = await DataStore.query(Linea, (p) =>
            p.and((p) => [p.nombreLinea.eq(nombreLinea)])
          );
            
          if (!linea) {
            throw new CustomNotification("Línea no encontrada.", 404);
          }
    
            return linea ;


    }

//-----------------------------AYUDADORES---------------------------------------------

        
    formatStringToUpperCase = (str: string) => {
      if (str == undefined) str = "";
    
      return typeof str === "string" ? str.toUpperCase() : str;
    };
    removeSpacesUpperCase(cadena: string | any): string {
      return this.formatStringToUpperCase(cadena).replace(/\s+$/, "");
    }

}
