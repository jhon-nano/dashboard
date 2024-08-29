
import { Estado, LazyProducto, Producto, ProductoProveedor } from "../models";
import CustomNotification from "../models/CustomNotification";
import InventarioService from "../services/inventarioService";
import ProductoService from "../services/productoService";
import TypesProductos from "../types/typesProductos";
import FormatUtils from "../utils/formatUtils";
import ProductosUtils from "../utils/productosUtils";
import { openCreateProducto } from './../store/actions/productos';


export default class ProductosHelpers {

  private moduloProductos: TypesProductos;
  private confirm: any;
  private notificacion: any;
  private router: any;
  private dispatch : any;
  private serviceProducto: ProductoService;
  private serviceInventario: InventarioService;
  private utilsFormat : FormatUtils;
  private utilsProducto : ProductosUtils;
  private store: any;


  constructor(store: any,dispatch : any,confirm : any,notificacion : any,router : any) {
    this.dispatch = dispatch;
    this.confirm = confirm;
    this.notificacion = notificacion;
    this.router = router;
    this.store = store;
    this.moduloProductos = new TypesProductos(router)
    this.serviceProducto = new ProductoService();
    this.serviceInventario = new InventarioService();
    this.utilsFormat = new FormatUtils();
    this.utilsProducto = new ProductosUtils();
  }



  onSubmitCreateProducto = (data: any) => {
    console.log(data)
    this.confirm({
      title: "Confirma que desea Crear el Producto?",
      description: "Presione el botón CONFIRMAR para REGISTRAR.",
      confirmationText: "CONFIRMAR",
      confirmationButtonProps: {
        variant: "contained",
        color: "primary",
      },
      cancellationText: "CANCELAR",
      cancellationButtonProps: {
        variant: "outlined",
        color: "primary",
      },
    })
    .then(async () => {
      try {
        //console.log(data.barras)

        if(data.barras !== undefined || data.barras !== ""){
        
        }


        if (typeof data.barras !== "undefined" && data.barras !== "") {
          await this.serviceProducto.validarBarraDisponible(data.barras) // validar codigo de barras
        } 


        const formattedData = this.utilsFormat.formatProductoData(data); // Formatear y validar los datos utilizando los "helpers"

        const producto = await this.serviceProducto.create(formattedData, data.Consecutivo); // Guardar el Producto con los datos formateados
        //console.log(producto)
        if (producto !== null && this.store.open_producto == true) {
          this.notificacion("Producto Registrado!", {
            variant: "successCreate",
            autoHideDuration: 5000,
            detalle: producto.nombreProducto,
            push: () => this.moduloProductos.pushPathView(producto.id,'/producto')
          });

          this.dispatch(openCreateProducto(false))

        } else if(producto !== null && this.store.open_producto == false) {

          this.notificacion("Producto Registrado!", {
            variant: "success",
          });

          this.moduloProductos.pushPathView(producto.id,'/producto')
        }
      } catch (error: any) {
        console.error(error);
        if (error instanceof CustomNotification) {
          // Mostrar notificación de error
          error.showNotification(this.notificacion);
        }else{
          const error_500 = new CustomNotification(error.message,500);
          error_500.showNotification(this.notificacion);
        }
        return false
      }
    })
    .catch((error: any) => {
      console.error(error)
    });
  }

  onSubmitUpdateProducto = (data: any) => {

    this.confirm({
      title: "Confirma que desea Actualizar el Producto?",
      description: "Presione el botón CONFIRMAR para ACTUALIZAR.",
      confirmationText: "CONFIRMAR",
      confirmationButtonProps: {
        variant: "contained",
        color: "primary",
      },
      cancellationText: "CANCELAR",
      cancellationButtonProps: {
        variant: "outlined",
        color: "primary",
      },
    })
    .then(async () => {
      try {


        const formattedData = this.utilsFormat.formatProductoUpdateData(data); // Formatear y validar los datos utilizando los "helpers"


        const producto = await this.serviceProducto.update(data.id,formattedData); // Guardar el Producto con los datos formateados
        //console.log(producto)
        if (producto !== null) {
          this.notificacion("Producto Actualizado!", {
            variant: "success",
          });
          this.moduloProductos.pushPathView(producto.id,'/producto')

        }
      } catch (error: any) {
        console.error(error)
        if (error instanceof CustomNotification) {
          // Mostrar notificación de error
          error.showNotification(this.notificacion);
        }else{
          const error_500 = new CustomNotification(error.message,500);
          error_500.showNotification(this.notificacion);
        }
        return false
      }
    })
    .catch((error: any) => {
      console.error(error)
    });
  }

