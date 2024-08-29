import { DataStore } from "aws-amplify";
import { ComprobanteEgreso, ComprobanteEgresoDocumento, LazyComprobanteEgreso } from "../models";
import CustomNotification from "../models/CustomNotification";
import { BaseService } from "../utils/baseService";
import ConsecutivoService from "./consecutivoServices";

export interface IComprobantesEgresoDocumentoService {


}

export default class ComprobantesEgresoDocumentoService extends BaseService<ComprobanteEgresoDocumento> implements IComprobantesEgresoDocumentoService {



}
