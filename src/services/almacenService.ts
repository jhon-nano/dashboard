import { DataStore } from "aws-amplify";
import { Almacen, Estado, LazyAlmacen } from "../models";
import { BaseService } from "./baseService";

import CustomNotification from "../models/CustomNotification";
import { IAlmacenService } from "./interface/IAlmacenService";


export default class AlmacenService extends BaseService<Almacen>  implements IAlmacenService {
    
    
    async  create(data: LazyAlmacen): Promise<LazyAlmacen | null> {
        const existe1 = await this.getAlmacenByNombre(
          this.removeSpacesUpperCase(data.name)
        );
           // Verificar si se encontró la Categoria con ese Nombre
        if (existe1 == null || existe1.length > 0 ) {
          throw new CustomNotification("Nombre ya existe.", 404);
        }

 
        return await DataStore.save(data);
    }



    async update(id: string, data: LazyAlmacen): Promise<LazyAlmacen | null> {
        
            // Buscar la Categoria por su ID
            const almacen = await this.getById(id);
      
            // Verificar si se encontró la Categoria
            if (!almacen) {
              throw new CustomNotification("Almacen no encontrado.", 404);
            }
      
            const existe1 = await this.getAlmacenByNombre(
              this.removeSpacesUpperCase(data.name)
            );
               // Verificar si se encontró la Categoria con ese Nombre


      
            // Filtrar el resultado para excluir la almacen que se está actualizando
            const otrasDatosConElMismoNombre = existe1?.filter(
              (m) => m.id !== data.id
            );
      

            // Verificar si existe otra almacen activa con el mismo nombre
            if (!otrasDatosConElMismoNombre || otrasDatosConElMismoNombre.length > 0) {
              throw new CustomNotification("Ya existe una Almacen con ese nombre.", 409);
            }

            
            return await DataStore.save(
              Almacen.copyOf(almacen, (updated) => {

                updated.name = data.name || almacen.name;
                updated.direccion = data.direccion || almacen.direccion;
                updated.telefono = data.telefono || almacen.telefono;
                updated.ciudad = data.ciudad || almacen.ciudad;
                updated.estado = Estado.ACTIVO;
              })
            );

    }

    async getById(id: string): Promise<LazyAlmacen | null> {

            const almacen = await DataStore.query(Almacen, id);
            if (!almacen) {
              throw new CustomNotification("No se pudo obtener el categoria.", 404);
            }
            return almacen ;

    }

    async getAll(): Promise<LazyAlmacen[] | null> {

            return await DataStore.query(Almacen);

    }
    async delete(id: string): Promise<LazyAlmacen | null> {

            // Buscar la Categoria por su ID
            const almacen = await this.getById(id);
      
            // Verificar si se encontró la Categoria
            if (!almacen) {
              throw new CustomNotification("Almacen no encontrado.", 404);
            }
      
            /**  Buscar Productos asociados a la Categoria
            const categorias = await this.serviceProductos.getProductosByCategoriaId(id);
      
            // Verificar si hay Productos asociados
            if (categorias.length > 0) {
              throw new CustomNotification(
                "No se puede inactivar la categoria porque hay productos asociados.",
                409,
                { categoriasAsociadas: categorias }
              );
            }
      */
            // Inactivar la Categoria y guardar los cambios
            return await DataStore.save(
              Almacen.copyOf(almacen, (updated) => {
                updated.estado = Estado.INACTIVO;
              })
            );

    }

   
    //-----------------------------------------------------------------------------------



    async getAlmacenByNombre(nombreAlmacen: string): Promise<LazyAlmacen[] | null> {
 
            const almacen = await DataStore.query(Almacen, (p) =>
            p.and((p) => [p.tradeName.eq(nombreAlmacen)])
          );
            
          if (!almacen) {
            throw new CustomNotification("No se pudo obtener el Almacen.", 404);
          }
    
            return almacen ;

    }



