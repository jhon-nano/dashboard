import { Marca, Producto } from "../../models";



export interface IMarcaService {

    getMarcaByNombre(nombreMarca: string): Promise<Marca[] | null>;



  }
