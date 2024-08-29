import { DataStore, SortDirection } from "aws-amplify";
import { useEffect, useState } from "react";
import { Inventario } from "../../models";
import { useSelector, useDispatch } from "react-redux";
import { loadingInventarios, queryInventarios } from "../../store/actions/inventarios";

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

export function useModelIDInventario(id) {

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState();



  useEffect(() => {
    if (id !== undefined || id !== null) {
      const sub = DataStore.observeQuery(Inventario, (c) => c.id.eq(id)).subscribe(
        ({ items }) => {





          Promise.all(
            items.map(async (elemento) => {


              const almacen = await elemento.Almacen;
              const producto = await elemento.Producto;
              const linea = await producto.Linea || { id: 'undefined', nombreLinea: 'Línea sin especificar' };
              const categoria = await producto.Categoria || { id: 'undefined', nombreCategoria: 'Categoria sin especificar' };
              const marca = await producto.Marca || { id: 'undefined', nombreMarca: 'Marca sin especificar' };

              return {
                ...elemento,
                Almacen: almacen,
                Producto: {
                  ...producto,
                  Linea: linea,
                  Categoria: categoria,
                  Marca: marca
                }
              }
            })).then((data) => {

              setData(data[0])
              //dispatch(queryCredito(data[0]))
              setLoading(false);
            })
            .catch((e) => setError(e))
            .finally((e) => {
              setLoading(false);
            });
        }
      );
      return () => {
        setData([]);
        //dispatch(queryCredito());

        sub.unsubscribe();
      };
    }
  }, [id]);

  return { loading, data, error };
}

export function useModelInventarios() {

  const { almacenesAutorizados } = useSelector((state) => state.usuario);
  const { inventarios } = useSelector((state) => state.inventarios);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);



  useEffect(() => {
    console.log('useEffect')


    console.log('almacenesAutorizados')
    if (inventarios.length == 0) {
      setLoading(true)
    }

    const sub = DataStore.observeQuery(
      Inventario,
      (p) =>
        p.or((p) =>
          almacenesAutorizados.map(almacenId => p.inventarioAlmacenId.eq(almacenId.id))
        )
    ).subscribe(({ items, isSynced }) => {
  
      Promise.all(items.map(async (elemento) => {

        const almacen = await elemento.Almacen;
        const producto = await elemento.Producto;
        // Verificar si Linea está definido
        let linea = undefined;
        if (producto.Linea !== undefined) {
          linea = await producto.Linea;
        }
        // Verificar si Categoria está definido
        let categoria = undefined;
        if (producto.Categoria !== undefined) {
          categoria = await producto.Categoria;
        }
        // Verificar si Linea está definido
        let marca = undefined;
        if (producto.Marca !== undefined) {
          marca = await producto.Marca;
        }

        return {
          ...elemento,
          Almacen: almacen,
          Producto: {
            ...producto,
            Linea: linea,
            Categoria: categoria,
            Marca: marca
          },
        };

      })).then((data) => dispatch(queryInventarios(data))
      ).catch((e) => console.error(e)
      ).finally((e) => {
        setLoading(false)
      });
    });

    return () => {
      sub.unsubscribe();
      dispatch(loadingInventarios(false));
    };

  }, [almacenesAutorizados]);


  return { loading };
}

export function useModelInventarioByAlmacenId(inventarioAlmacenId) {




  const [inventarioAlmacen, setData] = useState([]);
  const [loading, setLoading] = useState(false);
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

      setLoading(true)

      if (items.length > 0) {
        const data = await Promise.all(
          items.map(async (item) => {
            const producto = await item.Producto;

            let categoria = undefined;
            if (item.Producto?.Categoria !== undefined) {
              categoria = await producto.Categoria;
            }



            return { ...item, Producto: { ...producto, Categoria: categoria } };
          })
        );

        setData(data);
        setLoading(false);
      }


    });

    return () => {
      subscription.unsubscribe();

    };




  }, [inventarioAlmacenId])



  return { loading, inventarioAlmacen, error };
};

export function useInventarioInformeAlmacenes(data, filter) {


  const [resultado, setResult] = useState([]);
  const [resultadoF, setResultF] = useState([]);
  const [labels, setLabels] = useState([]);
  const [cantidad, setCantidad] = useState([]);
  const [campo, setCampo] = useState("total");

  let numberFormat = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  });
  const [filtro, setFiltro] = useState('')


  useEffect(() => {
    switch (filter) {
      case 'day':
        return setFiltro('DD/MM')
      case 'week':
        return setFiltro('ww')
      case 'month':
        return setFiltro('MMMM')

      default:
        break;
    }
  }, [filter])





  const [datasets, setDatasets] = useState([
    {
      label: "Total",
      data: cantidad,
    },
  ]);
  const options = {
    responsive: true,
    animation: {
      animateRotate: true,
      animateScale: true,
    },
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,

        text: campo.toUpperCase() + " DE PEDIDOS MENSUALES x ALMACENES",
      },
    },
  };

  useEffect(() => {
    if (data?.length > 0) {
      var result = [];

      data.reduce(function (res, value) {
        if (!res[value.inventarioAlmacenId]) {
          res[value.inventarioAlmacenId] = {
            almacen: value.inventarioAlmacenId,
            codigo: value.Almacen.codigo,
            nombreAlmacen: value.Almacen.nombreAlmacen,
            cantidad: 0,
            costo: 0,
            total: 0,
            data: [],
          };
          result.push(res[value.inventarioAlmacenId]);
        }
        res[value.inventarioAlmacenId].cantidad += 1;
        res[value.inventarioAlmacenId].total += value.subtotal;
        res[value.inventarioAlmacenId].total += value.total;
        res[value.inventarioAlmacenId].data.push(value);
        return res;
      }, {});
      //console.log(result)
      var result_fecha = [];


      //console.log(result_fecha)
      setResultF(result_fecha);

      setLabels(
        result_fecha
          .sort(function (a, b) {
            a = new Date(a.fecha);
            b = new Date(b.fecha);
            return a < b ? -1 : a > b ? 1 : 0;
          })
          .map((item) => {
            if (campo == "cantidad") {
              return item.mes + "(" + item.cantidad + ")";
            } else if (campo == "total") {
              return item.mes + "(" + numberFormat.format(item.total) + ")";
            }
          })
      );

      setResult(result);
    }
  }, [data, campo, filtro]);

  useEffect(() => {
    setDatasets(
      resultado.map(function (compra) {
        var resultad = resultadoF.map((mes) => {
          const data = mes.data.filter(
            (compraf) => compraf.inventarioAlmacenId == compra.almacen
          );
          return data;
        });

        return {
          label: compra.nombreAlmacen,
          data: resultad.map((item) => {
            //console.log(item);
            if (campo == "cantidad") {
              return item.length;
            } else if (campo == "total") {
              const sumall = item
                .map((item) => item.total)
                .reduce((prev, curr) => prev + curr, 0);

              return sumall;
            }
          }),
          backgroundColor: "#" + Math.random().toString(16).substr(-6),
          borderColor: "#" + Math.random().toString(16).substr(-6),
          borderWidth: 2,
          borderRadius: 6,
          hoverOffset: 4,
        };
      })
    );
  }, [resultado]);


  return { options, labels, datasets }

}

export default { useModelInventarios, useModelIDInventario, useModelInventarioByProductoId }