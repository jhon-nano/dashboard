// useApi.js
import { DataStore, SortDirection } from "aws-amplify";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Compra, CompraItem, Inventario, Pedido, PedidoItem, TipoCompras, TipoPedidos } from "../../models";
import { queryComprasInformes, queryInventariosInformes, queryPedidosInformes } from "../../store/actions/informes";

export function useModelCompras() {

  const {
    filter_fechas, compras
  } = useSelector((state) => state.informes);

  const {
    almacenesAutorizados
  } = useSelector((state) => state.usuario);

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const [data, setData] = useState(null);
  const [error, setError] = useState();

  useEffect(() => {
    if (almacenesAutorizados && almacenesAutorizados.length > 0) {

      if (compras.length == 0) {
        setLoading(true)
      }
      const sub_compras = DataStore.observeQuery(
        Compra,
        (p) =>
          p.and((p) => [
            p.tipo_compra.eq(TipoCompras.COMPRA),
            p.fecha_compra.ge(filter_fechas.start),
            p.fecha_compra.le(filter_fechas.end),
            p.or((p) =>
              almacenesAutorizados.map(almacen => p.compraAlmacenId.eq(almacen.id))
            ),
          ]),
        {
          sort: (s) => s.fecha_compra(SortDirection.ASCENDING),
        }
      ).subscribe((snapshot) => {
        const { items, isSynced } = snapshot;



        dispatch(queryComprasInformes(items));

      });




      return () => {
        sub_compras.unsubscribe();


      };
    }
  }, [almacenesAutorizados, filter_fechas]);

  return { loading, data, error };
}




export function useModelPedidos() {

  const dispatch = useDispatch();

  const { almacenesAutorizados } = useSelector((state) => state.usuario);
  const { filter_fechas, pedidos } = useSelector((state) => state.informes);

  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    if (almacenesAutorizados && almacenesAutorizados.length > 0 && filter_fechas) {


      if (pedidos.length == 0) {
        setLoading(true);
      }

      const sub = DataStore.observeQuery(
        Pedido,
        (p) =>
          p.and((p) => [
            p.tipo_pedido.eq(TipoPedidos.PEDIDO), // Filtrar por saldo diferente de 0
            p.fecha_pedido.ge(filter_fechas.start),
            p.fecha_pedido.le(filter_fechas.end),
            p.or((p) =>
              almacenesAutorizados.map(almacen => p.pedidoAlmacenId.eq(almacen.id))
            ),
          ]),
        {
          sort: (s) => s.fecha_pedido(SortDirection.ASCENDING),
        }
      ).subscribe((snapshot) => {
        const { items, isSynced } = snapshot;

        dispatch(queryPedidosInformes(items))


      });

      return () => {
        sub.unsubscribe();
        setLoading(false);
      };

    }
  }, [almacenesAutorizados, filter_fechas]);

  return { loading }

}



export function useModelInventarios() {

  const { almacenesAutorizados } = useSelector((state) => state.usuario);
  const { inventarios } = useSelector((state) => state.informes);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);



  useEffect(() => {

    const sub = DataStore.observeQuery(
      Inventario,
      (p) =>
        p.and((p) => [

          p.or((p) =>
            almacenesAutorizados.map(almacen => p.inventarioAlmacenId.eq(almacen.id))
          ),
        ]),
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

      })).then((data) => dispatch(queryInventariosInformes(data))
      ).catch((e) => console.error(e)
      ).finally((e) => {
        setLoading(false)
      });
    });

    return () => {
      sub.unsubscribe();
  
    };

  }, [almacenesAutorizados]);


  return { loading };
}




export function useModelPedidosItems(pedidos) {


  const [loading, setLoading] = useState(true);

  const [data, setData] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {


    const sub = DataStore.observeQuery(
      PedidoItem,
      (p) =>
        p.or((p) =>
          pedidos.data.map(pedido => p.pedidoItemPedidoId.eq(pedido.id))
        ),
      {
        sort: (s) => s.createdAt(SortDirection.DESCENDING),
      }
    ).subscribe((snapshot) => {
      const { items, isSynced } = snapshot;
      Promise.all(items
        .map(async (elemento) => {
          const producto = await elemento.Producto;
          const linea = await producto.Linea || { id: 'undefined', nombreLinea: 'Línea sin especificar' };
          const categoria = await producto.Categoria || { id: 'undefined', nombreCategoria: 'Categoria sin especificar' };
          const marca = await producto.Marca || { id: 'undefined', nombreMarca: 'Marca sin especificar' };

          return {
            ...elemento,
            Producto: producto,
            Linea: linea,
            Categoria: categoria,
            Marca: marca,
          };

        })).then((data) => {
          setData(data);



        })

        .catch((e) => console.error(e))
        .finally((e) => {

        });
    });

    return () => {
      sub.unsubscribe();
      setData([]);

    };

  }, [pedidos]);


  return { loading, data, error };
}



