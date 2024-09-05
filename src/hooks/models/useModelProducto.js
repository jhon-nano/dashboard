// useApi.js
import { DataStore, Predicates, SortDirection } from "aws-amplify";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AjusteInventarioItem, Categoria, CompraItem, Inventario, PedidoItem, Producto } from "../../models";
import { queryProductos } from "../../store/actions/productos";

export function useModelProductoById(id) {



  const [loading, setLoading] = useState(true);  // Estado para controlar si la carga está en progreso
  const [producto, setProducto] = useState(null);  // Estado para almacenar los datos del modelo
  const [linea, setLinea] = useState();
  const [categoria, setCategoria] = useState();
  const [marca, setMarca] = useState();
  const [error, setError] = useState();  // Estado para almacenar un posible error que ocurra al obtener los datos

  // Efecto secundario que se ejecuta cuando el ID cambia
  useEffect(() => {
    // Verificar si se ha proporcionado un ID válido
    if (id !== undefined) {
      // Observar los cambios en el modelo específico filtrado por su ID
      const sub = DataStore.observeQuery(Producto, (c) => c.id.eq(id)).subscribe(
        async ({ items }) => {
          // Actualizar los datos del modelo con el primer item recibido (debe haber solo uno)


          try {


            const { Linea, Categoria, Marca, Proveedores } = items[0];
            const linea = await Linea;


            const categoria = await Categoria;


            const marca = await Marca;


            //consultar por nit_proveedor el Tercero.
            //const resultadosServicio = await Promise.all(
            //  Proveedores ?
            //    Proveedores?.map(async e => {
            //      const tercero = await serviceTercero.getTerceroByIdentificacion(e.nit_proveedor)
            //      return {
            //        ...e,
            //        Tercero: tercero
            //      }
            //    }) : []);
            //
            setLinea(linea);
            setCategoria(categoria)
            setMarca(marca);
            setProducto(
              {
                ...items[0],
                linea: linea,
                categoria: categoria,
                marca: marca,
                Linea: linea,
                Categoria: categoria,
                Marca: marca,
                //Proveedores: resultadosServicio
              });

          } catch (error) {
            console.error('Error al obtener los datos:', error);
          }




          setLoading(false);    // Finalizar la carga estableciendo loading en falso
        },
        (error) => {
          setError(error);      // Manejar cualquier error que ocurra durante la obtención de los datos
          setLoading(false);    // Finalizar la carga con error estableciendo loading en falso
        }
      );




      // Función de limpieza que se ejecuta cuando el componente se desmonta o el ID cambia
      return () => {
        sub.unsubscribe(); // Desuscribirse de las actualizaciones del modelo para evitar fugas de memoria
        setProducto(null);// Restablecer los datos almacenados para evitar cambios inesperados
        setLinea(null);
        setCategoria(null);
        setMarca(null);


      };
    }
  }, [id]);

  // Devolver los resultados del hook: loading, data y error
  return { loading, producto, linea, categoria, marca, error };
}

export function useModelInventarioByProductoId(inventarioProductoId) {




  const [inventarioProducto, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {

    const subscription = DataStore.observeQuery(
      Inventario,
      (p) =>
        p.and((p) => [
          p.inventarioProductoId.eq(inventarioProductoId)
        ]),
      {
        sort: (s) => s.createdAt(SortDirection.ASCENDING),
      }
    ).subscribe(async (snapshot) => {
      const { items } = snapshot;



      const data = await Promise.all(
        items.map(async (item) => {
          const almacen = await item.Almacen;
          return { ...item, Almacen: almacen };
        })
      );

      setData(data);
      setLoading(false);


    });

    return () => {
      subscription.unsubscribe();
      setData([]);
      setLoading(false);
    };


  }, [inventarioProductoId])


  return { loading, inventarioProducto, error };
};
export function useModelProductos() {

  const dispatch = useDispatch();
  const productoStore = useSelector((state) => state.productos);

  const { productos } = productoStore;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {

    if (productos.length == 0) {
      setLoading(true)
    }
    const sub_productos = DataStore.observeQuery(Producto, Predicates.ALL, {
      sort: (s) => s.codigo(SortDirection.DESCENDING),
    }).subscribe((snapshot) => {
      const { items, isSynced } = snapshot;

      dispatch(queryProductos(items));
      setLoading(false)

    });




    return () => {
      sub_productos.unsubscribe();

    };


  }, [])


  return { loading, error };
};




export function useModelCategoriasAndAtributos() {


  const [data, setCategorias] = useState([]);

  const [atributos, setAtributos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const sub_categorias = DataStore.observeQuery(Categoria, Predicates.ALL).subscribe(
      (snapshot) => {
        const { items, isSynced } = snapshot;

        setCategorias(items);

      }
    );


    return () => {

      setLoading(false);
      setCategorias([]);
      sub_categorias.unsubscribe();
      //sub_categoria_atributos.unsubscribe();
    };
  }, []);








  return { loading, data, error };
};

