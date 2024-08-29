// useApi.js
import { DataStore, SortDirection } from "aws-amplify";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Estado, Pedido, PedidoItem, TipoPedidos } from "../../models";
import { pedidosAlmacenes, pedidosTerceros, queryPedidos } from "../../store/actions/pedidos";




export function useModelIDPedido(id) {

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState();

  const [items, setItems] = useState([]);


  useEffect(() => {
    if (id) {

      const subscription = DataStore.observeQuery(PedidoItem,
        (p) =>
          p.and((p) => [
            p.pedidoItemPedidoId.eq(id),
            p.estado.le(Estado.ACTIVO),
          ]),

      ).subscribe(({ items, isSynced }) => {


        Promise.all(
          items.map(async (elemento) => {

            const producto = await elemento.Producto;
            const almacen = await elemento.Almacen;
            return {
              ...elemento,
              Producto: producto,
              Almacen: almacen,
              pedidoItemID: elemento.id
            };
          })).then((data) => {
            setItems(data);

          })
          .catch((e) => console.error(e))
      });



      return () => {
        subscription.unsubscribe();
        setItems([])

      };
    }
  }, [id]);


  useEffect(() => {
    if (id !== undefined) {
      const sub = DataStore.observeQuery(Pedido, (c) => c.id.eq(id)).subscribe(
        ({ items }) => {
          setLoading(true);




          Promise.all(
            items.map(async (elemento) => {

              const tercero = await elemento.Tercero;
              const almacen = await elemento.Almacen;
              const usuario = await elemento.Usuario;
              return {
                ...elemento,
                Almacen: almacen,
                Tercero: tercero,
                Usuario: usuario,
              };
            })).then((data) => {
              setData(data[0])
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


        sub.unsubscribe();
      };
    }
  }, [id]);

  return { loading, data, error, items };
}


export function useModelPedidos() {

  const dispatch = useDispatch();

  const { almacenesAutorizados } = useSelector((state) => state.usuario);
  const { filter_fechas, pedidos } = useSelector((state) => state.pedidos);

  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    if (almacenesAutorizados && almacenesAutorizados.length > 0 && filter_fechas) {


      if (pedidos.length == 0) {
        setLoading(true);
      }

      const sub = DataStore.observeQuery(
        Pedido,
        (p) =>
          p.or((p) => [
            p.tipo_pedido.eq(TipoPedidos.SEPARADO),
            p.and((p) => [
              p.fecha_pedido.ge(filter_fechas.start),
              p.fecha_pedido.le(filter_fechas.end)
            ]),
          ]),
        {
          sort: (s) => s.fecha_pedido(SortDirection.DESCENDING),
        }
      ).subscribe((snapshot) => {
        const { items, isSynced } = snapshot;




        Promise.all(items.filter((element) =>
          almacenesAutorizados.some(
            (elemento) =>
              element.pedidoAlmacenId == elemento.id
          )
        )
          .sort(function (a, b) {
            a = new Date(a.createdAt);
            b = new Date(b.createdAt);
            return a > b ? -1 : a < b ? 1 : 0;
          })
          .map(async (elemento) => {

            const tercero = await elemento.Tercero;
            const almacen = await elemento.Almacen;
            const usuario = await elemento.Usuario;
            return {
              ...elemento,
              Almacen: almacen,
              Tercero: tercero,
              Usuario: usuario,
            };

          })).then((data) => {

            dispatch(queryPedidos(data));

            const almacenes = data.reduce(function (res, value) {
              if (!res[value.pedidoAlmacenId]) {
                res[value.pedidoAlmacenId] = value.Almacen.nombreAlmacen;
              }
              return res;
            }, {});
            dispatch(
              pedidosAlmacenes(
                almacenes
              )
            );

            return data.reduce(function (res, value) {
              if (!res[value.pedidoTerceroId]) {
                res[value.pedidoTerceroId] = value.Tercero.nombre_completo;
              }
              return res;
            }, {});
          })
          .then((terceros) => {
            dispatch(
              pedidosTerceros(
                terceros
              )
            );




          })

          .catch((e) => console.error(e))
          .finally((e) => {
            setLoading(false);
          });
      });

      return () => {
        sub.unsubscribe();
        setLoading(false);
      };

    }
  }, [almacenesAutorizados, filter_fechas]);

  return { loading }

}



export function useModelPedidosItems() {

  const {
    usuario, modulo, almacenesAutorizados, permisosAutorizados
  } = useSelector((state) => state.usuario);

  const {
    filter_fechas
  } = useSelector((state) => state.pedidos);


  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  const [data, setData] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    if (almacenesAutorizados && almacenesAutorizados.length > 0) {

      const sub = DataStore.observeQuery(
        PedidoItem,
        (p) =>
          p.and((p) => [
            p.createdAt.ge(filter_fechas.start),
            p.createdAt.le(filter_fechas.end),
          ]),
        {
          sort: (s) => s.createdAt(SortDirection.DESCENDING),
        }
      ).subscribe((snapshot) => {
        const { items, isSynced } = snapshot;



        Promise.all(items.filter((element) =>
          almacenesAutorizados.some(
            (elemento) =>
              element.pedidoItemAlmacenId == elemento.id
          )
        )
          .sort(function (a, b) {
            a = new Date(a.createdAt);
            b = new Date(b.createdAt);
            return a > b ? -1 : a < b ? 1 : 0;
          })
          .map(async (elemento) => {
            const producto = await elemento.Producto;
            const almacen = await elemento.Almacen;
            const pedido = await elemento.Pedido;

            const linea = await producto.Linea || { id: 'undefined', nombreLinea: 'Línea sin especificar' };
            const categoria = await producto.Categoria || { id: 'undefined', nombreCategoria: 'Categoria sin especificar' };
            const marca = await producto.Marca || { id: 'undefined', nombreMarca: 'Marca sin especificar' };

            return {
              ...elemento,
              Almacen: almacen,
              Pedido: pedido,
              Producto: producto,
              Linea: linea,
              Categoria: categoria,
              Marca: marca,
            };

          })).then((data) => {
            console.log(data)
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
    } else {
      setLoading(false)
    }
  }, [almacenesAutorizados, filter_fechas]);


  return { loading, data, error };
}

export function useModelPedidosItemsByPedidos({ pedidos }) {


  const [loading, setLoading] = useState(true);

  const [data, setData] = useState([]);
  const [dataLineas, setDataLineas] = useState([]);

  const [error, setError] = useState();

  useEffect(() => {


    const sub = DataStore.observeQuery(
      PedidoItem,
      (p) =>
        p.or((p) =>
          pedidos.filter((pedido => pedido.tipo_pedido == TipoPedidos.PEDIDO)).map(pedido => p.pedidoItemPedidoId.eq(pedido.id))
        ),
      {
        sort: (s) => s.createdAt(SortDirection.DESCENDING),
      }
    ).subscribe((snapshot) => {
      const { items, isSynced } = snapshot;



      Promise.all(items.map(async (elemento) => {
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
          Producto: {
            ...producto,
            Linea: linea,
            Categoria: categoria,
            Marca: marca
          },
        };

      })).then((data) => {
        console.log(data)


        const result = data.reduce((acc, item) => {
          const nombreLinea = item.Producto.Linea.nombreLinea;
          if (!acc[nombreLinea]) {
            acc[nombreLinea] = 0;
          }
          acc[nombreLinea] += item.total_item;
          return acc;
        }, []);

        setDataLineas(result)
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


  return { loading, data, dataLineas, error };
}


export function usePedidoInformeDia(dataPedidos, dataItems, fecha, filter) {
  const initialState = {
    totalVentas: 0,
    numeroPedidos: 0,
    subtotal: 0,
    iva: 0,
    almacenes: {},
    totalCantidadProductos: 0,
    totalReferenciasVendidas: 0
  };

  const resultado = useMemo(() => {
    const startOfDay = moment(fecha).startOf(filter);
    const endOfDay = moment(fecha).endOf(filter);



    const resumenPedidos = dataPedidos.reduce((acumulador, pedido) => {
      const fechaPedido = moment(pedido.fecha_pedido);
      if (fechaPedido.isBetween(startOfDay, endOfDay, undefined, '[]')) {
        acumulador.totalVentas += pedido.total;
        acumulador.numeroPedidos += 1;
        acumulador.subtotal += pedido.subtotal;
        acumulador.iva += pedido.iva;

        const idAlmacen = pedido.Almacen.id;
        if (!acumulador.almacenes[idAlmacen]) {
          acumulador.almacenes[idAlmacen] = {
            nombre: pedido.Almacen.nombreAlmacen,
            totalVentas: 0,
            numeroPedidos: 0,
            productosAgrupados: {},
            lineasAgrupados: {},
            categoriasAgrupados: {},
            marcasAgrupados: {},
            totalCantidadProductos: 0
          };
        }
        acumulador.almacenes[idAlmacen].totalVentas += pedido.total;
        acumulador.almacenes[idAlmacen].numeroPedidos += 1;
      }

      return acumulador;
    }, { ...initialState });

    const productosVendidosPorReferencia = {};

    dataItems.forEach(item => {
      const idAlmacen = item.pedidoItemAlmacenId;
      const fechaCreacionItem = moment(item.Pedido.fecha_pedido);

      if (resumenPedidos.almacenes[idAlmacen] && fechaCreacionItem.isBetween(startOfDay, endOfDay, undefined, '[]')) {
        const { Linea, Categoria, Marca, Producto, cantidad, subtotal_item, iva_item, total_item } = item;

        const productoId = item.pedidoItemProductoId;
        const lineaId = item.Producto.productoLineaId;
        const categoriaId = item.Producto.productoCategoriaId;
        const marcaId = item.Producto.productoMarcaId;

        // reduce productos.
        if (!resumenPedidos.almacenes[idAlmacen].productosAgrupados[productoId]) {
          resumenPedidos.almacenes[idAlmacen].productosAgrupados[productoId] = {
            Producto,
            cantidadTotal: 0,
            subtotalTotal: 0,
            ivaTotal: 0,
            totalTotal: 0
          };
        }

        const productoAgrupado = resumenPedidos.almacenes[idAlmacen].productosAgrupados[productoId];
        productoAgrupado.cantidadTotal += cantidad;
        productoAgrupado.subtotalTotal += subtotal_item;
        productoAgrupado.ivaTotal += iva_item;
        productoAgrupado.totalTotal += total_item;



        // reduce lineas.
        if (!resumenPedidos.almacenes[idAlmacen].lineasAgrupados[lineaId]) {
          resumenPedidos.almacenes[idAlmacen].lineasAgrupados[lineaId] = {
            Linea,
            cantidadTotal: 0,
            subtotalTotal: 0,
            ivaTotal: 0,
            totalTotal: 0
          };
        }

        const lineaAgrupado = resumenPedidos.almacenes[idAlmacen].lineasAgrupados[lineaId];
        lineaAgrupado.cantidadTotal += cantidad;
        lineaAgrupado.subtotalTotal += subtotal_item;
        lineaAgrupado.ivaTotal += iva_item;
        lineaAgrupado.totalTotal += total_item;

        // reduce CATEGORIA.
        if (!resumenPedidos.almacenes[idAlmacen].categoriasAgrupados[categoriaId]) {
          resumenPedidos.almacenes[idAlmacen].categoriasAgrupados[categoriaId] = {
            Categoria,
            cantidadTotal: 0,
            subtotalTotal: 0,
            ivaTotal: 0,
            totalTotal: 0
          };
        }

        const categoriaAgrupado = resumenPedidos.almacenes[idAlmacen].categoriasAgrupados[categoriaId];
        categoriaAgrupado.cantidadTotal += cantidad;
        categoriaAgrupado.subtotalTotal += subtotal_item;
        categoriaAgrupado.ivaTotal += iva_item;
        categoriaAgrupado.totalTotal += total_item;

        // reduce MARCA.
        if (!resumenPedidos.almacenes[idAlmacen].marcasAgrupados[marcaId]) {
          resumenPedidos.almacenes[idAlmacen].marcasAgrupados[marcaId] = {
            Marca,
            cantidadTotal: 0,
            subtotalTotal: 0,
            ivaTotal: 0,
            totalTotal: 0
          };
        }

        const marcaAgrupado = resumenPedidos.almacenes[idAlmacen].marcasAgrupados[marcaId];
        marcaAgrupado.cantidadTotal += cantidad;
        marcaAgrupado.subtotalTotal += subtotal_item;
        marcaAgrupado.ivaTotal += iva_item;
        marcaAgrupado.totalTotal += total_item;




        resumenPedidos.almacenes[idAlmacen].totalCantidadProductos += cantidad;
        resumenPedidos.totalCantidadProductos += cantidad;






        // Contar la referencia como vendida
        if (!productosVendidosPorReferencia[productoId]) {
          productosVendidosPorReferencia[productoId] = true;
          resumenPedidos.totalReferenciasVendidas += 1;
        }
      }
    });


    // Convertir los objetos productosAgrupados en arreglos dentro de cada almacén
    Object.values(resumenPedidos.almacenes).forEach(almacen => {
      almacen.productosAgrupados = Object.values(almacen.productosAgrupados);
      almacen.lineasAgrupados = Object.values(almacen.lineasAgrupados);
      almacen.categoriasAgrupados = Object.values(almacen.categoriasAgrupados);
      almacen.marcasAgrupados = Object.values(almacen.marcasAgrupados);
    });


    // Reducción adicional para agrupar por Producto y sumar la cantidad
    const productosAgrupados = {};
    const lineasAgrupados = {};
    const categoriasAgrupados = {};
    const marcasAgrupados = {};


    Object.values(resumenPedidos.almacenes).forEach(almacen => {
      almacen.productosAgrupados.forEach(productoAgrupado => {
        const { Producto, cantidadTotal, totalTotal } = productoAgrupado;
        const { id } = Producto;

        if (!productosAgrupados[id]) {
          productosAgrupados[id] = {
            ...Producto,
            totalCantidad: 0,
            totalTotal: 0
          };
        }

        productosAgrupados[id].totalCantidad += cantidadTotal;
        productosAgrupados[id].totalTotal += totalTotal;
      });


      almacen.lineasAgrupados.forEach(lineaAgrupado => {
        const { Linea = { id: 'default', nombreMarca: 'Pedidos sin Linea' }, cantidadTotal, totalTotal } = lineaAgrupado;
        const { id } = Linea;

        if (!lineasAgrupados[id]) {
          lineasAgrupados[id] = {
            ...Linea,
            totalCantidad: 0,
            totalTotal: 0
          };
        }

        lineasAgrupados[id].totalCantidad += cantidadTotal;
        lineasAgrupados[id].totalTotal += totalTotal;
      });


      almacen.categoriasAgrupados.forEach(categoriaAgrupados => {
        const { Categoria = { id: 'default', nombreMarca: 'Pedidos sin Categoria' }, cantidadTotal, totalTotal } = categoriaAgrupados;
        const { id } = Categoria;

        if (!categoriasAgrupados[id]) {
          categoriasAgrupados[id] = {
            ...Categoria,
            totalCantidad: 0,
            totalTotal: 0
          };
        }

        categoriasAgrupados[id].totalCantidad += cantidadTotal;
        categoriasAgrupados[id].totalTotal += totalTotal;
      });

      almacen.marcasAgrupados.forEach(marcaAgrupados => {
        const { Marca = { id: 'default', nombreMarca: 'Pedidos sin Marca' }, cantidadTotal, totalTotal } = marcaAgrupados;
        const { id } = Marca;

        if (!marcasAgrupados[id]) {
          marcasAgrupados[id] = {
            ...Marca,
            totalCantidad: 0,
            totalTotal: 0
          };
        }

        marcasAgrupados[id].totalCantidad += cantidadTotal;
        marcasAgrupados[id].totalTotal += totalTotal;
      });




    });


    return {
      ...resumenPedidos,
      productosAgrupados: Object.values(productosAgrupados),
      lineasAgrupados: Object.values(lineasAgrupados),
      categoriasAgrupados: Object.values(categoriasAgrupados),
      marcasAgrupados: Object.values(marcasAgrupados)
    }; X


  }, [dataPedidos, dataItems, fecha]);

  return { resultado };
}





export function usePedidoInformeAlmacenes(data, filter) {


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
        if (!res[value.pedidoAlmacenId]) {
          res[value.pedidoAlmacenId] = {
            almacen: value.pedidoAlmacenId,
            codigo: value.Almacen.codigo,
            nombreAlmacen: value.Almacen.nombreAlmacen,
            cantidad: 0,
            costo: 0,
            total: 0,
            data: [],
          };
          result.push(res[value.pedidoAlmacenId]);
        }
        res[value.pedidoAlmacenId].cantidad += 1;
        res[value.pedidoAlmacenId].total += value.subtotal;
        res[value.pedidoAlmacenId].total += value.total;
        res[value.pedidoAlmacenId].data.push(value);
        return res;
      }, {});
      //console.log(result)
      var result_fecha = [];

      data.reduce(function (res, value) {
        if (!res[moment(value.fecha_pedido).format(filtro)]) {
          res[moment(value.fecha_pedido).format(filtro)] = {
            mes: moment(value.fecha_pedido).format(filtro),
            fecha: moment(value.fecha_pedido),
            costo: 0,
            cantidad: 0,
            total: 0,
            data: [],
          };
          result_fecha.push(res[moment(value.fecha_pedido).format(filtro)]);
        }
        res[moment(value.fecha_pedido).format(filtro)].cantidad += 1;
        res[moment(value.fecha_pedido).format(filtro)].costo += value.subtotal;
        res[moment(value.fecha_pedido).format(filtro)].total += value.total;
        res[moment(value.fecha_pedido).format(filtro)].data.push(value);
        return res;
      }, {});
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
            (compraf) => compraf.pedidoAlmacenId == compra.almacen
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

export function usePedidoInformeFormaPago(data, filter) {


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
        return setFiltro('DD')
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

        text: campo.toUpperCase() + " DE PEDIDOS MENSUALES x FORMA PAGO",
      },
    },
  };

  useEffect(() => {
    if (data?.length > 0) {
      var result = [];

      data.reduce(function (res, value) {
        if (!res[value.forma_pago]) {
          res[value.forma_pago] = {
            forma_pago: value.forma_pago,
            cantidad: 0,
            costo: 0,
            total: 0,
            data: [],
          };
          result.push(res[value.forma_pago]);
        }
        res[value.forma_pago].cantidad += 1;
        res[value.forma_pago].total += value.subtotal;
        res[value.forma_pago].total += value.total;
        res[value.forma_pago].data.push(value);
        return res;
      }, {});
      //console.log(result)
      var result_fecha = [];

      data.reduce(function (res, value) {
        if (!res[moment(value.fecha_pedido).format(filtro)]) {
          res[moment(value.fecha_pedido).format(filtro)] = {
            mes: moment(value.fecha_pedido).format(filtro),
            fecha: moment(value.fecha_pedido),
            costo: 0,
            cantidad: 0,
            total: 0,
            data: [],
          };
          result_fecha.push(res[moment(value.fecha_pedido).format(filtro)]);
        }
        res[moment(value.fecha_pedido).format(filtro)].cantidad += 1;
        res[moment(value.fecha_pedido).format(filtro)].costo += value.subtotal;
        res[moment(value.fecha_pedido).format(filtro)].total += value.total;
        res[moment(value.fecha_pedido).format(filtro)].data.push(value);
        return res;
      }, {});
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
            (compraf) => compraf.forma_pago == compra.forma_pago
          );
          return data;
        });

        return {
          label: compra.forma_pago,
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



export default { useModelIDPedido, useModelPedidos }