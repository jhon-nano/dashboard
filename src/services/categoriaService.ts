import { DataStore } from "aws-amplify";
import { Categoria, Estado, LazyCategoria, LazyCategoriaAtributoNew } from "../models";
import { BaseService } from "./baseService";

import CustomNotification from "../models/CustomNotification";
import { ICategoriaService } from "./interface/ICategoriaService";
import ProductoService from "./productoService";


export default class CategoriaService extends BaseService<Categoria>  implements ICategoriaService {


  private serviceProductos: any;
  
  constructor() {
    super()

    this.serviceProductos = new ProductoService();
  }

    async getById(id: string): Promise<LazyCategoria | null> {

          const categoria = await DataStore.query(Categoria, id);
          if (!categoria) {
            throw new CustomNotification("No se pudo obtener el categoria.", 404);
          }
          return categoria || null;

    };

    async getAll(): Promise<LazyCategoria[] | null> {

        return await DataStore.query(Categoria);

    }

    async create(data: LazyCategoria): Promise<LazyCategoria | null> {


            const existe = await this.getCategoriaByNombre(
             this.removeSpacesUpperCase(data.nombreCategoria)
            );
      
            // Verificar si se encontró la Categoria con ese Nombre
            if (existe == null || existe.length > 0 ) {
              throw new CustomNotification("Categoria ya existe.", 404);
            }
      
            return await DataStore.save(data);


    }
    async update(id: string, data: LazyCategoria): Promise<LazyCategoria | null> {
    
            // Buscar la Categoria por su ID
            const categoria = await this.getById(id);
      
            // Verificar si se encontró la Categoria
            if (!categoria) {
              throw new CustomNotification("Categoria no encontrado.", 404);
            }
      
            const existe = await this.getCategoriaByNombre(
                this.removeSpacesUpperCase(data.nombreCategoria)
            );
      
            // Filtrar el resultado para excluir la marca que se está actualizando
            const otrasDatosConElMismoNombre = existe?.filter(
              (m) => m.id !== data.id
            );
      
            // Verificar si existe otra marca activa con el mismo nombre
            if (!otrasDatosConElMismoNombre || otrasDatosConElMismoNombre.length > 0) {
              throw new CustomNotification("Ya existe una Categoria con ese nombre.", 409);
            }
      
            return await DataStore.save(
              Categoria.copyOf(categoria, (updated) => {
                updated.nombreCategoria =
                data.nombreCategoria.toUpperCase() || categoria.nombreCategoria;
                updated.estado = Estado.ACTIVO;
              })
            );

    }

    async delete(categoriaId: string): Promise<LazyCategoria | null> {

        // Buscar la Categoria por su ID
        const categoria = await this.getById(categoriaId);
  
        // Verificar si se encontró la Categoria
        if (!categoria) {
          throw new CustomNotification("Categoria no encontrada.", 404);
        }
  
        // Buscar Productos asociados a la Categoria
        const categorias = await this.serviceProductos.getProductosByCategoriaId(categoriaId);
  
        // Verificar si hay Productos asociados
        if (categorias.length > 0) {
          throw new CustomNotification(
            "No se puede inactivar la categoria porque hay productos asociados.",
            409,
            { categoriasAsociadas: categorias }
          );
        }
  
        // Inactivar la Categoria y guardar los cambios
        return await DataStore.save(
          Categoria.copyOf(categoria, (updated) => {
            updated.estado = Estado.INACTIVO;
          })
        );

    }

    //----------------------------------------------------------------------------

    async getCategoriaByNombre(nombreCategoria: string): Promise<LazyCategoria[] | null> {

            const categoria = await DataStore.query(Categoria, (p) =>
            p.and((p) => [p.nombreCategoria.eq(nombreCategoria)])
          );
            
          if (!categoria) {
            throw new CustomNotification("No se pudo obtener el categoria.", 404);
          }
    
            return categoria ;

    }


    //--------------------------ATRIBUTOS-----------------------------------------


    async updateCategoriaAtributos(categoriaId: string, data: [LazyCategoriaAtributoNew]): Promise<Categoria | null> {


        const categoria = await DataStore.query(Categoria, categoriaId);
        
        if (!categoria) {
          throw new CustomNotification("No se pudo obtener la Categoria.", 404);
        };
        
        return await DataStore.save(
          Categoria.copyOf(categoria, (updated) => {
            updated.Atributos = data || categoria.Atributos;
          })
        );

    }

   
    //--------------------------AYUDADORES-----------------------------------------

        
    formatStringToUpperCase = (str: string) => {
      if (str == undefined) str = "";
    
      return typeof str === "string" ? str.toUpperCase() : str;
    };
    removeSpacesUpperCase(cadena: string | any): string {
      return this.formatStringToUpperCase(cadena).replace(/\s+$/, "");
    }

}