export function useInformeDiaItems(dataItems) {




  const resultado = dataItems.reduce((acc, item) => {
    // Agrupación por productos
    if (!acc.productosAgrupados[item.Producto.nombreProducto]) {
        acc.productosAgrupados[item.Producto.nombreProducto] = { nombre: item.Producto.nombreProducto , totalCantidad: 0, totalTotal: 0 };
    }
    acc.productosAgrupados[item.Producto.nombreProducto].totalCantidad += item.cantidad;
    acc.productosAgrupados[item.Producto.nombreProducto].totalTotal += item.total_item;

    // Agrupación por líneas
    if (!acc.lineasAgrupados[item.Linea.nombreLinea]) {
        acc.lineasAgrupados[item.Linea.nombreLinea] = { nombre: item.Linea.nombreLinea ,  totalCantidad: 0, totalTotal: 0 };
    }
    acc.lineasAgrupados[item.Linea.nombreLinea].totalCantidad += item.cantidad;
    acc.lineasAgrupados[item.Linea.nombreLinea].totalTotal += item.total_item;

    // Agrupación por categorías
    if (!acc.categoriasAgrupados[item.Categoria.nombreCategoria]) {
        acc.categoriasAgrupados[item.Categoria.nombreCategoria] = { nombre: item.Categoria.nombreCategoria ,  totalCantidad: 0, totalTotal: 0 };
    }
    acc.categoriasAgrupados[item.Categoria.nombreCategoria].totalCantidad += item.cantidad;
    acc.categoriasAgrupados[item.Categoria.nombreCategoria].totalTotal += item.total_item;

    // Agrupación por marcas
    if (!acc.marcasAgrupados[item.Marca.nombreMarca]) {
        acc.marcasAgrupados[item.Marca.nombreMarca] = { nombre: item.Marca.nombreMarca, totalCantidad: 0, totalTotal: 0 };
    }
    acc.marcasAgrupados[item.Marca.nombreMarca].totalCantidad += item.cantidad;
    acc.marcasAgrupados[item.Marca.nombreMarca].totalTotal += item.total_item;

    return acc;
}, {
    productosAgrupados: {},
    lineasAgrupados: {},
    categoriasAgrupados: {},
    marcasAgrupados: {}
});

  const {
    productosAgrupados,
    lineasAgrupados,
    categoriasAgrupados,
    marcasAgrupados,
} = resultado;


  return { productosAgrupados,
    lineasAgrupados,
    categoriasAgrupados,
    marcasAgrupados };
}



export function useInformeDia(data, fecha, filter, type) {
  const initialState = {
    totalVentas: 0,
    numeroItems: 0,
    subtotal: 0,
    iva: 0,
    data:[],
    almacenes: {},

  };

  const resultado = useMemo(() => {
    const startOfDay = moment(fecha).startOf(filter);
    const endOfDay = moment(fecha).endOf(filter);

    const resumen = data.reduce((acumulador, item) => {
      const fechaItem = moment(item[`${type}`]);
      if (fechaItem.isBetween(startOfDay, endOfDay, undefined, '[]')) {
        acumulador.totalVentas += item.total;
        acumulador.numeroItems += 1;
        acumulador.subtotal += item.subtotal;
        acumulador.iva += item.iva;
        acumulador.data.push(item)

      }

      return acumulador;
    }, { ...initialState });

    return resumen;

  }, [data, fecha, filter, type]);

  return { resultado };
}



