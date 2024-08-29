// useApi.js
import { DataStore, SortDirection } from "aws-amplify";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CarteraProveedores } from "../../models";
import { loadingAjustes, queryAjustes } from "../../store/actions/ajustes";
import { queryCarteraProveedores } from "../../store/actions/carteras";
import moment from "moment";



export function useModelCarteraProveedores() {

  const {
    usuario, modulo, almacenesAutorizados, permisosAutorizados
  } = useSelector((state) => state.usuario);




  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  const [data, setData] = useState(null);
  const [error, setError] = useState();

  useEffect(() => {
    if (almacenesAutorizados && almacenesAutorizados.length > 0) {

      const sub = DataStore.observeQuery(
        CarteraProveedores,
        (p) =>
          p.and((p) => [
            p.or((p) =>
              almacenesAutorizados.map(almacenId => p.carteraProveedoresAlmacenId.eq(almacenId.id))
            ),
            p.saldo.ne(0) // Filtrar por saldo diferente de 0
          ]),
        {
          sort: (s) => s.fecha_vencimiento(SortDirection.DESCENDING),
        }
      ).subscribe((snapshot) => {
        const { items, isSynced } = snapshot;


        dispatch(loadingAjustes(true));
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
       
            const hoy = new Date();

            const carteraPorEdades = data.map(cuenta => {
              const fechaVencimiento = new Date(cuenta.fecha_vencimiento);
              const diasDiferencia = Math.floor((hoy - fechaVencimiento) / (1000 * 60 * 60 * 24));
            
              const porVencer = diasDiferencia < 0 ? cuenta.saldo : 0;
              const vencido = diasDiferencia >= 0 ? cuenta.saldo : 0;
              
              const enRango = (min, max) => diasDiferencia >= min && diasDiferencia <= max ? cuenta.saldo : 0;
            
              return {
                ...cuenta,
                porvencer: porVencer,
                vencido: vencido,
                "0-30": enRango(0, 30),
                "31-60": enRango(31, 60),
                "61-90": enRango(61, 90),
                "+90": diasDiferencia > 90 ? cuenta.saldo : 0
              };
            });

            dispatch(queryCarteraProveedores(carteraPorEdades));

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
  }, [almacenesAutorizados]);


  return { loading, data, error };
}

export function useModelCarteraProveedoresByTercero(Tercero) {


  const [loading, setLoading] = useState(true);

  const [data, setData] = useState([]);

  const [error, setError] = useState();

  useEffect(() => {

    if (Tercero) {
      const sub = DataStore.observeQuery(
        CarteraProveedores,
        (p) =>  p.and((p) => [
          p.carteraProveedoresTerceroId.eq(Tercero?.id),
          p.saldo.ne(0)
        ]),
          
          
        {
          sort: (s) => s.createdAt(SortDirection.DESCENDING),
        }
      ).subscribe((snapshot) => {
        const { items, isSynced } = snapshot;
        console.log(items)
        setData(items);

      })

      return () => {
        sub.unsubscribe();
        setData([]);

      };
    }
  }, [Tercero]);


  return { loading, data, error };
}




export default { useModelCarteraProveedores, useModelCarteraProveedoresByTercero }