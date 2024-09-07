import { DataStore, Predicates } from "aws-amplify";
import { LazyConsecutivo, LazyTicket, Ticket } from "../models";
import CustomNotification from "../models/CustomNotification";
import FormatUtils from "../utils/formatUtils";
import ProductosUtils from "../utils/productosUtils";
import { BaseService } from "./baseService";
import ConsecutivoService from "./consecutivoServices";



export default class ProductoService extends BaseService<Ticket>  {


  private serviceConsecutivo: ConsecutivoService;
  private utilsProducto : ProductosUtils;


  constructor() {
    super()
    this.serviceConsecutivo = new ConsecutivoService();
    this.utilsProducto = new ProductosUtils();
  }



    /// CRUD CLASE ABSTRACTA

    async getById(id: string): Promise<LazyTicket | null> {


          const ticket = await DataStore.query(Ticket, id);
        
          if (!ticket) {
            throw new CustomNotification("No se pudo obtener el ticket.", 404);
          }
    
          return ticket;

    }
    async getAll(): Promise<LazyTicket[] > {
   


      // Realiza la consulta para obtener todos los registros
      return await DataStore.query(Ticket, Predicates.ALL);

  

    }

    async create(data: any, consecutivo: LazyConsecutivo): Promise<LazyTicket |  null> {
    
      if (!consecutivo) {
        throw new CustomNotification("Error Consecutivo.", 404);
      }

      const numeracion: any = await this.serviceConsecutivo.updateConsecutivo(consecutivo.id);


      if (!numeracion) {
        throw new CustomNotification("Error Numeracion.", 404);
      }
    


      const ticket = await DataStore.save(new Ticket({
        ...data,
        consecutivo: numeracion.consecutivo,
      }))

      if (!ticket) {
        throw new CustomNotification("Ticket no registrado.", 404);
      }

      return ticket;
         
    }

 

    async update(id: string, data: LazyTicket): Promise<LazyTicket | null> {
        
      console.log(data)
            const ticket = await DataStore.query(Ticket, id);
      
            if (!ticket) {
              throw new CustomNotification("Ticket no encontrado.", 404);
            }
      
         

      
            return await DataStore.save(
              Ticket.copyOf(ticket, (updated) => {
                updated.cliente =
                data.cliente || ticket.cliente;

              })
            );
          
    }

    async delete(id: string): Promise<LazyTicket | null> {
   
        const ticket =  await DataStore.query(Ticket, id);

        if (!ticket) {
          throw new CustomNotification("Ticket no encontrado.", 404);
        }

      return  DataStore.save(Ticket.copyOf(ticket, (updated) => {
          updated.precio_venta = 0
        }));
    

    }

    //-------------------------------------------------------------------------------------------------------
    


}
