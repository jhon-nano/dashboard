// services/CarteraProveedoresService.ts
import { DataStore } from "aws-amplify";
import { CarteraProveedores } from "../models";
import CustomNotification from "../models/CustomNotification";
import { BaseService } from "../utils/baseService";

export interface ICarteraProveedoresService {
  actualizarSaldo(carteraId: string, abono: number): Promise<CarteraProveedores | null>;
}

export default class CarteraProveedoresServices extends BaseService<CarteraProveedores> implements ICarteraProveedoresService {
  async actualizarSaldo(carteraId: string, abono: number): Promise<CarteraProveedores | null> {
    // Buscar la CarteraProveedores por su ID

    const cartera = await this.getById(carteraId);

    if (!cartera) {
      throw new CustomNotification("CarteraProveedores no encontrado.", 404);
    }
    
    return await DataStore.save(
      CarteraProveedores.copyOf(cartera, (updated) => {
        updated.saldo = Number(cartera.saldo) - Number(abono);
      })
    );
  }
}
