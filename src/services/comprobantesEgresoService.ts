import { DataStore } from "aws-amplify";
import { ComprobanteEgreso, LazyComprobanteEgreso } from "../models";
import CustomNotification from "../models/CustomNotification";
import { BaseService } from "./../utils/baseService";
import ConsecutivoService from "./consecutivoServices";

export interface IComprobantesEgresoService {


}

export default class ComprobantesEgresoService extends BaseService<ComprobanteEgreso> implements IComprobantesEgresoService {



}
