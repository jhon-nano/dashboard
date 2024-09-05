import { DataStore } from "aws-amplify";
import { Estado, Inventario, LazyInventario, UbicacionInventario } from "../models";
import { BaseService } from "./baseService";

import CustomNotification from "../models/CustomNotification";
import ConsecutivoService from './consecutivoServices';

import ProductoService from "./productoService";
import { IInventarioService } from "./interface/IInventarioService";


export default class InventarioService extends BaseService<Inventario> implements IInventarioService {
  

    private serviceProductos: any;
    private serviceConsecutivo: any;
    
    constructor() {
      super()

      this.serviceProductos = new ProductoService();
      this.serviceConsecutivo = new ConsecutivoService()
    }



    async getById(id: string): Promise<LazyInventario | null> {
  
          const inventario = await DataStore.query(Inventario, id);
          if (!inventario) {
            throw new CustomNotification("No se pudo obtener el inventario.", 404);
          }
          return inventario || null;

    };
      
    async getAll(): Promise<LazyInventario[] | null> {

        return await DataStore.query(Inventario);

    } 
    
    async create(data: any): Promise<LazyInventario | null> {
      try {
        // Validar si se proporciona un ID de producto
        if (!data.inventarioProductoId) {
          throw new CustomNotification("Error: falta Producto.", 404);
        }
    
        // Validar si se proporciona un ID de almacén
        if (!data.inventarioAlmacenId) {
          throw new CustomNotification("Error: falta Almacen.", 404);
        }
    
        // Verificar si ya existe el inventario para el producto y almacén proporcionados
        const disponible = await this.getInventarioByAlmacenAndProducto(data.inventarioProductoId, data.inventarioAlmacenId);
    
        if (disponible) {
          throw new CustomNotification("Producto ya existe en ese Almacen.", 404);
        }
    
        // Guardar el inventario en DataStore
        const inventario = await DataStore.save(new Inventario(data));
    
        if (!inventario) {
          throw new CustomNotification("Error al registrar inventario.", 404);
        }
    
        return inventario;
    
      } catch (error) {
        // Manejo de errores
        if (error instanceof CustomNotification) {
          console.error(error.message);
          throw error;
        } else {
          console.error("Error inesperado:", error);
          throw new CustomNotification("Error inesperado al crear inventario.", 500);
        }
      }
    }

    async update(id: string, data: any): Promise<LazyInventario | null> {
       
            // Buscar la Inventario por su ID
            const inventario = await this.getById(id);
      
            // Verificar si se encontró la Inventario
            if (!inventario) {
              throw new CustomNotification("Inventario no encontrada.", 404);
            }
      
      
            return await DataStore.save(
              Inventario.copyOf(inventario, (updated) => {
        

                updated.inventarioAlmacenId = data.inventarioAlmacenId || inventario.inventarioAlmacenId;
                updated.inventarioProductoId =  data.inventarioProductoId|| inventario.inventarioProductoId;

          
                updated.inventario = data.inventario || inventario.inventario;
                updated.separado = data.separado || inventario.separado;
                updated.precio = data.precio || inventario.precio;

              })
            );

    }

    async delete(inventarioId: string): Promise<LazyInventario | null> {

        // Buscar la Inventario por su ID
        const inventario = await this.getById(inventarioId);
  
        // Verificar si se encontró la Inventario
        if (!inventario) {
          throw new CustomNotification("Inventario no encontrada.", 404);
        }
  

  
        // Verificar si hay Productos asociados
        if (inventario.inventario !== 0 || inventario.separado !== 0 ) {
          throw new CustomNotification(
            "No se puede inactivar el producto tiene saldo en Inventarios.",
            409,
            { inventariosAsociadas: 'inventarios' }
          );
        }
  
        // Inactivar la Inventario y guardar los cambios
        return await DataStore.save(
          Inventario.copyOf(inventario, (updated) => {
            updated.estado = Estado.INACTIVO;
          })
        );

    }
    async activar(inventarioId: string): Promise<LazyInventario | null> {

      // Buscar la Inventario por su ID
      const inventario = await this.getById(inventarioId);

      // Verificar si se encontró la Inventario
      if (!inventario) {
        throw new CustomNotification("Inventario no encontrada.", 404);
      }


      // Inactivar la Inventario y guardar los cambios
      return await DataStore.save(
        Inventario.copyOf(inventario, (updated) => {
          updated.estado = Estado.ACTIVO;
        })
      );

  }
    //-----------------------------//

