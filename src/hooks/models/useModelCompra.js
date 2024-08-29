// useApi.js
import { DataStore, SortDirection, Predicates } from "aws-amplify";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Compra, CompraItem } from "../../models";
import { comprasAlmacenes, comprasTerceros, loadingCompras, queryCompras } from "../../store/actions/compras";
import { filteringCompraItemProductos } from "../../store/actions/inventarios";
import moment from "moment";


export function useModelIDCompra(id) {
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState(null);
  const [error, setError] = useState();

  useEffect(() => {
    if (id !== undefined) {
      const sub = DataStore.observeQuery(Compra, (c) => c.id.eq(id)).subscribe(
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

              if (data.length == 1) {
                setData(data[0])
                setLoading(false);
              }

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

  return { loading, data, error };
}

export function useModelCompras() {

  const {
    filter_fechas, compras
  } = useSelector((state) => state.compras);

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
            p.fecha_compra.ge(filter_fechas.start),
            p.fecha_compra.le(filter_fechas.end),
          ]),
        {
          sort: (s) => s.createdAt(SortDirection.DESCENDING),
        }
      ).subscribe((snapshot) => {
        const { items, isSynced } = snapshot;

        Promise.all(
          items.filter((element) =>
            almacenesAutorizados.some(
              (elemento) => element.compraAlmacenId == elemento.id
            )
          ).map(async (elemento) => {

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
            dispatch(queryCompras(data));
            setLoading(false)

            const almacenes = data.reduce(function (res, value) {
              if (!res[value.compraAlmacenId]) {
                res[value.compraAlmacenId] = value.Almacen.nombreAlmacen;
              }
              return res;
            }, {});
            dispatch(
              comprasAlmacenes(
                almacenes
              )
            );

            return data.reduce(function (res, value) {
              if (!res[value.compraTerceroId]) {
                res[value.compraTerceroId] = value.Tercero.nombre_completo;
              }
              return res;
            }, {});
          })
          .then((terceros) => {
            dispatch(
              comprasTerceros(
                terceros
              )
            );




          })

          .catch((e) => console.error(e))
          .finally((e) => {
            setLoading(false)
          });
      });




      return () => {
        sub_compras.unsubscribe();


      };
    }
  }, [almacenesAutorizados, filter_fechas]);

  return { loading, data, error };
}


export function useModelComprasItems() {

  const {
    usuario, modulo, almacenesAutorizados, permisosAutorizados
  } = useSelector((state) => state.usuario);

  const {
    filter_fechas
  } = useSelector((state) => state.compras);


  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  const [data, setData] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    if (almacenesAutorizados && almacenesAutorizados.length > 0) {

      const sub = DataStore.observeQuery(
        CompraItem,
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
              element.compraItemAlmacenId == elemento.id
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
            const compra = await elemento.Compra;

            const linea = await producto.Linea || { id: 'undefined', nombreLinea: 'Línea sin especificar' };
            const categoria = await producto.Categoria || { id: 'undefined', nombreCategoria: 'Categoria sin especificar' };
            const marca = await producto.Marca || { id: 'undefined', nombreMarca: 'Marca sin especificar' };

            return {
              ...elemento,
              Almacen: almacen,
              Compra: compra,
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
    } else {
      setLoading(false)
    }
  }, [almacenesAutorizados, filter_fechas]);


  return { loading, data, error };
}


export function useModelCompraItemByTerceroId(terceroId) {

  const {
    almacenesAutorizados
  } = useSelector((state) => state.usuario);

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);



  useEffect(() => {
    if (terceroId && almacenesAutorizados && almacenesAutorizados.length > 0) {

      const sub_compras = DataStore.observeQuery(
        CompraItem, Predicates.ALL
      ).subscribe((snapshot) => {
        const { items, isSynced } = snapshot;

        Promise.all(
          items.filter((element) =>
            almacenesAutorizados.some(
              (elemento) => element.compraItemAlmacenId == elemento.id
            )
          ).map(async (elemento) => {
            const compra = await elemento.Compra;
            const tercero = await compra.Tercero;
            return {
              ...elemento,
              Compra: compra,
              Tercero: tercero,
            };
          })).then((data) => {
            const compras_tercero = data.filter((e) => e.Compra.compraTerceroId == terceroId)
            dispatch(filteringCompraItemProductos(compras_tercero))
            setLoading(false)
          })

          .catch((e) => console.error(e))
          .finally((e) => {
            setLoading(false)
          });
      });




      return () => {
        sub_compras.unsubscribe();


      };
    }
  }, [terceroId, almacenesAutorizados]);

  return { loading };
}





