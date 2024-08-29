import { Almacen } from "../../models";



export interface IAlmacenService {


  getAlmacenByNombre(nombreAlmacen: string): Promise<Almacen[] | null>;


  }