    async getInventarioByProducto(productoId: string): Promise<LazyInventario[] | null> {
   
      // Buscar la Inventario por su ID
      const inventario = await DataStore.query(Inventario, (p) =>
        p.and((p) => [p.inventarioProductoId.eq(productoId)])
      );

      // Verificar si se encontró la Inventario
      if (!inventario) {
        throw new CustomNotification("Inventario no encontrada.", 404);
      }


      return inventario;


  }

    async getInventarioByAlmacenAndProducto(productoId: string,almacenId: string): Promise<LazyInventario | null> {
   
        // Buscar la Inventario por su ID
        const inventario = await DataStore.query(Inventario, (p) =>
          p.and((p) => [p.inventarioAlmacenId.eq(almacenId),p.inventarioProductoId.eq(productoId)])
        );
  
        // Verificar si se encontró la Inventario
        if (!inventario) {
          throw new CustomNotification("Inventario no encontrada.", 404);
        }


        return inventario[0];


    }

    async createUbicacion(id: string, newData: any): Promise<LazyInventario | null> {
       
      // Buscar la Inventario por su ID
      const inventario = await this.getById(id);

      console.log(inventario)
      // Verificar si se encontró la Inventario
      if (!inventario) {
        throw new CustomNotification("Inventario no encontrada.", 404);
      }

      const existeUbicacion = inventario.ubicacion?.some(ubicacion => {
        return (ubicacion?.seccion === newData.seccion
        && ubicacion?.estante === newData.estante
        && ubicacion?.nivel === newData.nivel
        && ubicacion?.detalle === newData.detalle)
    });

    if (existeUbicacion) {
      throw new CustomNotification("Ubicacion ya Existe.", 404);
    }


      let ubicaciones = inventario.ubicacion?.map((element) => element)

      if(!ubicaciones){
        ubicaciones = []
      }



      //Agrega la nueva ubicación al array 'ubicacion'
      ubicaciones.push(newData);

      return await DataStore.save(
        Inventario.copyOf(inventario, (updated) => {
          updated.ubicacion = ubicaciones || inventario.ubicacion;


        })
      );

}

    async updateUbicacion(id: string, newData: any, oldData: any): Promise<LazyInventario | null> {
          
      // Buscar la Inventario por su ID
      const inventario = await this.getById(id);


      console.log(inventario)
      // Verificar si se encontró la Inventario
      if (!inventario) {
        throw new CustomNotification("Inventario no encontrada.", 404);
      }

      if(!inventario.ubicacion){
        throw new CustomNotification("Inventario sin Ubicaciones.", 404);
      }


      const existeUbicacion = inventario.ubicacion?.some(ubicacion => {
        return (ubicacion?.seccion === newData.seccion
        && ubicacion?.estante === newData.estante
        && ubicacion?.nivel === newData.nivel
        && ubicacion?.detalle === newData.detalle)
      });

      if (existeUbicacion) {
        throw new CustomNotification("Ubicacion ya Existe.", 404);
      }



      let ubicaciones = inventario.ubicacion?.filter(ubicacion => {
        return !(
          ubicacion?.seccion === oldData.seccion
          && ubicacion?.estante === oldData.estante
          && ubicacion?.nivel === oldData.nivel
          && ubicacion?.detalle === oldData.detalle
        );
    });

    console.log(ubicaciones)

    const { tableData, ...newUbicacion} = newData;

      //Agrega la nueva ubicación al array 'ubicacion'
      ubicaciones.push(newUbicacion);
      console.log(ubicaciones)
      return await DataStore.save(
        Inventario.copyOf(inventario, (updated) => {
          updated.ubicacion = ubicaciones || inventario.ubicacion;
        })
      );

    }