export function useInformeAlmacenes(pedidos, compras, filter) {



  const {
    filter_fechas
  } = useSelector((state) => state.informes);



  const [resultadoF1, setResultF1] = useState([]);
  const [resultadoF2, setResultF2] = useState([]);

  const [campo, setCampo] = useState("total");


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




  const [labels, setLabels] = useState([]);
  const [datasets, setDatasets] = useState([
    {
      label: "Total",
      data: [],
    },
  ]);

  function organizarPorFecha(data, fechaKey, name, result) {
    return data.sort((a, b) => b[fechaKey] - a[fechaKey]).reduce((res, value) => {
      const formattedDate = moment(value[fechaKey]).format(filtro);

      if (!res[formattedDate]) {
        res[formattedDate] = {
          name: name,
          mes: formattedDate,
          fecha: moment(value[fechaKey]),
          costo: 0,
          cantidad: 0,
          total: 0,
          data: [],
        };
        result.push(res[formattedDate]);
      }

      res[formattedDate].cantidad += 1;
      res[formattedDate].costo += value.subtotal;
      res[formattedDate].total += value.total;
      res[formattedDate].data.push(value);

      return res;
    }, {});
  }





  useEffect(() => {



    // Crear arrays resultantes
    let resultFechaPedidos = [];
    let resultFechaCompras = [];

    // Procesar pedidos y compras utilizando la función auxiliar
    organizarPorFecha(pedidos, 'fecha_pedido', 'PEDIDOS', resultFechaPedidos);
    organizarPorFecha(compras, 'fecha_compra', 'COMPRAS', resultFechaCompras);

    // Paso 1: Obtener todos los meses únicos
    const mesesPedidos = resultFechaPedidos.map(item => item.mes);
    const mesesCompras = resultFechaCompras.map(item => item.mes);
    const todosLosMeses = Array.from(new Set([...mesesPedidos, ...mesesCompras]));

    // Paso 2: Rellenar los arrays con valores en 0 donde falte algún mes
    todosLosMeses.forEach(mes => {
      // Verificar si el mes está en `resultPedidos`
      if (!resultFechaPedidos.some(item => item.mes === mes)) {
        resultFechaPedidos.push({
          name: 'PEDIDOS',
          mes: mes,
          fecha: moment(mes, filtro),
          costo: 0,
          cantidad: 0,
          total: 0,
          data: [],
        });
      }

      // Verificar si el mes está en `resultCompras`
      if (!resultFechaCompras.some(item => item.mes === mes)) {
        resultFechaCompras.push({
          name: 'COMPRAS',
          mes: mes,
          fecha: moment(mes, filtro),
          costo: 0,
          cantidad: 0,
          total: 0,
          data: [],
        });
      }
    });

    // Paso 3: Ordenar ambos arrays de mayor a menor por mes (asumiendo que el mes es un número)
    resultFechaPedidos.sort((a, b) => a.fecha - b.fecha);
    resultFechaCompras.sort((a, b) => a.fecha - b.fecha);

    // Establecer los resultados en el estado (si es necesario)
    setResultF1(resultFechaPedidos);
    setResultF2(resultFechaCompras);

  }, [pedidos, compras, campo, filtro]);


  useEffect(() => {


    // Generar labels a partir de las fechas
    const combinedLabels = resultadoF1.map(mes => mes.mes);

    // Construir datasets para Ventas y Compras
    const ventasDataset = {
      label: "Ventas",
      data: resultadoF1.map(mes => {
        return mes.data.reduce((acc, item) => acc + item.total, 0); // Sumar los totales de ventas por mes
      }),
      backgroundColor: "rgba(75, 192, 192, 0.6)", // Color para Ventas
      borderColor: "rgba(75, 192, 192, 1)",
      borderWidth: 1,
    };

    const comprasDataset = {
      label: "Compras",
      data: resultadoF2.map(mes => {
        return mes.data.reduce((acc, item) => acc + item.total, 0); // Sumar los totales de compras por mes
      }),
      backgroundColor: "rgba(153, 102, 255, 0.6)", // Color para Compras
      borderColor: "rgba(153, 102, 255, 1)",
      borderWidth: 1,
    };

    // Actualizar labels y datasets
    setLabels(combinedLabels);
    setDatasets([ventasDataset, comprasDataset]);

  }, [resultadoF1, resultadoF2]);


  // Función para formatear según la unidad de tiempo
  function formatearUnidadTiempo(unidad) {
    switch (unidad) {
      case 'day':
        return 'DÍA';
      case 'week':
        return 'SEMANA';
      case 'month':
        return 'MES';
      case 'year':
        return 'AÑO';
      default:
        return unidad; // Retorna la unidad original si no está en la lista
    }
  }




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

        text: campo.toUpperCase() + " DE COMPRAS Y PEDIDOS X " + formatearUnidadTiempo(filter),
      },
    },
  };


  return { options, labels, datasets }

}


