import TypesAlmacenes from "./typesAlmacenes";
import TypesConfiguracion from "./typesConfiguracion";
import TypesConsecutivos from "./typesConsecutivos";
import TypesInformes from "./typesInformes";
import TypesProductos from "./typesProductos";
import TypesTickets from "./typesTickets";
import TypesUsuarios from "./typesUsuario";


class TypesModulos {

  
  almacenes: TypesAlmacenes;
  configuracion: TypesConfiguracion;
  consecutivo: TypesConsecutivos;
  productos: TypesProductos;
  usuarios: TypesUsuarios;
  informes: TypesInformes;
  tickets: TypesTickets;



    constructor(router: any) {
        // Crear instancias de los módulos
        this.almacenes= new TypesAlmacenes(router);
        this.tickets= new TypesTickets(router);
        this.configuracion = new TypesConfiguracion(router);
        this.consecutivo = new TypesConsecutivos(router);
        this.productos= new TypesProductos(router);
        this.usuarios= new TypesUsuarios(router);
        this.informes= new TypesInformes(router);
    }



    static StoreConstants: Record<string, string> = {
        LOADING_PAGINA: "LOADING_PAGINA",
        STOP_LOADING_PAGINA: "STOP_LOADING_PAGINA",
        NETWORK_STATUS: "NETWORK_STATUS",
        OUT_BOX_STATUS: "OUT_BOX_STATUS",
    };

    getModulo(path: string){

      const modulo =  this.getModulosApp().find((element) => element.path == path);


      return modulo 
    }

    getModulosApp(){
      return [

        this.productos,
        this.tickets,
        this.informes,


   
 
        this.configuracion,
      ]
    }

    getModulosAppAll(){
      return [

        this.informes,
        this.tickets,
        this.productos,

        this.configuracion,
      ]
    }

    getPermisoByModuloAndCode(modulo: any, code: string){
      switch (modulo.path) {

        case this.almacenes.path: 
          return  TypesAlmacenes.Permisos[code]
        case this.configuracion.path: 
          return  TypesConfiguracion.Permisos[code]
        case this.consecutivo.path: 
          return  TypesConsecutivos.Permisos[code]
        case this.productos.path: 
          return  TypesProductos.Permisos[code]
        case this.usuarios.path: 
          return  TypesUsuarios.Permisos[code]
        case this.informes.path:
          return TypesInformes.Permisos[code]
        case this.tickets.path:
          return TypesTickets.Permisos[code]
        default:
          return {}
      }
    }

    getPermisos(modulo: any) {

          switch (modulo.path) {
            case this.almacenes.path:
                return TypesAlmacenes.Permisos;
            case this.configuracion.path:
                return TypesConfiguracion.Permisos;
            case this.consecutivo.path:
                return TypesConsecutivos.Permisos;
            case this.productos.path:
                return TypesProductos.Permisos;
            case this.usuarios.path:
                return TypesUsuarios.Permisos;
            case this.informes.path:
                return TypesInformes.Permisos;
            case this.tickets.path:
                return TypesTickets.Permisos;
            default:
                return [];
        }
    }

  }
  
  export default TypesModulos;