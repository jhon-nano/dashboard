import { Tercero } from "../../models";

export interface ITerceroService  {

  createOrUpdateTercero(terceroData: Tercero): Promise<Tercero | null>;
  
  getTerceroByIdentificacion(identificacion: string): Promise<Tercero | null>;

  }

