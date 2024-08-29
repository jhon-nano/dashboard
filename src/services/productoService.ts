import { DataStore, Predicates } from "aws-amplify";
import { Estado, LazyConsecutivo, LazyProducto, Producto } from "../models";
import CustomNotification from "../models/CustomNotification";
import FormatUtils from "../utils/formatUtils";
import { BaseService } from "./baseService";
import { IProductoService } from "./interface/IProductoService";
import ConsecutivoService from "./consecutivoServices";
import ProductosUtils from "../utils/productosUtils";



export default class ProductoService extends BaseService<Producto> implements IProductoService {


  private serviceConsecutivo: ConsecutivoService;
  private utilsFormat: FormatUtils;
  private utilsProducto : ProductosUtils;
  constructor() {
    super()
    this.serviceConsecutivo = new ConsecutivoService();
    this.utilsFormat = new FormatUtils();
    this.utilsProducto = new ProductosUtils();
  }



    /// CRUD CLASE ABSTRACTA

    async getById(id: string): Promise<LazyProducto | null> {


          const producto = await DataStore.query(Producto, id);
        
          if (!producto) {
            throw new CustomNotification("No se pudo obtener el producto.", 404);
          }
    
          return producto;

    }
    async getAll(): Promise<LazyProducto[] > {
   


      // Realiza la consulta para obtener todos los registros
      return await DataStore.query(Producto, Predicates.ALL);

  

    }

    async create(data: any, consecutivo: LazyConsecutivo): Promise<LazyProducto |  null> {
    
      if (!consecutivo) {
        throw new CustomNotification("Error Consecutivo.", 404);
      }

      const numeracion: any = await this.serviceConsecutivo.updateConsecutivo(consecutivo.id);


      if (!numeracion) {
        throw new CustomNotification("Error Numeracion.", 404);
      }
    


      const producto = await DataStore.save(new Producto({
        ...data,
        codigo: this.utilsProducto.zeroFill(numeracion.consecutivo , 6),
      }))

      if (!producto) {
        throw new CustomNotification("Producto no registrado.", 404);
      }

      return producto;
         
    }

    async createAll(data: any): Promise<LazyProducto |  null> {
    


      const producto = await DataStore.save(data)

      if (!producto) {
        throw new CustomNotification("Producto no registrado.", 404);
      }

      return producto;
         
    }

    async update(id: string, data: LazyProducto): Promise<LazyProducto | null> {
        
      console.log(data)
            const producto = await DataStore.query(Producto, id);
      
            if (!producto) {
              throw new CustomNotification("Producto no encontrado.", 404);
            }
      
            if(data.barras){
            const existe_barra = await this.getProductosByBarra(
                this.utilsFormat.removeSpacesUpperCase(data.barras)
            );
      
            // Filtrar el resultado para excluir la marca que se está actualizando
            const otrasDatosConElMismoBarra = existe_barra?.filter(
              (m) => m.id !== id
            );
      
            // Verificar si existe otra marca activa con el mismo nombre
            if (!otrasDatosConElMismoBarra || otrasDatosConElMismoBarra.length > 0) {
              throw new CustomNotification("Ya existe un producto con esas barras.", 409);
            }
          }

      
            return await DataStore.save(
              Producto.copyOf(producto, (updated) => {
                updated.nombreProducto =
                data.nombreProducto || producto.nombreProducto;
                updated.descripcion =
                data.descripcion || producto.descripcion;
                updated.barras = data.barras ;
                updated.presentacion =
                data.presentacion || producto.presentacion;
                updated.datos_producto =
                data.datos_producto || producto.datos_producto;
                updated.iva = Number(data.iva) ;
                updated.productoLineaId =
                data.productoLineaId || producto.productoLineaId;
                updated.productoCategoriaId =
                data.productoCategoriaId ||
                  producto.productoCategoriaId;
                updated.productoMarcaId =
                data.productoMarcaId || producto.productoMarcaId;
                updated.estado = Estado.ACTIVO;
              })
            );
          
    }

    async delete(id: string): Promise<LazyProducto | null> {
   
        const producto =  await DataStore.query(Producto, id);

        if (!producto) {
          throw new CustomNotification("Producto no encontrado.", 404);
        }




        


        if( producto.estado == Estado.ACTIVO){
            return await DataStore.save(Producto.copyOf(producto, (updated) => {
                updated.estado = Estado.INACTIVO
                }));
        }else{
            return await DataStore.save(Producto.copyOf(producto, (updated) => {
                updated.estado = Estado.ACTIVO
                }));
        }

    }

    //-------------------------------------------------------------------------------------------------------
    

    async getProductosByNombre(nombre: string): Promise<LazyProducto[] | null> {
 

        const producto = await DataStore.query(Producto, (p) =>
        p.and((p) => [p.nombreProducto.eq(nombre)])
      );
        if (!producto) {
          throw new CustomNotification("No se pudo obtener el producto.", 404);
        }
  
        return producto;

    }

    async getProductosByBarra(barras: string): Promise<LazyProducto[] | null> {
      
            const producto = await DataStore.query(Producto, (p) =>
            p.and((p) => [p.barras.eq(barras)])
          );
            if (!producto) {
              throw new CustomNotification("No se pudo obtener el producto.", 404);
            }
      
            return producto;

    }

    async getProductosByLineaId(lineaId: string): Promise<LazyProducto[] | null> {
     
            const producto = await DataStore.query(Producto, (p) =>
            p.and((p) => [p.productoLineaId.eq(lineaId)])
          );
            if (!producto) {
              throw new CustomNotification("No se pudo obtener el marcas.", 404);
            }
      
            return producto;

    }
    async getProductosByCategoriaId(categoriaId: string): Promise<LazyProducto[] | null> {

          const producto = await DataStore.query(Producto, (p) =>
          p.and((p) => [p.productoCategoriaId.eq(categoriaId)])
        );
          if (!producto) {
            throw new CustomNotification("No se pudo obtener la categorias.", 404);
          }
    
          return producto;

  }
    async getProductosByMarcaId(marcaId: string): Promise<LazyProducto[] | null> {
   
            const producto =  await DataStore.query(Producto, (p) =>
              p.and((p) => [p.productoMarcaId.eq(marcaId)])
            );

            if (!producto) {
              throw new CustomNotification("No se pudo obtener el marca.", 404);
            }
            
            return producto;

    }

    async updateImagen(id: string, key: any): Promise<LazyProducto | null> {
        

            const producto = await DataStore.query(Producto, id);
      
            if (!producto) {
              throw new CustomNotification("Producto no encontrado.", 404);
            }
      
     
            return await DataStore.save(
              Producto.copyOf(producto, (updated) => {
                updated.imagen = key
              })
            );
          
    }


    async validarBarraDisponible(barra: string): Promise<boolean> {
 

        const producto = await DataStore.query(Producto, (p) =>
        p.and((p) => [p.barras.eq(barra)])
      );
        if (!producto) {
          throw new CustomNotification("No se pudo obtener los productos.", 404);
        }
        if (producto.length > 0) {
          throw new CustomNotification("Ya existe un Producto con ese codigo de barras.", 404);
        }else{
  
          return false;
        }


    }
  
    async gestionarProveedor(proveedor: any[], producto: LazyProducto): Promise<LazyProducto | null> {
   
        const product = await DataStore.query(Producto, producto.id);
        
        if (!product) {
          throw new CustomNotification("No se pudo obtener el Producto.", 404);
        };
        
        return await DataStore.save(
          Producto.copyOf(product, (updated) => {
            updated.Proveedores = proveedor || product.Proveedores;
          })
        );

    }

}
