// utils/baseService.ts
import { PersistentModel, PersistentModelConstructor } from '@aws-amplify/datastore';
import { DataStore } from 'aws-amplify';
import { Consecutivo } from '../models';
import CustomNotification from '../models/CustomNotification';
import ConsecutivoService from '../services/consecutivoServices';


/**
 * Interfaz para los servicios que manejan entidades de tipo T.
 */
export interface IService<T> {
    /**
     * Crea una nueva entidad.
     * @param data Los datos de la entidad a crear.
     * @returns Una promesa que resuelve en la entidad creada.
     */
    create(data: T, consecutivo: Consecutivo): Promise<T | null>;
  
    /**
     * Actualiza una entidad existente.
     * @param id El ID de la entidad a actualizar.
     * @param data Los nuevos datos para la entidad.
     * @returns Una promesa que resuelve en la entidad actualizada o null si no se encuentra.
     */
    update(id: string, data: T): Promise<T | null>;
  
    /**
     * Obtiene una entidad por su ID.
     * @param id El ID de la entidad a buscar.
     * @returns Una promesa que resuelve en la entidad encontrada o null si no se encuentra.
     */
    getById(id: string): Promise<T | null>;
  
    /**
     * Obtiene todas las entidades.
     * @returns Una promesa que resuelve en un array de todas las entidades.
     */
    getAll(): Promise<T[] | null>;
  
    /**
     * Elimina una entidad por su ID.
     * @param id El ID de la entidad a eliminar.
     * @returns Una promesa que resuelve en la entidad eliminada o null si no se encuentra.
     */
    delete(id: string): Promise<T | null>;
  }
  

  export abstract class BaseService<T extends PersistentModel> implements IService<T> {

    private model: PersistentModelConstructor<T>;
    private serviceConsecutivo: ConsecutivoService;

    constructor(model: PersistentModelConstructor<T>) {
        this.model = model;
        this.serviceConsecutivo = new ConsecutivoService();
    }



    // Obtener un elemento por su ID
    async getAll(): Promise<T[] | null> {
        try {
            const item = await DataStore.query(this.model);
            return item || null;
        } catch (error) {
            console.error(`Error al obtener el elementos:`, error);
            throw new Error(`No se pudo obtener el elementos`);
        }
    }

    // Obtener un elemento por su ID
    async getById(id: any): Promise<T | null> {
        try {
            const item = await DataStore.query(this.model, id);
            return item || null;
        } catch (error) {
            console.error(`Error al obtener el elemento con ID ${id}:`, error);
            throw new Error(`No se pudo obtener el elemento con ID ${id}`);
        }
    }

    // Crear un nuevo elemento
    async create(data: Partial<T>): Promise<T> {
        try {
            const newItem = await DataStore.save(new this.model(data as any)); // Uso de 'as any' si es necesario
            return newItem;
        } catch (error) {
            console.error('Error al crear un nuevo elemento:', error);
            throw new Error('No se pudo crear el nuevo elemento');
        }
    }

        // Crear un nuevo elemento
    async createUpdateConsecutivo(data: Partial<T>,consecutivo: Consecutivo): Promise<T> {
        try {

            if (!consecutivo) {
                throw new CustomNotification("Error Consecutivo.", 404);
              }

            const numeracion: any = await this.serviceConsecutivo.updateConsecutivo(consecutivo.id);

            if (!numeracion) {
              throw new CustomNotification("Error update Consecutivo.", 404);
            }
  
            const newItem = await DataStore.save(new this.model({
                ...data as any,
                consecutivo: numeracion.consecutivo,
            })); // Uso de 'as any' si es necesario
            return newItem;
        } catch (error) {
            console.error('Error al crear un nuevo elemento:', error);
            throw new Error('No se pudo crear el nuevo elemento');
         }
    }

    // Actualizar un elemento existente por su ID
    async update(id: string, data: Partial<T>): Promise<T | null> {
        try {
            const item = await this.getById(id);
            if (!item) {
                throw new Error(`Elemento con ID ${id} no encontrado`);
            }
            const updatedItem = await DataStore.save(
                this.model.copyOf(item, updated => {
                    Object.assign(updated, data);
                })
            );
            return updatedItem;
        } catch (error) {
            console.error(`Error al actualizar el elemento con ID ${id}:`, error);
            throw new Error(`No se pudo actualizar el elemento con ID ${id}`);
        }
    }


           // Eliminar un elemento por su ID
      async delete(id: string): Promise<T | null> {
        try {
            const item = await this.getById(id);
            if (!item) {
                throw new Error(`Elemento con ID ${id} no encontrado`);
            }
           return await DataStore.delete(item);
        } catch (error) {
            console.error(`Error al eliminar el elemento con ID ${id}:`, error);
            throw new Error(`No se pudo eliminar el elemento con ID ${id}`);
        }
    }

 
}
