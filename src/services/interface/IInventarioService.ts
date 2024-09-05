import { Almacen, Inventario, LazyInventario, Producto } from "../../models";



export interface IInventarioService {

  getInventarioByAlmacenAndProducto(productoId: string,almacenId: string): Promise<Inventario | null>;

  actualizarPrecio(inventarioId: string, precio: number): Promise<Inventario | null>;


  actualizarInventario(almacenId: string, productoId: string, cantidad:number, costo:number, precio: number): Promise<LazyInventario | null>;

  }
