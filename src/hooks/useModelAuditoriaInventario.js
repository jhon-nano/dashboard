// useApi.js
import { DataStore, Predicates, SortDirection } from "aws-amplify";
import { useEffect, useState } from "react";
import { AjusteInventarioItem, CompraItem, Inventario, PedidoItem, Producto, TipoCompras } from "../models";


export function useModelAuditoriaInventario() {
  const [loading, setLoading] = useState(false);
  const [inventario, setDataInventario] = useState([]);
  const [inventarioCombinado, setData] = useState([]);
  const [compraItem, setDataCompraItem] = useState([]);
  const [pedidoItem, setDataPedidoItem] = useState([]);
  const [ajusteItem, setDataAjusteItem] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {

    const sub = DataStore.observeQuery(Inventario, Predicates.ALL, {
      sort: (s) => s.createdAt(SortDirection.DESCENDING),
    }).subscribe((snapshot) => {
      const { items, isSynced } = snapshot;



      Promise.all(
        items.map(async (elemento) => {
          const producto = await elemento.Producto;
  

          return {
            ...elemento,
            Producto: producto,
          };
        })).then((data) => {
          // Utilizamos reduce para agrupar y realizar las operaciones necesarias
          setDataInventario(data);
          setLoading(false);
        })

        .catch((e) => console.error(e))
        .finally((e) => {
          setLoading(false)
        });




    });

    return () => {
      setDataInventario([]);
      sub.unsubscribe();
      setLoading(false);
    };
  }, []);


  useEffect(() => {

    const sub = DataStore.observeQuery(CompraItem, Predicates.ALL, {
      sort: (s) => s.createdAt(SortDirection.DESCENDING),
    }).subscribe(async (snapshot) => {
      const { items, isSynced } = snapshot;

      Promise.all(
        items.map(async (elemento) => {
          const producto = await elemento.Producto;
          const compra = await elemento.Compra;

          return {
            cantidad: elemento.cantidad,
            Producto: producto,
            Compra: compra,
            productoId: producto.id
          };
        })).then((data) => {
          // Utilizamos reduce para agrupar y realizar las operaciones necesarias
          const productosAgrupados = data.reduce((acumulador, compraItem) => {
            const idProducto = compraItem.Producto.id;
            if (!acumulador[idProducto]) {
              // Si el producto aún no está en el acumulador, lo inicializamos
              if (compraItem.Compra.tipo_compra == TipoCompras.COMPRA) {
                acumulador[idProducto] = {
                  ...compraItem,
                  cantidad: Number(compraItem.cantidad),

                };
              } else if (compraItem.Compra.tipo_compra == TipoCompras.DEVOLUCION) {
                acumulador[idProducto] = {
                  ...compraItem,
                  cantidad: Number(compraItem.cantidad) * -1,

                };
              }
            } else {
              // Si el producto ya está en el acumulador, sumamos las cantidades y totales
              if (compraItem.Compra.tipo_compra == TipoCompras.COMPRA) {
                acumulador[idProducto].cantidad += Number(compraItem.cantidad);
              } else if (compraItem.Compra.tipo_compra == TipoCompras.DEVOLUCION) {
                acumulador[idProducto].cantidad -= Number(compraItem.cantidad);
              }
            }
            return acumulador;
          }, []);

          // Calculamos el costo promedio dividiendo el costo total entre la cantidad total
          // for (const idProducto in productosAgrupados) {
          //  productosAgrupados[idProducto].costoItem /= productosAgrupados[idProducto].cantidadItem;
          //  productosAgrupados[idProducto].precio /= productosAgrupados[idProducto].cantidadItem;
          //}


          setDataCompraItem(Object.values(productosAgrupados));
        })

        .catch((e) => console.error(e))
        .finally((e) => {
          setLoading(false)
        });





      setLoading(false);
    });

    return () => {
      setDataCompraItem([]);
      sub.unsubscribe();
      setLoading(false);
    };
  }, []);

  useEffect(() => {

    const sub = DataStore.observeQuery(PedidoItem, Predicates.ALL, {
      sort: (s) => s.createdAt(SortDirection.DESCENDING),
    }).subscribe(async (snapshot) => {
      const { items, isSynced } = snapshot;

      Promise.all(
        items.map(async (elemento) => {
          const producto = await elemento.Producto;
          const pedido = await elemento.Pedido;

          return {
            cantidad: elemento.cantidad,
            Producto: producto,
            Pedido: pedido,
            productoId: producto.id
          };
        })).then((data) => {
          // Utilizamos reduce para agrupar y realizar las operaciones necesarias
          const productosAgrupados = data.reduce((acumulador, pedidoItem) => {
            const idProducto = pedidoItem.Producto.id;
            if (!acumulador[idProducto]) {
              // Si el producto aún no está en el acumulador, lo inicializamos
              acumulador[idProducto] = {
                ...pedidoItem,
                cantidad: Number(pedidoItem.cantidad) * -1,

              };

            } else {
              // Si el producto ya está en el acumulador, sumamos las cantidades y totales
              acumulador[idProducto].cantidad -= Number(pedidoItem.cantidad);

            }
            return acumulador;
          }, []);

          // Calculamos el costo promedio dividiendo el costo total entre la cantidad total
          // for (const idProducto in productosAgrupados) {
          //  productosAgrupados[idProducto].costoItem /= productosAgrupados[idProducto].cantidadItem;
          //  productosAgrupados[idProducto].precio /= productosAgrupados[idProducto].cantidadItem;
          //}


          setDataPedidoItem(Object.values(productosAgrupados));
        })

        .catch((e) => console.error(e))
        .finally((e) => {
          setLoading(false)
        });





      setLoading(false);
    });

    return () => {
      setDataCompraItem([]);
      sub.unsubscribe();
      setLoading(false);
    };
  }, []);

  useEffect(() => {

    const sub = DataStore.observeQuery(AjusteInventarioItem, Predicates.ALL, {
      sort: (s) => s.createdAt(SortDirection.DESCENDING),
    }).subscribe(async (snapshot) => {
      const { items, isSynced } = snapshot;

      Promise.all(
        items.map(async (elemento) => {
          const producto = await elemento.Producto;


          return {
            cantidad: elemento.cantidad,
            Producto: producto,
            productoId: producto.id

          };
        })).then((data) => {
          // Utilizamos reduce para agrupar y realizar las operaciones necesarias
          const productosAgrupados = data.reduce((acumulador, pedidoItem) => {
            const idProducto = pedidoItem.Producto.id;
            if (!acumulador[idProducto]) {
              // Si el producto aún no está en el acumulador, lo inicializamos
              acumulador[idProducto] = {
                ...pedidoItem,
                cantidad: Number(pedidoItem.cantidad)

              };

            } else {
              // Si el producto ya está en el acumulador, sumamos las cantidades y totales
              acumulador[idProducto].cantidad += Number(pedidoItem.cantidad);

            }
            return acumulador;
          }, []);

          // Calculamos el costo promedio dividiendo el costo total entre la cantidad total
          // for (const idProducto in productosAgrupados) {
          //  productosAgrupados[idProducto].costoItem /= productosAgrupados[idProducto].cantidadItem;
          //  productosAgrupados[idProducto].precio /= productosAgrupados[idProducto].cantidadItem;
          //}


          setDataAjusteItem(Object.values(productosAgrupados));
        })

        .catch((e) => console.error(e))
        .finally((e) => {
          setLoading(false)
        });





      setLoading(false);
    });

    return () => {
      setDataCompraItem([]);
      sub.unsubscribe();
      setLoading(false);
    };
  }, []);








  useEffect(() => {

    const productosAgrupados = [...pedidoItem, ...compraItem, ...ajusteItem].reduce((acumulador, element) => {
      const idProducto = element.Producto.id;
      if (!acumulador[idProducto]) {
        // Si el producto aún no está en el acumulador, lo inicializamos
        if (element.inventarioProductoId) {
          acumulador[idProducto] = {
            ...element,
            cantidad: Number(element.cantidad)

          };
        } else {
          acumulador[idProducto] = {
            Producto: element.Producto,
            cantidad: Number(element.cantidad)

          };
        }


      } else {

        // Si el producto ya está en el acumulador, sumamos las cantidades y totales
        acumulador[idProducto].cantidad += Number(element.cantidad);

      }
      return acumulador;
    }, []);


    const inventarioCombinado = inventario.map(itemInventario => {
      // Buscar el objeto correspondiente en productosConCantidad
      const itemCantidad = Object.values(productosAgrupados).find(itemCantidad => itemCantidad.Producto.id === itemInventario.inventarioProductoId);

      // Fusionar los dos objetos en uno solo
      return {
        ...itemInventario, // Esparcir los atributos del objeto de inventario
        cantidad: itemCantidad ? itemCantidad.cantidad : 0, // Añadir la cantidad, asumiendo 0 si no se encuentra
      };
    });

    setData(inventarioCombinado)

    return () => {
      setData([])
    }
  }, [inventario, pedidoItem, ajusteItem, compraItem])



  return { loading, inventarioCombinado, error };
};





export default { useModelAuditoriaInventario };
