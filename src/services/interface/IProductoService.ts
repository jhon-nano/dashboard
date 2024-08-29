import { LazyProducto, LazyProductoProveedor, Producto } from "../../models";


export interface IProductoService {

    getProductosByNombre(nombre: string): Promise<Producto[] | null>;

    getProductosByBarra(barras: string): Promise<Producto[] | null>;

    getProductosByLineaId(lineaId: string): Promise<Producto[] | null>;

    getProductosByCategoriaId(categoriaId: string): Promise<Producto[] | null>;
    
    getProductosByMarcaId(marcaId: string): Promise<Producto[] | null>;

    validarBarraDisponible(barra:string): Promise<boolean>;

    gestionarProveedor(proveedor: [LazyProductoProveedor], producto: LazyProducto): Promise<LazyProducto | null>

  }