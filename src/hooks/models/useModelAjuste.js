// useApi.js
import { DataStore, SortDirection } from "aws-amplify";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  AjusteInventario, AjusteInventarioItem, Estado } from "../../models";
import { ajustesAlmacenes, ajustesTerceros, loadingAjustes, queryAjustes } from "../../store/actions/ajustes";




export function useModelIDAjuste(id) {

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState();

  const [items, setItems] = useState([]);


  useEffect(() => {
    if (id) {

      const subscription = DataStore.observeQuery(AjusteInventarioItem,
        (p) =>
          p.and((p) => [
            p.pedidoItemAjusteId.eq(id),
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
      const sub = DataStore.observeQuery(Ajuste, (c) => c.id.eq(id)).subscribe(
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


export function useModelAjustes() {

  const {
    usuario, modulo, almacenesAutorizados, permisosAutorizados
  } = useSelector((state) => state.usuario);

  const {
    filter_fechas
  } = useSelector((state) => state.pedidos);


  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  const [data, setData] = useState(null);
  const [error, setError] = useState();

  useEffect(() => {
    if (almacenesAutorizados && almacenesAutorizados.length > 0) {

      const sub = DataStore.observeQuery(
        AjusteInventario,
        (p) =>
          p.and((p) => [
            p.fecha_ajuste.ge(filter_fechas.start),
            p.fecha_ajuste.le(filter_fechas.end),
          ]),
        {
          sort: (s) => s.fecha_ajuste(SortDirection.DESCENDING),
        }
      ).subscribe((snapshot) => {
        const { items, isSynced } = snapshot;


        dispatch(loadingAjustes(true));
        Promise.all(items.filter((element) =>
          almacenesAutorizados.some(
            (elemento) =>
              element.ajusteInventarioAlmacenId == elemento.id
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
            dispatch(queryAjustes(data));


            const almacenes = data.reduce(function (res, value) {
              if (!res[value.ajusteInventarioAlmacenId]) {
                res[value.ajusteInventarioAlmacenId] = value.Almacen.nombreAlmacen;
              }
              return res;
            }, {});
            dispatch(
              ajustesAlmacenes(
                almacenes
              )
            );

            return data.reduce(function (res, value) {
              if (!res[value.ajusteInventarioTerceroId]) {
                res[value.ajusteInventarioTerceroId] = value.Tercero.nombre_completo;
              }
              return res;
            }, {});
          })
          .then((terceros) => {
            dispatch(
              ajustesTerceros(
                terceros
              )
            );



            dispatch(loadingAjustes(false));
          })

          .catch((e) => console.error(e))
          .finally((e) => {
            dispatch(loadingAjustes(false));
          });
      });

      return () => {
        sub.unsubscribe();
        dispatch(queryAjustes([]));
        dispatch(loadingAjustes(false));
      };
    } else {
      setLoading(false)
    }
  }, [almacenesAutorizados, filter_fechas]);


  return { loading, data, error };
}





export default { useModelIDAjuste, useModelAjustes }