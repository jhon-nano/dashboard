import { DataStore } from "aws-amplify";
import { Consecutivo, LazyConsecutivo } from "../models";
import CustomNotification from "../models/CustomNotification";
import { BaseService } from "./baseService";
import { IConsecutivoService } from "./interface/IConsecutivoService";


export default class ConsecutivoService extends BaseService<Consecutivo> implements IConsecutivoService {





  async getById(id: string): Promise<LazyConsecutivo | null> {
    const consecutivo = await DataStore.query(Consecutivo, id);
    return consecutivo || null
  }

  getAll(): Promise<LazyConsecutivo[]> {
    return  DataStore.query(Consecutivo);
  }
  

  async create(data: LazyConsecutivo): Promise<LazyConsecutivo | null> {

      
      const existe_consecutivo = await this.getConsecutivoByAlmacenAndCodigo( data.consecutivoAlmacenId,data.codigo);


    // Verificar si existe otra marca activa con el mismo nombre
    if (existe_consecutivo){
      throw new CustomNotification("Ya existe un consecutivo en el almacen con ese codigo.", 409);
    }



      return await DataStore.save(data);

  }

  async update(id: string, dataConsecutivo: LazyConsecutivo): Promise<LazyConsecutivo | null> {
    //console.log(dataConsecutivo)
    const consecutivo = await DataStore.query(Consecutivo, id);
    if (!consecutivo) {
      throw new CustomNotification("Consecutivo no encontrado.", 404);
    }
    return await DataStore.save(Consecutivo.copyOf(consecutivo, (updated) => {
      updated.ModuloNew = dataConsecutivo.ModuloNew || consecutivo.ModuloNew;
      updated.codigo =  dataConsecutivo.codigo || consecutivo.codigo;
      updated.consecutivo =  dataConsecutivo.consecutivo ;
    }));
  }


  async  delete(id: string): Promise<LazyConsecutivo | null> {
    const consecutivo = await DataStore.query(Consecutivo, id);
    if (!consecutivo) return null;
  
    await DataStore.delete(consecutivo);
    return consecutivo;
  }

  //----------------------------------------------------------------------------------------

  async getConsecutivoByAlmacenAndCodigo(almacenId: any, codigo: any): Promise<LazyConsecutivo | null> {


      const consecutivo = await DataStore.query(Consecutivo, (p) =>
      p.and((p) => [p.consecutivoAlmacenId.eq(almacenId),p.codigo.eq(codigo)])
      );
      if (!consecutivo) {
        throw new CustomNotification("No se pudo obtener el consecutivo.", 404);
       }  

      return consecutivo[0];

  }

  async updateConsecutivo(id: string): Promise<LazyConsecutivo | null> {
    const consecutivo = await DataStore.query(Consecutivo, id);
    if (!consecutivo) {
      throw new CustomNotification("Consecutivo no encontrado.", 404);
    }
    return await DataStore.save(Consecutivo.copyOf(consecutivo, (updated) => {
      updated.consecutivo =
        consecutivo.consecutivo + 1 || consecutivo.consecutivo;
    }));
  }
  
  
}