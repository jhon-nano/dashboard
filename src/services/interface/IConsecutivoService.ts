import { Consecutivo } from "../../models";
import { IService } from "../baseService";

export interface IConsecutivoService  {

  getConsecutivoByAlmacenAndCodigo(almacenId: string, codigo: string): Promise<Consecutivo | null>;

  updateConsecutivo(id: string): Promise<Consecutivo | null>;
  }