    async updateSecciones(id: string, data: any): Promise<LazyAlmacen | null> {
          
      // Buscar la Categoria por su ID
      const almacen = await this.getById(id);

      // Verificar si se encontró la Categoria
      if (!almacen) {
        throw new CustomNotification("Almacen no encontrado.", 404);
      }



      
      return await DataStore.save(
        Almacen.copyOf(almacen, (updated) => {
          updated.secciones = data.secciones || almacen.secciones;
        })
      );

    }
    


    async createCaja(id: string, newData: any): Promise<LazyAlmacen | null> {
          
      // Buscar la Inventario por su ID
      const almacen = await this.getById(id);

      console.log(almacen)
      // Verificar si se encontró la Inventario
      if (!almacen) {
        throw new CustomNotification("Almacen no encontrada.", 404);
      }

      const existeUbicacion = almacen.cajas_registradoras?.some(caja => {
        return (caja?.numero_caja === newData.numero_caja
        && caja?.prefijo === newData.prefijo
    )
    });

    if (existeUbicacion) {
      throw new CustomNotification("Caja ya Existe.", 404);
    }


      let cajas = almacen.cajas_registradoras?.map((element) => element)

      if(!cajas){
        cajas = []
      }



      //Agrega la nueva ubicación al array 'ubicacion'
      cajas.push(newData);

      return await DataStore.save(
        Almacen.copyOf(almacen, (updated) => {
          updated.cajas_registradoras = cajas || almacen.cajas_registradoras;


        })
      );

    }

  async updateCaja(id: string, newData: any, oldData: any): Promise<LazyAlmacen | null> {
        
    // Buscar la Inventario por su ID
    const almacen = await this.getById(id);


    console.log(almacen)
    // Verificar si se encontró la Inventario
    if (!almacen) {
      throw new CustomNotification("Almacen no encontrado.", 404);
    }

    if(!almacen.cajas_registradoras){
      throw new CustomNotification("Almacen sin Cajas.", 404);
    }


    let cajas = almacen.cajas_registradoras?.filter(caja => {
      return !(
        caja?.numero_caja === oldData.numero_caja
        && caja?.prefijo === oldData.prefijo && caja?.en_uso === oldData.en_uso
      );
  });

  console.log(cajas)

  const { tableData, ...newUbicacion} = newData;

    //Agrega la nueva ubicación al array 'ubicacion'
    cajas.push(newUbicacion);
    console.log(cajas)
    return await DataStore.save(
      Almacen.copyOf(almacen, (updated) => {
        updated.cajas_registradoras = cajas || almacen.cajas_registradoras;
      })
    );

  }




  
  async updateEstadoCaja(id: string, caja: any, estado: boolean, usuarioID: string): Promise<LazyAlmacen | null> {
      
    // Buscar la Inventario por su ID
    const almacen = await this.getById(id);

    if(caja){
      console.log('updateCajaActiva')
    // Verificar si se encontró la Inventario
    if (!almacen) {
      throw new CustomNotification("Almacen no encontrado.", 404);
    }

    if(!almacen.cajas_registradoras){
      throw new CustomNotification("Almacen sin Cajas.", 404);
    }

// Función para cambiar el estado de la caja en base al número de caja
    function cambiarEstadoCaja(cajas: any, numeroCaja: any, nuevoEstado: boolean, usuario: string) {
      return cajas.map((caja: any) => {
        if (caja.numero_caja === numeroCaja) {
          // Crear un nuevo objeto para la caja con el nuevo estado
          return {
            ...caja,
            en_uso: nuevoEstado,
            usuario_en_uso: usuario
          };
        }
        return caja;
      });
    }

    const cajasActualizadas = cambiarEstadoCaja(almacen.cajas_registradoras, caja.numero_caja, estado,usuarioID );


    return await DataStore.save(
      Almacen.copyOf(almacen, (updated) => {
        updated.cajas_registradoras = cajasActualizadas || almacen.cajas_registradoras;
      })
    );  }

    return almacen

  }


    //-----------------------------------------------------------------------------------

        
    formatStringToUpperCase = (str: string) => {
      if (str == undefined) str = "";
    
      return typeof str === "string" ? str.toUpperCase() : str;
    };
    removeSpacesUpperCase(cadena: string | any): string {
      return this.formatStringToUpperCase(cadena).replace(/\s+$/, "");
    }

}
