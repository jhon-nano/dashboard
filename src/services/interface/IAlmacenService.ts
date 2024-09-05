import { Almacen } from "../../models";



export interface IAlmacenService {


  getAlmacenByNombre(tradeName: string): Promise<Almacen[] | null>;


  }
