// useApi.js
import { DataStore, Predicates, SortDirection } from "aws-amplify";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Inventario, Producto } from "../../models";
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

export function useModelInventarioByAlmacenId(inventarioAlmacenId) {




  const [inventarioAlmacen, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {

    const subscription = DataStore.observeQuery(
      Inventario,
      (p) =>
        p.and((p) => [
          p.inventarioAlmacenId.eq(inventarioAlmacenId)
        ]),
      {
        sort: (s) => s.createdAt(SortDirection.ASCENDING),
      }
    ).subscribe(async (snapshot) => {
      const { items } = snapshot;



      const data = await Promise.all(
        items.map(async (item) => {
          const producto = await item.Producto;
          return { ...item, Producto: producto };
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


  }, [inventarioAlmacenId])


  return { loading, inventarioAlmacen, error };
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


