// useApi.js
import { DataStore, SortDirection } from "aws-amplify";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Estado, Venta, VentaItem } from "../../models";
import { loadingVentas, ventasAlmacenes, ventasTerceros, queryVentas } from "../../store/actions/ventas";
import moment from "moment";




export function useModelIDVenta(id) {

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState();

  const [items, setItems] = useState([]);


  useEffect(() => {
    if (id) {

      const subscription = DataStore.observeQuery(VentaItem,
        (p) =>
          p.and((p) => [
            p.ventaItemVentaId.eq(id),
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
              ventaItemID: elemento.id
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
      const sub = DataStore.observeQuery(Venta, (c) => c.id.eq(id)).subscribe(
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


export function useModelVentas() {

  const {
    usuario, modulo, almacenesAutorizados, permisosAutorizados
  } = useSelector((state) => state.usuario);

  const {
    filter_fechas
  } = useSelector((state) => state.ventas);


  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  const [data, setData] = useState(null);
  const [error, setError] = useState();

  useEffect(() => {
    if (almacenesAutorizados && almacenesAutorizados.length > 0) {

      const sub = DataStore.observeQuery(
        Venta,
        (p) =>
          p.and((p) => [
            p.fecha_factura.ge(filter_fechas.start),
            p.fecha_factura.le(filter_fechas.end),
          ]),
        {
          sort: (s) => s.fecha_factura(SortDirection.DESCENDING),
        }
      ).subscribe((snapshot) => {
        const { items, isSynced } = snapshot;


        dispatch(loadingVentas(true));
        Promise.all(items.filter((element) =>
          almacenesAutorizados.some(
            (elemento) =>
              element.ventaAlmacenId == elemento.id
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
            dispatch(queryVentas(data));


            const almacenes = data.reduce(function (res, value) {
              if (!res[value.ventaAlmacenId]) {
                res[value.ventaAlmacenId] = value.Almacen.nombreAlmacen;
              }
              return res;
            }, {});
            dispatch(
              ventasAlmacenes(
                almacenes
              )
            );

            return data.reduce(function (res, value) {
              if (!res[value.ventaTerceroId]) {
                res[value.ventaTerceroId] = value.Tercero.nombre_completo;
              }
              return res;
            }, {});
          })
          .then((terceros) => {
            dispatch(
              ventasTerceros(
                terceros
              )
            );



            dispatch(loadingVentas(false));
          })

          .catch((e) => console.error(e))
          .finally((e) => {
            dispatch(loadingVentas(false));
          });
      });

      return () => {
        sub.unsubscribe();
        dispatch(queryVentas([]));
        dispatch(loadingVentas(false));
      };
    } else {
      setLoading(false)
    }
  }, [almacenesAutorizados, filter_fechas]);


  return { loading, data, error };
}



export function useModelVentasItems() {

  const {
    usuario, modulo, almacenesAutorizados, permisosAutorizados
  } = useSelector((state) => state.usuario);

  const {
    filter_fechas
  } = useSelector((state) => state.ventas);


  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  const [data, setData] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    if (almacenesAutorizados && almacenesAutorizados.length > 0) {

      const sub = DataStore.observeQuery(
        VentaItem,
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


        dispatch(loadingVentas(true));
        Promise.all(items.filter((element) =>
          almacenesAutorizados.some(
            (elemento) =>
              element.ventaItemAlmacenId == elemento.id
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
            const venta = await elemento.Venta;

            const linea = await producto.Linea || { id: 'undefined', nombreLinea: 'Línea sin especificar' };
            const categoria = await producto.Categoria || { id: 'undefined', nombreCategoria: 'Categoria sin especificar' };
            const marca = await producto.Marca || { id: 'undefined', nombreMarca: 'Marca sin especificar' };

            return {
              ...elemento,
              Almacen: almacen,
              Venta: venta,
              Producto: producto,
              Linea: linea,
              Categoria: categoria,
              Marca: marca,
            };

          })).then((data) => {
            setData(data);


            dispatch(loadingVentas(false));
          })

          .catch((e) => console.error(e))
          .finally((e) => {
            dispatch(loadingVentas(false));
          });
      });

      return () => {
        sub.unsubscribe();
        setData([]);
        dispatch(loadingVentas(false));
      };
    } else {
      setLoading(false)
    }
  }, [almacenesAutorizados, filter_fechas]);


  return { loading, data, error };
}




export function useVentaInformeDia(dataVentas, dataItems, fecha, filter) {
  const initialState = {
    totalVentas: 0,
    numeroVentas: 0,
    subtotal: 0,
    iva: 0,
    almacenes: {},
    totalCantidadProductos: 0,
    totalReferenciasVendidas: 0
  };

  const resultado = useMemo(() => {
    const startOfDay = moment(fecha).startOf(filter);
    const endOfDay = moment(fecha).endOf(filter);



    const resumenVentas = dataVentas.reduce((acumulador, venta) => {
      const fechaVenta = moment(venta.fecha_venta);
      if (fechaVenta.isBetween(startOfDay, endOfDay, undefined, '[]')) {
        acumulador.totalVentas += venta.total;
        acumulador.numeroVentas += 1;
        acumulador.subtotal += venta.subtotal;
        acumulador.iva += venta.iva;

        const idAlmacen = venta.Almacen.id;
        if (!acumulador.almacenes[idAlmacen]) {
          acumulador.almacenes[idAlmacen] = {
            nombre: venta.Almacen.nombreAlmacen,
            totalVentas: 0,
            numeroVentas: 0,
            productosAgrupados: {},
            lineasAgrupados: {},
            categoriasAgrupados: {},
            marcasAgrupados: {},
            totalCantidadProductos: 0
          };
        }
        acumulador.almacenes[idAlmacen].totalVentas += venta.total;
        acumulador.almacenes[idAlmacen].numeroVentas += 1;
      }

      return acumulador;
    }, { ...initialState });

    const productosVendidosPorReferencia = {};

    dataItems.forEach(item => {
      const idAlmacen = item.ventaItemAlmacenId;
      const fechaCreacionItem = moment(item.Venta.fecha_venta);

      if (resumenVentas.almacenes[idAlmacen] && fechaCreacionItem.isBetween(startOfDay, endOfDay, undefined, '[]')) {
        const { Linea, Categoria, Marca, Producto, cantidad, subtotal_item, iva_item, total_item } = item;

        const productoId = item.ventaItemProductoId;
        const lineaId = item.Producto.productoLineaId;
        const categoriaId = item.Producto.productoCategoriaId;
        const marcaId = item.Producto.productoMarcaId;

        // reduce productos.
        if (!resumenVentas.almacenes[idAlmacen].productosAgrupados[productoId]) {
          resumenVentas.almacenes[idAlmacen].productosAgrupados[productoId] = {
            Producto,
            cantidadTotal: 0,
            subtotalTotal: 0,
            ivaTotal: 0,
            totalTotal: 0
          };
        }

        const productoAgrupado = resumenVentas.almacenes[idAlmacen].productosAgrupados[productoId];
        productoAgrupado.cantidadTotal += cantidad;
        productoAgrupado.subtotalTotal += subtotal_item;
        productoAgrupado.ivaTotal += iva_item;
        productoAgrupado.totalTotal += total_item;



        // reduce lineas.
        if (!resumenVentas.almacenes[idAlmacen].lineasAgrupados[lineaId]) {
          resumenVentas.almacenes[idAlmacen].lineasAgrupados[lineaId] = {
            Linea,
            cantidadTotal: 0,
            subtotalTotal: 0,
            ivaTotal: 0,
            totalTotal: 0
          };
        }

        const lineaAgrupado = resumenVentas.almacenes[idAlmacen].lineasAgrupados[lineaId];
        lineaAgrupado.cantidadTotal += cantidad;
        lineaAgrupado.subtotalTotal += subtotal_item;
        lineaAgrupado.ivaTotal += iva_item;
        lineaAgrupado.totalTotal += total_item;

        // reduce CATEGORIA.
        if (!resumenVentas.almacenes[idAlmacen].categoriasAgrupados[categoriaId]) {
          resumenVentas.almacenes[idAlmacen].categoriasAgrupados[categoriaId] = {
            Categoria,
            cantidadTotal: 0,
            subtotalTotal: 0,
            ivaTotal: 0,
            totalTotal: 0
          };
        }

        const categoriaAgrupado = resumenVentas.almacenes[idAlmacen].categoriasAgrupados[categoriaId];
        categoriaAgrupado.cantidadTotal += cantidad;
        categoriaAgrupado.subtotalTotal += subtotal_item;
        categoriaAgrupado.ivaTotal += iva_item;
        categoriaAgrupado.totalTotal += total_item;

        // reduce MARCA.
        if (!resumenVentas.almacenes[idAlmacen].marcasAgrupados[marcaId]) {
          resumenVentas.almacenes[idAlmacen].marcasAgrupados[marcaId] = {
            Marca,
            cantidadTotal: 0,
            subtotalTotal: 0,
            ivaTotal: 0,
            totalTotal: 0
          };
        }

        const marcaAgrupado = resumenVentas.almacenes[idAlmacen].marcasAgrupados[marcaId];
        marcaAgrupado.cantidadTotal += cantidad;
        marcaAgrupado.subtotalTotal += subtotal_item;
        marcaAgrupado.ivaTotal += iva_item;
        marcaAgrupado.totalTotal += total_item;




        resumenVentas.almacenes[idAlmacen].totalCantidadProductos += cantidad;
        resumenVentas.totalCantidadProductos += cantidad;






        // Contar la referencia como vendida
        if (!productosVendidosPorReferencia[productoId]) {
          productosVendidosPorReferencia[productoId] = true;
          resumenVentas.totalReferenciasVendidas += 1;
        }
      }
    });


    // Convertir los objetos productosAgrupados en arreglos dentro de cada almacén
    Object.values(resumenVentas.almacenes).forEach(almacen => {
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


    Object.values(resumenVentas.almacenes).forEach(almacen => {
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
        const { Linea = { id: 'default', nombreMarca: 'Ventas sin Linea' }, cantidadTotal, totalTotal } = lineaAgrupado;
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
        const { Categoria = { id: 'default', nombreMarca: 'Ventas sin Categoria' }, cantidadTotal, totalTotal } = categoriaAgrupados;
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
        const { Marca = { id: 'default', nombreMarca: 'Ventas sin Marca' }, cantidadTotal, totalTotal } = marcaAgrupados;
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
      ...resumenVentas,
      productosAgrupados: Object.values(productosAgrupados),
      lineasAgrupados: Object.values(lineasAgrupados),
      categoriasAgrupados: Object.values(categoriasAgrupados),
      marcasAgrupados: Object.values(marcasAgrupados)
    }; X


  }, [dataVentas, dataItems, fecha]);

  return { resultado };
}





export function useVentaInformeAlmacenes(data, filter) {


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
        if (!res[value.ventaAlmacenId]) {
          res[value.ventaAlmacenId] = {
            almacen: value.ventaAlmacenId,
            codigo: value.Almacen.codigo,
            nombreAlmacen: value.Almacen.nombreAlmacen,
            cantidad: 0,
            costo: 0,
            total: 0,
            data: [],
          };
          result.push(res[value.ventaAlmacenId]);
        }
        res[value.ventaAlmacenId].cantidad += 1;
        res[value.ventaAlmacenId].total += value.subtotal;
        res[value.ventaAlmacenId].total += value.total;
        res[value.ventaAlmacenId].data.push(value);
        return res;
      }, {});
      //console.log(result)
      var result_fecha = [];

      data.reduce(function (res, value) {
        if (!res[moment(value.fecha_venta).format(filtro)]) {
          res[moment(value.fecha_venta).format(filtro)] = {
            mes: moment(value.fecha_venta).format(filtro),
            fecha: moment(value.fecha_venta),
            costo: 0,
            cantidad: 0,
            total: 0,
            data: [],
          };
          result_fecha.push(res[moment(value.fecha_venta).format(filtro)]);
        }
        res[moment(value.fecha_venta).format(filtro)].cantidad += 1;
        res[moment(value.fecha_venta).format(filtro)].costo += value.subtotal;
        res[moment(value.fecha_venta).format(filtro)].total += value.total;
        res[moment(value.fecha_venta).format(filtro)].data.push(value);
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
            (compraf) => compraf.ventaAlmacenId == compra.almacen
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

export function useVentaInformeFormaPago(data, filter) {


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
        if (!res[moment(value.fecha_venta).format(filtro)]) {
          res[moment(value.fecha_venta).format(filtro)] = {
            mes: moment(value.fecha_venta).format(filtro),
            fecha: moment(value.fecha_venta),
            costo: 0,
            cantidad: 0,
            total: 0,
            data: [],
          };
          result_fecha.push(res[moment(value.fecha_venta).format(filtro)]);
        }
        res[moment(value.fecha_venta).format(filtro)].cantidad += 1;
        res[moment(value.fecha_venta).format(filtro)].costo += value.subtotal;
        res[moment(value.fecha_venta).format(filtro)].total += value.total;
        res[moment(value.fecha_venta).format(filtro)].data.push(value);
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



export default { useModelIDVenta, useModelVentas }