// useApi.js
import { DataStore, SortDirection } from "aws-amplify";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Cotizacion } from "../../models";

import { loadingCotizaciones, queryCotizaciones } from "../../store/actions/cotizaciones";



export function useModelIDCotizacion(id) {

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState();



  useEffect(() => {
    if (id !== undefined) {
      const sub = DataStore.observeQuery(Cotizacion, (c) => c.id.eq(id)).subscribe(
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

  return { loading, data, error };
}


export function useModelCotizaciones() {

  const {
    usuario, modulo, almacenesAutorizados, permisosAutorizados
  } = useSelector((state) => state.usuario);

  const {
    filter_fechas, cotizaciones
  } = useSelector((state) => state.cotizaciones);


  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const [data, setData] = useState(null);
  const [error, setError] = useState();

  useEffect(() => {
    if (almacenesAutorizados && almacenesAutorizados.length > 0) {

      if(cotizaciones.length == 0){
        setLoading(true);
      }


      const sub = DataStore.observeQuery(
        Cotizacion,
        (p) =>
          p.and((p) => [
            p.fecha_cotizacion.ge(filter_fechas.start),
            p.fecha_cotizacion.le(filter_fechas.end),
          ]),
        {
          sort: (s) => s.fecha_cotizacion(SortDirection.DESCENDING),
        }
      ).subscribe((snapshot) => {
        const { items, isSynced } = snapshot;




        Promise.all(items.filter((element) =>
          almacenesAutorizados.some(
            (elemento) =>
              element.cotizacionAlmacenId == elemento.id
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
          //console.log(data)
          dispatch(queryCotizaciones(data));


        })
          .catch((e) => console.error(e))
          .finally((e) => {
            setLoading(false)
          });
      });

      return () => {
        sub.unsubscribe();
        setLoading(false)
      };
    } else {
      setLoading(false)
    }
  }, [almacenesAutorizados, filter_fechas]);


  return { loading, data, error };
}



export default { useModelIDCotizacion, useModelCotizaciones }