export function useModelKardexProductoId(productoId) {




  const [inventariosItemProducto, setDataInventario] = useState([]);
  const [comprasItemProducto, setDataCompra] = useState([]);
  const [pedidoItemProducto, setDataPedido] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {

    const subscription = DataStore.observeQuery(
      AjusteInventarioItem,
      (p) =>
        p.and((p) => [
          p.ajusteInventarioItemProductoId.eq(productoId)
        ]),
      {
        sort: (s) => s.createdAt(SortDirection.ASCENDING),
      }
    ).subscribe(async (snapshot) => {
      const { items } = snapshot;

      setLoading(true)

      if (items.length > 0) {
        const data = await Promise.all(
          items.map(async (item) => {
            const producto = await item.Producto;
            return { ...item, Producto: producto };
          })
        );

        setDataInventario(data);
        setLoading(false);
      }


    });

    return () => {
      subscription.unsubscribe();

    };
  }, [productoId])


  useEffect(() => {

    const subscription = DataStore.observeQuery(
      CompraItem,
      (p) =>
        p.and((p) => [
          p.compraItemProductoId.eq(productoId)
        ]),
      {
        sort: (s) => s.createdAt(SortDirection.ASCENDING),
      }
    ).subscribe(async (snapshot) => {
      const { items } = snapshot;

      setLoading(true)

      if (items.length > 0) {
        const data = await Promise.all(
          items.map(async (item) => {
            const compra = await item.Compra;
            return { ...item, Compra: compra };
          })
        );

        setDataCompra(data);
        setLoading(false);
      }


    });

    return () => {
      subscription.unsubscribe();

    };




  }, [productoId])

  useEffect(() => {

    const subscription = DataStore.observeQuery(
      PedidoItem,
      (p) =>
        p.and((p) => [
          p.pedidoItemProductoId.eq(productoId)
        ]),
      {
        sort: (s) => s.createdAt(SortDirection.ASCENDING),
      }
    ).subscribe(async (snapshot) => {
      const { items } = snapshot;

      setLoading(true)

      if (items.length > 0) {
        const data = await Promise.all(
          items.map(async (item) => {
            const pedido = await item.Pedido;
            return { ...item, Pedido: pedido };
          })
        );

        setDataPedido(data);
        setLoading(false);
      }


    });

    return () => {
      subscription.unsubscribe();

    };




  }, [productoId])

  return { loading, inventariosItemProducto, comprasItemProducto, pedidoItemProducto, error };
};

export function useModelKardexProductoIdByAlmacenId(productoId, almacenId) {




  const [inventariosItemProducto, setDataInventario] = useState([]);
  const [comprasItemProducto, setDataCompra] = useState([]);
  const [pedidoItemProducto, setDataPedido] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {

    const subscription = DataStore.observeQuery(
      AjusteInventarioItem,
      (p) =>
        p.and((p) => [
          p.ajusteInventarioItemProductoId.eq(productoId),
          p.ajusteInventarioItemAlmacenId.eq(almacenId)
        ]),
      {
        sort: (s) => s.createdAt(SortDirection.ASCENDING),
      }
    ).subscribe(async (snapshot) => {
      const { items } = snapshot;

      setLoading(true)

      if (items.length > 0) {
        const data = await Promise.all(
          items.map(async (item) => {
            const producto = await item.Producto;
            const ajuste = await item.AjusteInventario;
            return { ...item, Producto: producto, Ajuste: ajuste };
          })
        );

        setDataInventario(data);
        setLoading(false);
      }


    });

    return () => {
      subscription.unsubscribe();

    };
  }, [productoId])


  useEffect(() => {

    const subscription = DataStore.observeQuery(
      CompraItem,
      (p) =>
        p.and((p) => [
          p.compraItemProductoId.eq(productoId),
          p.compraItemAlmacenId.eq(almacenId)
        ]),
      {
        sort: (s) => s.createdAt(SortDirection.ASCENDING),
      }
    ).subscribe(async (snapshot) => {
      const { items } = snapshot;

      setLoading(true)

      if (items.length > 0) {
        const data = await Promise.all(
          items.map(async (item) => {
            const compra = await item.Compra;
            const tercero = await compra.Tercero;
            return { ...item, Compra: compra, Tercero: tercero };
          })
        );

        setDataCompra(data);
        setLoading(false);
      }


    });

    return () => {
      subscription.unsubscribe();

    };




  }, [productoId])

  useEffect(() => {

    const subscription = DataStore.observeQuery(
      PedidoItem,
      (p) =>
        p.and((p) => [
          p.pedidoItemProductoId.eq(productoId),
          p.pedidoItemAlmacenId.eq(almacenId)
        ]),
      {
        sort: (s) => s.createdAt(SortDirection.ASCENDING),
      }
    ).subscribe(async (snapshot) => {
      const { items } = snapshot;

      setLoading(true)

      if (items.length > 0) {
        const data = await Promise.all(
          items.map(async (item) => {
            const pedido = await item.Pedido;
            const tercero = await pedido.Tercero;
            return { ...item, Pedido: pedido, Tercero: tercero };
          })
        );

        setDataPedido(data);
        setLoading(false);
      }


    });

    return () => {
      subscription.unsubscribe();

    };




  }, [productoId])

  return { loading, inventariosItemProducto, comprasItemProducto, pedidoItemProducto, error };
};
