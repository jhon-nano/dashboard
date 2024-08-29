// services/lazyTerceroService.js
import { DataStore } from '@aws-amplify/datastore';
import { Estado, LazyTercero, Tercero } from '../models';
import CustomNotification from '../models/CustomNotification';
import { BaseService } from './baseService';
import { ITerceroService } from './interface/ITerceroService';

export default class TerceroService extends BaseService<Tercero> implements ITerceroService {
    

  
    constructor() {
      super()

  
    }

    async getById(id: string): Promise<Tercero | null> {

            const tercero = await DataStore.query(Tercero, id);
          
            if (!tercero) {
              throw new CustomNotification("No se pudo obtener el Tercero.", 404);
            }
      
            return tercero;

    }
    async getAll(): Promise<LazyTercero[]> {
       
            return await DataStore.query(Tercero);
          
    }

    async create(data: Tercero): Promise<LazyTercero | null> {
      const { id, ...nuevoTercero } = data;

    console.log(nuevoTercero)

            return await DataStore.save(new Tercero(nuevoTercero));
        
    }
    async update(id: string, data: LazyTercero): Promise<LazyTercero | null> {

      //console.log('updateTercero')
       
        const tercero = await DataStore.query(Tercero, id);
        
        if (!tercero) {
            throw new CustomNotification("Tercero no encontrado.", 404);
          }

        return await DataStore.save(Tercero.copyOf(tercero, (updated) => {
        updated.tipo_tercero = data.tipo_tercero || tercero.tipo_tercero;
        updated.identificacion = data.identificacion || tercero.identificacion;
        updated.dv = data.dv || tercero.dv;
        updated.expedida = data.expedida || tercero.expedida;
        updated.lugar_nacimiento = data.lugar_nacimiento || tercero.lugar_nacimiento;
        updated.fecha_nacimiento = data.fecha_nacimiento || tercero.fecha_nacimiento;
        updated.nombre_completo = data.nombre_completo || tercero.nombre_completo;
        updated.primer_apellido = data.primer_apellido || tercero.primer_apellido;
        updated.segundo_apellido = data.segundo_apellido || tercero.segundo_apellido;
        updated.primer_nombre = data.primer_nombre || tercero.primer_nombre;
        updated.segundo_nombre = data.segundo_nombre || tercero.segundo_nombre;
        updated.direccion = data.direccion || tercero.direccion;
        updated.telefono = data.telefono || tercero.telefono;
        updated.ciudad = data.ciudad || tercero.ciudad;
        updated.correo = data.correo || tercero.correo;
        updated.estado = data.estado || tercero.estado;
        }));

                

    }

    async delete(id: string): Promise<LazyTercero | null> {
           

            const tercero =  await DataStore.query(Tercero, id);
        
            if (!tercero) return null;
            if( tercero.estado == Estado.ACTIVO){
                return await DataStore.save(Tercero.copyOf(tercero, (updated) => {
                    updated.estado = Estado.INACTIVO
                    }));
            }else{
                return await DataStore.save(Tercero.copyOf(tercero, (updated) => {
                    updated.estado = Estado.ACTIVO
                    }));
            }

    }

//--------------------------------------------------------

    async getTerceroByIdentificacion(identificacion: string): Promise<Tercero | null> {
      //console.log('getTerceroByIdentificacion')

            const tercero = await DataStore.query(Tercero, (t) => t.identificacion.eq(identificacion));
      
            if (!tercero) {
                throw new CustomNotification("No se pudo obtener el tercero.", 404);
              }



            return tercero[0] ;

    }

    async createOrUpdateTercero(terceroData: LazyTercero): Promise<Tercero | null> {
      //console.log('createOrUpdateTercero')
            const { identificacion } = terceroData;
      
            // Verificar si ya existe un tercero con la misma identificación
            const existingTercero = await this.getTerceroByIdentificacion(identificacion);
  
            if (existingTercero) {
                return this.update(existingTercero.id, terceroData);
            }else{
                return this.create(terceroData);
            }

    }

}
