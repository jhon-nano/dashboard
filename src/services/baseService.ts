import { Consecutivo } from "../models";

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

/**
 * Clase base abstracta que implementa la interfaz IService.
 * Proporciona implementaciones abstractas de los métodos definidos en la interfaz.
 * @typeparam T El tipo de entidad que maneja el servicio.
 */
export abstract class BaseService<T> implements IService<T> {
  abstract create(data: T, consecutivo: Consecutivo): Promise<T | null>;

  abstract update(id: string, data: T): Promise<T | null>;

  abstract getById(id: string): Promise<T | null>;

  abstract getAll(): Promise<T[] | null>;

  abstract delete(id: string): Promise<T | null>;
}