    async deleteUbicacion(id: string, oldData: any): Promise<LazyInventario | null> {
          
      // Buscar la Inventario por su ID
      const inventario = await this.getById(id);


      // Verificar si se encontró la Inventario
      if (!inventario) {
        throw new CustomNotification("Inventario no encontrada.", 404);
      }

      let ubicacion = inventario.ubicacion;

      if (!ubicacion) {
        throw new CustomNotification("Ubicacion no encontrado.", 404);
      }


      ubicacion =  ubicacion.filter(item => {
        // Compara cada objeto con el objeto a eliminar
        return !(item?.seccion === oldData.seccion &&
                 item?.estante === oldData.estante &&
                 item?.nivel === oldData.nivel &&
                 item?.detalle === oldData.detalle);
    });
      



      return await DataStore.save(
        Inventario.copyOf(inventario, (updated) => {
          updated.ubicacion = ubicacion || inventario.ubicacion;


        })
      );

    }

    async actualizarPrecio(inventarioId: string, precio: number): Promise<LazyInventario | null> {

        // Buscar la Inventario por su ID
        const inventario = await this.getById(inventarioId);
  
        // Verificar si se encontró la Inventario
        if (!inventario) {
          throw new CustomNotification("Inventario no encontrado.", 404);
        }
  
  
        return await DataStore.save(
          Inventario.copyOf(inventario, (updated) => {
            updated.precio = Number(precio) || inventario.precio;
          })
        );

    }

    async actualizarInventario(almacenId: string, productoId: string, cantidad:number, costo:number, precio:number): Promise<LazyInventario | null> {
      console.log(almacenId,productoId, cantidad,costo,precio)
        // Buscar la Inventario por su ID
        const inventario = await this.getInventarioByAlmacenAndProducto(productoId,almacenId);
  console.log(inventario)
        // Verificar si se encontró la Inventario
        if (!inventario) {
          return this.create({
            costo: costo,
            inventario: cantidad,
            precio: precio,
            separado: 0,
            estado: Estado.ACTIVO,
            inventarioAlmacenId: almacenId,
            inventarioProductoId: productoId
          })
        }
        console.log('si hay');

        return await DataStore.save(
          Inventario.copyOf(inventario, (updated) => {
            updated.costo = costo || inventario.costo;
            updated.inventario = inventario.inventario + cantidad;
            updated.precio = precio || inventario.precio;
          })
        );

    }

    async  actualizarSaldoInventario(almacenId: string, productoId: string, cantidad:number): Promise<LazyInventario | null> {

  console.log(cantidad)

      // Buscar la Inventario por su ID
      const inventario = await this.getInventarioByAlmacenAndProducto(productoId,almacenId);

      // Verificar si se encontró la Inventario
      if (!inventario) {
        throw new CustomNotification("Inventario no encontrada.", 404);
      }
   
      return await DataStore.save(
        Inventario.copyOf(inventario, (updated) => {

          updated.inventario =  inventario.inventario + cantidad   ;
        })
      );

  }

  async  actualizarSeparado(almacenId: string, productoId: string, cantidad:number): Promise<LazyInventario | null> {

  

    // Buscar la Inventario por su ID
    const inventario = await this.getInventarioByAlmacenAndProducto(productoId,almacenId);

    // Verificar si se encontró la Inventario
    if (!inventario) {
      throw new CustomNotification("Inventario no encontrada.", 404);
    }
 
    return await DataStore.save(
      Inventario.copyOf(inventario, (updated) => {
        updated.separado = inventario.separado - cantidad 
      })
    );

}
  async  actualizarSeparadoInventario(almacenId: string, productoId: string, cantidad:number): Promise<LazyInventario | null> {

  

    // Buscar la Inventario por su ID
    const inventario = await this.getInventarioByAlmacenAndProducto(productoId,almacenId);

    // Verificar si se encontró la Inventario
    if (!inventario) {
      throw new CustomNotification("Inventario no encontrada.", 404);
    }
 
    return await DataStore.save(
      Inventario.copyOf(inventario, (updated) => {

        updated.inventario = inventario.inventario + cantidad;
        updated.separado =  inventario.separado - cantidad ;
      })
    );

}

}