export function useCompraInformeAlmacenes(compras) {


  const [resultado2, setResult2] = useState([]);
  const [resultadoF2, setResultF2] = useState([]);


  const [labels, setLabels] = useState([]);
  const [cantidad, setCantidad] = useState([]);
  const [campo, setCampo] = useState("total");




  let numberFormat = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  });


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

        text: campo.toUpperCase() + " DE COMPRAS MENSUALES x ALMACENES",
      },
    },
  };

  useEffect(() => {
    if (compras?.length > 0) {
      var result = [];

      compras.reduce(function (res, value) {
        if (!res[value.compraAlmacenId]) {
          res[value.compraAlmacenId] = {
            almacen: value.compraAlmacenId,
            codigo: value.Almacen.codigo,
            nombreAlmacen: value.Almacen.nombreAlmacen,
            cantidad: 0,
            costo: 0,
            total: 0,
            data: [],
          };
          result.push(res[value.compraAlmacenId]);
        }
        res[value.compraAlmacenId].cantidad += 1;
        res[value.compraAlmacenId].total += value.subtotal;
        res[value.compraAlmacenId].total += value.total;
        res[value.compraAlmacenId].data.push(value);
        return res;
      }, {});
      //console.log(result)
      var result_fecha = [];

      compras.reduce(function (res, value) {
        if (!res[moment(value.fecha_compra).format("MMMM")]) {
          res[moment(value.fecha_compra).format("MMMM")] = {
            mes: moment(value.fecha_compra).format("MMMM"),
            fecha: moment(value.fecha_compra),
            costo: 0,
            cantidad: 0,
            total: 0,
            data: [],
          };
          result_fecha.push(res[moment(value.fecha_compra).format("MMMM")]);
        }
        res[moment(value.fecha_compra).format("MMMM")].cantidad += 1;
        res[moment(value.fecha_compra).format("MMMM")].costo += value.subtotal;
        res[moment(value.fecha_compra).format("MMMM")].total += value.total;
        res[moment(value.fecha_compra).format("MMMM")].data.push(value);
        return res;
      }, {});
      //console.log(result_fecha)
      setResultF2(result_fecha);

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

      setResult2(result);
    }
  }, [compras, campo]);

  useEffect(() => {
    setDatasets(
      resultado2.map(function (compra) {
        var resultad = resultadoF2.map((mes) => {
          const data = mes.data.filter(
            (compraf) => compraf.compraAlmacenId == compra.almacen
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
  }, [resultado2]);


  return { options, labels, datasets }

}


export function useCompraInformeDia(dataCompras, dataItems, fecha, filter) {
  const initialState = {
    totalVentas: 0,
    numeroCompras: 0,
    subtotal: 0,
    iva: 0,
    almacenes: {},
    totalCantidadProductos: 0,
    totalReferenciasVendidas: 0
  };

  const resultado2 = useMemo(() => {
    const startOfDay = moment(fecha).startOf(filter);
    const endOfDay = moment(fecha).endOf(filter);




    const resumenCompras = dataCompras.reduce((acumulador, compra) => {
      const fechaCompra = moment(compra.fecha_compra);
      if (fechaCompra.isBetween(startOfDay, endOfDay, undefined, '[]')) {
        acumulador.totalVentas += compra.total;
        acumulador.numeroCompras += 1;
        acumulador.subtotal += compra.subtotal;
        acumulador.iva += compra.iva;

        const idAlmacen = compra.Almacen.id;
        if (!acumulador.almacenes[idAlmacen]) {
          acumulador.almacenes[idAlmacen] = {
            nombre: compra.Almacen.nombreAlmacen,
            totalVentas: 0,
            numeroCompras: 0,
            productosAgrupados: {},
            lineasAgrupados: {},
            categoriasAgrupados: {},
            marcasAgrupados: {},
            totalCantidadProductos: 0
          };
        }
        acumulador.almacenes[idAlmacen].totalVentas += compra.total;
        acumulador.almacenes[idAlmacen].numeroCompras += 1;
      }

      return acumulador;
    }, { ...initialState });

    const productosVendidosPorReferencia = {};

    dataItems.forEach(item => {
      const idAlmacen = item.compraItemAlmacenId;
      const fechaCreacionItem = moment(item.Compra.fecha_compra);

      if (resumenCompras.almacenes[idAlmacen] && fechaCreacionItem.isBetween(startOfDay, endOfDay, undefined, '[]')) {
        const { Linea, Categoria, Marca, Producto, cantidad, subtotal_item, iva_item, total_item } = item;

        const productoId = item.compraItemProductoId;
        const lineaId = item.Producto.productoLineaId;
        const categoriaId = item.Producto.productoCategoriaId;
        const marcaId = item.Producto.productoMarcaId;

        // reduce productos.
        if (!resumenCompras.almacenes[idAlmacen].productosAgrupados[productoId]) {
          resumenCompras.almacenes[idAlmacen].productosAgrupados[productoId] = {
            Producto,
            cantidadTotal: 0,
            subtotalTotal: 0,
            ivaTotal: 0,
            totalTotal: 0
          };
        }

        const productoAgrupado = resumenCompras.almacenes[idAlmacen].productosAgrupados[productoId];
        productoAgrupado.cantidadTotal += cantidad;
        productoAgrupado.subtotalTotal += subtotal_item;
        productoAgrupado.ivaTotal += iva_item;
        productoAgrupado.totalTotal += total_item;



        // reduce lineas.
        if (!resumenCompras.almacenes[idAlmacen].lineasAgrupados[lineaId]) {
          resumenCompras.almacenes[idAlmacen].lineasAgrupados[lineaId] = {
            Linea,
            cantidadTotal: 0,
            subtotalTotal: 0,
            ivaTotal: 0,
            totalTotal: 0
          };
        }

        const lineaAgrupado = resumenCompras.almacenes[idAlmacen].lineasAgrupados[lineaId];
        lineaAgrupado.cantidadTotal += cantidad;
        lineaAgrupado.subtotalTotal += subtotal_item;
        lineaAgrupado.ivaTotal += iva_item;
        lineaAgrupado.totalTotal += total_item;

        // reduce CATEGORIA.
        if (!resumenCompras.almacenes[idAlmacen].categoriasAgrupados[categoriaId]) {
          resumenCompras.almacenes[idAlmacen].categoriasAgrupados[categoriaId] = {
            Categoria,
            cantidadTotal: 0,
            subtotalTotal: 0,
            ivaTotal: 0,
            totalTotal: 0
          };
        }

        const categoriaAgrupado = resumenCompras.almacenes[idAlmacen].categoriasAgrupados[categoriaId];
        categoriaAgrupado.cantidadTotal += cantidad;
        categoriaAgrupado.subtotalTotal += subtotal_item;
        categoriaAgrupado.ivaTotal += iva_item;
        categoriaAgrupado.totalTotal += total_item;

        // reduce MARCA.
        if (!resumenCompras.almacenes[idAlmacen].marcasAgrupados[marcaId]) {
          resumenCompras.almacenes[idAlmacen].marcasAgrupados[marcaId] = {
            Marca,
            cantidadTotal: 0,
            subtotalTotal: 0,
            ivaTotal: 0,
            totalTotal: 0
          };
        }

        const marcaAgrupado = resumenCompras.almacenes[idAlmacen].marcasAgrupados[marcaId];
        marcaAgrupado.cantidadTotal += cantidad;
        marcaAgrupado.subtotalTotal += subtotal_item;
        marcaAgrupado.ivaTotal += iva_item;
        marcaAgrupado.totalTotal += total_item;




        resumenCompras.almacenes[idAlmacen].totalCantidadProductos += cantidad;
        resumenCompras.totalCantidadProductos += cantidad;






        // Contar la referencia como vendida
        if (!productosVendidosPorReferencia[productoId]) {
          productosVendidosPorReferencia[productoId] = true;
          resumenCompras.totalReferenciasVendidas += 1;
        }
      }
    });


    // Convertir los objetos productosAgrupados en arreglos dentro de cada almacén
    Object.values(resumenCompras.almacenes).forEach(almacen => {
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


    Object.values(resumenCompras.almacenes).forEach(almacen => {
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
        const { Linea, cantidadTotal, totalTotal } = lineaAgrupado;
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
        const { Categoria, cantidadTotal, totalTotal } = categoriaAgrupados;
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
        const { Marca, cantidadTotal, totalTotal } = marcaAgrupados;
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
      ...resumenCompras,
      productosAgrupados: Object.values(productosAgrupados),
      lineasAgrupados: Object.values(lineasAgrupados),
      categoriasAgrupados: Object.values(categoriasAgrupados),
      marcasAgrupados: Object.values(marcasAgrupados)
    }; X


  }, [dataCompras, dataItems, fecha]);

  return { resultado2 };
}


export default { useModelIDCompra, useModelCompras, useModelCompraItemByTerceroId }