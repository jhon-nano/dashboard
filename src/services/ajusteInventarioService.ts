import { DataStore } from "aws-amplify";
import { AjusteInventario, Estado, LazyAjusteInventario, LazyConsecutivo } from "../models";
import CustomNotification from "../models/CustomNotification";
import FormatUtils from "../utils/formatUtils";
import { BaseService } from "./baseService";
import ConsecutivoService from "./consecutivoServices";
import TerceroService from "./terceroService";


export interface IAjusteInventarioService {

 

}

export default class AjusteInventarioService extends BaseService<AjusteInventario> implements IAjusteInventarioService {



  private serviceConsecutivo: ConsecutivoService;
  private serviceTercero: TerceroService;
  private utilsFormat: FormatUtils;
  

  constructor() {
    super()

    this.serviceConsecutivo = new ConsecutivoService();
    this.serviceTercero = new TerceroService();
    this.utilsFormat = new FormatUtils();
  }


  async getById(id: string): Promise<LazyAjusteInventario | null> {

      const ajusteInventario = await DataStore.query(AjusteInventario, id);
    
      if (!ajusteInventario) {
        throw new CustomNotification("No se pudo obtener la ajusteInventario.", 404);
      }

      return ajusteInventario;

  }

  async getAll(): Promise<LazyAjusteInventario[] | null> {
      
        return await DataStore.query(AjusteInventario);

  }

  async create(data: any, consecutivo: LazyConsecutivo): Promise<LazyAjusteInventario | null> {
  
      const numeracion: any = await this.serviceConsecutivo.updateConsecutivo(consecutivo.id);

      if (!numeracion) {
        throw new CustomNotification("Error Consecutivo.", 404);
      }

      //const tercero = await this.serviceTercero.getById(data.Tercero.id)
//
      //if (!tercero) {
      //  throw new CustomNotification("Error Tercero.", 404);
      //}

      const ajusteInventario = await DataStore.save(new AjusteInventario({
        ...data,
        consecutivo: numeracion.consecutivo,
        estado: Estado.ACTIVO
      }))

      if (!ajusteInventario) {
        throw new CustomNotification("AjusteInventario no registrada.", 404);
      }

      return ajusteInventario;

  }
  async update(id: string, data: LazyAjusteInventario): Promise<LazyAjusteInventario | null> {
    
      const ajusteInventario = await DataStore.query(AjusteInventario, id);

      if (!ajusteInventario) {
        throw new CustomNotification("AjusteInventario no encontrada.", 404);
      }

      const terceroID  = data.ajusteInventarioTerceroId || ''

      const tercero = await this.serviceTercero.getById(terceroID);

      if (!tercero) {
        throw new CustomNotification("Error Tercero.", 404);
      }

      return await DataStore.save(
        AjusteInventario.copyOf(ajusteInventario, (updated) => {
          updated.estado = Estado.ACTIVO;
        })
      );

  }

  async delete(id: string): Promise<LazyAjusteInventario | null> {
       
    const ajusteInventario = await DataStore.query(AjusteInventario, id);

    if (!ajusteInventario) {
      throw new CustomNotification("AjusteInventario no encontrada.", 404);
    }

    return await DataStore.save(
      AjusteInventario.copyOf(ajusteInventario, (updated) => {
        updated.total = 0;
        updated.estado = Estado.INACTIVO;
      })
    );
  }

  //---------------------------------------------------------------------------------






}