  onSubmitCreateProveedor = (producto_xml: any, proveedor: any,  producto: Producto, append: any) => {

    this.confirm({
      title: "Confirma que desea Agregar la Referencia?",
      description: "Presione el botón CONFIRMAR para ACTUALIZAR.",
      confirmationText: "CONFIRMAR",
      confirmationButtonProps: {
        variant: "contained",
        color: "primary",
      },
      cancellationText: "CANCELAR",
      cancellationButtonProps: {
        variant: "outlined",
        color: "primary",
      },
    })
    .then(async () => {
      try {

        const codigoProveedor = new ProductoProveedor({ codigo: producto_xml.Identification, nit_proveedor: proveedor });

        let array: any[] = [];
        //console.log(producto);
        
        if (producto && producto.Proveedores) {
          array = producto.Proveedores.slice(); // Clona el array existente si existe
        }
        
        array.push(codigoProveedor);
        
        //console.log(array);
        
        const product = await this.serviceProducto.gestionarProveedor(array, producto);
        
        if (product) {

          append({
            item: product,
            cantidadItem: producto_xml.InvoicedQuantity,
            costoItem: producto_xml.PriceAmount,
            ivaItem: producto_xml.PriceAmount * (product.iva / 100),
            totalItem: producto_xml.InvoicedQuantity * producto_xml.PriceAmount
          });
        }


      } catch (error: any) {
        console.error(error)
        if (error instanceof CustomNotification) {
          // Mostrar notificación de error
          error.showNotification(this.notificacion);
        }else{
          const error_500 = new CustomNotification(error.message,500);
          error_500.showNotification(this.notificacion);
        }
        return false
      }
    })
    .catch((error: any) => {
      console.error(error)
    });
  }


  handleUpdateProducto (producto: any) {
    this.confirm({
      title: "Confirma que desea Editar el Producto?",
      description: "Presione el botón CONFIRMAR para ir a editarlo.",
      confirmationText: "CONFIRMAR",
      confirmationButtonProps: {
        variant: "contained",
        color: "primary",
      },
      cancellationText: "CANCELAR",
      cancellationButtonProps: {
        variant: "outlined",
        color: "error",
      },
    })
    .then( () => this.moduloProductos.pushPathUpdate(producto.id,'/producto'))
    .catch((error: any) => {
      if (error instanceof CustomNotification) {
        // Mostrar notificación de error
        error.showNotification(this.notificacion);
      }else{
        const error_500 = new CustomNotification('Cancelo',500);
        error_500.showNotification(this.notificacion);
      }
    });


  }

  handleInactivarProducto (id: any) {
    this.confirm({
      title: "Confirma que desea Inactivar el Producto?",
      description: "Presione el botón CONFIRMAR para INACTIVAR.",
      confirmationText: "CONFIRMAR",
      confirmationButtonProps: {
        variant: "contained",
        color: "primary",
      },
      cancellationText: "CANCELAR",
      cancellationButtonProps: {
        variant: "outlined",
        color: "error",
      },
    })
    .then(async () => {


      const inventario = await this.serviceInventario.getInventarioByProducto(id);

      inventario?.map((element) => {
        if(element.inventario > 0){
          throw new CustomNotification("Productos con Saldo.", 404);
        }
      })


      const producto = this.serviceProducto.delete(id)

      if (producto !== null) {
        this.notificacion("Producto Inactivo!", {
          variant: "success",
        });
    
        
    }
    })
    .catch((error: any) => {
      if (error instanceof CustomNotification) {
        // Mostrar notificación de error
        error.showNotification(this.notificacion);
      }else{
        const error_500 = new CustomNotification(error.message,500);
        error_500.showNotification(this.notificacion);
      }
    });


  }

  handleStarImagen (id: any, key:any) {
    this.confirm({
      title: "Colocar Imagen como Principal?",
      confirmationText: "CONFIRMAR",
      confirmationButtonProps: {
        variant: "contained",
        color: "primary",
      },
      cancellationText: "CANCELAR",
      cancellationButtonProps: {
        variant: "outlined",
        color: "error",
      },
    })
    .then(async () => {

      this.serviceProducto.updateImagen(id,key);
    
    })
    .catch((error: any) => {
      if (error instanceof CustomNotification) {
        // Mostrar notificación de error
        error.showNotification(this.notificacion);
      }else{
        const error_500 = new CustomNotification(error.message,500);
        error_500.showNotification(this.notificacion);
      }
    });


  }


  onRowAddTableProducto = (newData: any): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
          try {

              const productoData = new Producto({
                codigo: newData.codigo,
                nombreProducto: newData.nombreProducto?.toUpperCase(),
                iva: newData.iva,
                presentacion: String(newData.presentacion),
                barras: String(newData.barras),
                productoCategoriaId: newData.productoCategoriaId,
                productoLineaId: newData.productoLineaId,
                productoMarcaId: newData.productoMarcaId,
                estado: Estado.ACTIVO,
              });
            
              await this.serviceProducto.createAll(productoData);
            

              resolve();
          } catch (error: any) {
              reject()
              this.notificacion(error.message, {
                  variant: "error",
              });
          }
      }, 1000);
      })
  };



}


