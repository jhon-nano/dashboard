// useApi.js
import { DataStore, SortDirection } from "aws-amplify";
import { useEffect, useState } from "react";
import { CommentarioSolicitud, SolicitudCredito } from "../../models";
import { useDispatch, useSelector } from "react-redux";
import { creditosAlmacenes, creditosCuotas, loadingSolicitudCreditos, queryCredito, querySolicitudCreditos } from "../../store/actions/creditos";



export function useModelIDCredito(id) {

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState();



  useEffect(() => {
    if (id !== undefined) {
      const sub = DataStore.observeQuery(SolicitudCredito, (c) => c.id.eq(id)).subscribe(
        ({ items }) => {
          setLoading(true);




          Promise.all(
            items.map(async (elemento) => {

              const almacen = await elemento.Almacen;
              const cliente = await elemento.Cliente;
              const codeudor = await elemento.Codeudor;
              const segundo_codeudor = await elemento.SegundoCodeudor;
              const usuario = await elemento.Usuario;
              const usuario_autorizado = await elemento.UsuarioAutorizado;
              const usuario_revisado = await elemento.UsuarioRevisado;


              return {
                ...elemento,
                Almacen: almacen,
                Usuario: usuario,
                Cliente: cliente,
                Codeudor: codeudor,
                SegundoCodeudor: segundo_codeudor,
                UsuarioAutorizado: usuario_autorizado,
                UsuarioRevisado: usuario_revisado
              };
            })).then((data) => {




              setData(data[0])
              dispatch(queryCredito(data[0]))
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
        dispatch(queryCredito());

        sub.unsubscribe();
      };
    }
  }, [id]);

  return { loading, data, error };
}

export function useModelIDCreditoComentarios(id) {


  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState();

  useEffect(() => {
    if (id !== undefined) {
      const sub = DataStore.observeQuery(CommentarioSolicitud, (c) => c.commentarioSolicitudCreditoId.eq(id)).subscribe(
        ({ items }) => {
          setLoading(true);

          Promise.all(
            items.map(async (elemento) => {
              const usuario = await elemento.Usuario;


              return {
                ...elemento,
                Usuario: usuario,
              };
            })).then((data) => {
              setData(data)

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

export function useModelCreditos() {

  const {
    almacenesAutorizados
  } = useSelector((state) => state.usuario);

  const {
    filter_fechas
  } = useSelector((state) => state.creditos);

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  const [data, setData] = useState(null);
  const [error, setError] = useState();

  useEffect(() => {
    if (almacenesAutorizados && almacenesAutorizados.length > 0) {

      const sub = DataStore.observeQuery(
        SolicitudCredito,
        (p) =>
          p.and((p) => [
            p.fecha.ge(filter_fechas.start),
            p.fecha.le(filter_fechas.end),
          ]),
        {
          sort: (s) => s.fecha(SortDirection.ASCENDING),
        }
      ).subscribe((snapshot) => {
        const { items, isSynced } = snapshot;
        dispatch(loadingSolicitudCreditos(true));
        Promise.all(items.filter((element) =>
          almacenesAutorizados.some(
            (elemento) =>
              element.solicitudCreditoAlmacenId == elemento.id
          )
        ).map(async (elemento) => {
          const tercero = await elemento.Cliente;
          const almacen = await elemento.Almacen;
          const usuario = await elemento.Usuario;
          return {
            ...elemento,
            Almacen: almacen,
            Tercero: tercero,
            Usuario: usuario,
          };

        })).then((data) => {


          const almacenes = data.reduce(function (res, value) {
            if (!res[value.solicitudCreditoAlmacenId]) {
              res[value.solicitudCreditoAlmacenId] = value.Almacen.nombreAlmacen;
            }
            return res;
          }, {});

          dispatch(
            creditosAlmacenes(
              almacenes
            )
          );

          dispatch(querySolicitudCreditos(data));
          dispatch(
            creditosCuotas(
              items.reduce(function (res, value) {
                res[value.cuotas] = String(value.cuotas);
                return res;
              }, {})
            )
          );
          dispatch(loadingSolicitudCreditos(false));
          //console.log('finalizso models creditos')
        })
          .catch((e) => console.error(e))
          .finally((e) => {
            dispatch(loadingSolicitudCreditos(false));
          });
      });

      return () => {
        sub.unsubscribe();
        dispatch(loadingSolicitudCreditos(false));
      };
    }
  }, [almacenesAutorizados, filter_fechas]);


  return { loading, data, error };
}



export default { useModelIDCredito, useModelCreditos }