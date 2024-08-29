// useApi.js
import { DataStore, SortDirection } from "aws-amplify";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ComprobanteEgreso, ComprobanteEgresoDocumento } from "../../models";
import { loadingPagos, queryPagos } from "../../store/actions/pagos";



export function useModelPagos() {

  const {
    usuario, modulo, almacenesAutorizados, permisosAutorizados
  } = useSelector((state) => state.usuario);

  const {
    filter_fechas
  } = useSelector((state) => state.pagos);


  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  const [data, setData] = useState(null);
  const [error, setError] = useState();

  useEffect(() => {
    if (almacenesAutorizados && almacenesAutorizados.length > 0) {

      const sub = DataStore.observeQuery(
        ComprobanteEgreso,
        (p) =>
          p.or((p) =>
            almacenesAutorizados.map(almacenId => p.comprobanteEgresoAlmacenId.eq(almacenId.id))
          ),
        {
          sort: (s) => s.createdAt(SortDirection.DESCENDING),
        }
      ).subscribe((snapshot) => {
        const { items, isSynced } = snapshot;


        dispatch(loadingPagos(true));
        Promise.all(items
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
            dispatch(queryPagos(data));
          })
          .catch((e) => console.error(e))
          .finally((e) => {
            dispatch(loadingPagos(false));
          });
      });

      return () => {
        sub.unsubscribe();
        dispatch(queryPagos([]));
        dispatch(loadingPagos(false));
      };
    } else {
      setLoading(false)
    }
  }, [almacenesAutorizados, filter_fechas]);


  return { loading, data, error };
}


export function useModelIDPago(id) {

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState();

  const [items, setItems] = useState([]);


  useEffect(() => {
    if (id) {

      const subscription = DataStore.observeQuery(ComprobanteEgresoDocumento,
        (p) =>
          p.and((p) => [
            p.comprobanteEgresoDocumentoComprobanteEgresoId.eq(id),
          ]),

      ).subscribe(({ items, isSynced }) => {


        Promise.all(
          items.map(async (elemento) => {

      
            const almacen = await elemento.Almacen;
            return {
              ...elemento,
     
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
      const sub = DataStore.observeQuery(ComprobanteEgreso, (c) => c.id.eq(id)).subscribe(
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


export default { useModelPagos , useModelIDPago }