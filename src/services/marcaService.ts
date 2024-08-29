import { DataStore } from "aws-amplify";
import { Estado, LazyMarca, Marca } from "../models";
import { BaseService } from "./baseService";

import CustomNotification from "../models/CustomNotification";
import { IMarcaService } from "./interface/IMarcaService";
import ProductoService from "./productoService";


export default class MarcaService extends BaseService<Marca> implements IMarcaService {
  

    private serviceProductos: any;
    
    constructor() {
      super()

      this.serviceProductos = new ProductoService();
    }


    async getById(id: string): Promise<LazyMarca | null> {

          const marca = await DataStore.query(Marca, id);
          if (!marca) {
            throw new CustomNotification("No se pudo obtener el marca.", 404);
          }
          return marca || null;

    };
      
    async getAll(): Promise<LazyMarca[] | null> {
 
        return await DataStore.query(Marca);
      
    } 

    async create(data: LazyMarca): Promise<LazyMarca | null> {
  
      
            const existe = await this.getMarcaByNombre(
              this.removeSpacesUpperCase(data.nombreMarca)
            );
      
            // Verificar si se encontró la Marca con ese Nombre
            if (existe == null || existe.length > 0 ) {
              throw new CustomNotification("Marca ya existe.", 404);
            }
      
            return await DataStore.save(data);

    }
    async update(id: string, data: LazyMarca): Promise<LazyMarca | null> {
  
            // Buscar la Marca por su ID
            const marca = await this.getById(id);
      
            // Verificar si se encontró la Marca
            if (!marca) {
              throw new CustomNotification("Línea no encontrado.", 404);
            }
      
            const existe = await this.getMarcaByNombre(
                this.removeSpacesUpperCase(data.nombreMarca)
            );
      
            // Filtrar el resultado para excluir la marca que se está actualizando
            const otrasDatosConElMismoNombre = existe?.filter(
              (m) => m.id !== data.id
            );
      
            // Verificar si existe otra marca activa con el mismo nombre
            if (!otrasDatosConElMismoNombre || otrasDatosConElMismoNombre.length > 0) {
              throw new CustomNotification("Ya existe una Marca con ese nombre.", 409);
            }
      
            return await DataStore.save(
              Marca.copyOf(marca, (updated) => {
                updated.nombreMarca =
                data.nombreMarca?.toUpperCase() || marca.nombreMarca;
                updated.estado = Estado.ACTIVO;
              })
            );

    }

    async delete(marcaId: string): Promise<LazyMarca | null> {

        // Buscar la Marca por su ID
        const marca = await this.getById(marcaId);
  
        // Verificar si se encontró la Marca
        if (!marca) {
          throw new CustomNotification("Marca no encontrada.", 404);
        }
  
        // Buscar Productos asociados a la Marca
        const marcas = await this.serviceProductos.getProductosByMarcaId(marcaId);
  
        // Verificar si hay Productos asociados
        if (marcas.length > 0) {
          throw new CustomNotification(
            "No se puede inactivar la marca porque hay productos asociados.",
            409,
            { marcasAsociadas: marcas }
          );
        }
  
        // Inactivar la Marca y guardar los cambios
        return await DataStore.save(
          Marca.copyOf(marca, (updated) => {
            updated.estado = Estado.INACTIVO;
          })
        );


    }

    //----------------------------------------------------------------------------


    async getMarcaByNombre(nombreMarca: string): Promise<LazyMarca[] | null> {
   
            const marca = await DataStore.query(Marca, (p) =>
            p.and((p) => [p.nombreMarca.eq(nombreMarca)])
          );
            
          if (!marca) {
            throw new CustomNotification("No se pudo obtener el marca.", 404);
          }
    
            return marca ;

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
