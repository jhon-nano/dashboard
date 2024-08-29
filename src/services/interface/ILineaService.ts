import { Linea } from "../../models";


export interface ILineaService {

    getLineaByNombre(nombreLinea: string): Promise<Linea[] | null>;


  }