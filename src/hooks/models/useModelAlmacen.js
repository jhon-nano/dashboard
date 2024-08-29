import { DataStore, Predicates, SortDirection } from "aws-amplify";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Almacen } from "../../models";
import { queryTerceros } from "../../store/actions/terceros";


export function useModelAlmacenes() {

  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState();

  useEffect(() => {
    setLoading(true);
    const sub = DataStore.observeQuery(Almacen, Predicates.ALL, {
      sort: (s) => s.createdAt(SortDirection.DESCENDING),
    }).subscribe((snapshot) => {
      const { items, isSynced } = snapshot;

      dispatch(queryTerceros(items))

      setLoading(false);
    });

    return () => {

      sub.unsubscribe();
      dispatch(queryTerceros([]))
      setLoading(false);
    };
  }, []);

  return { loading, error };
};


export function useModelIDAlmacenes(id) {



  const [loading, setLoading] = useState(true);

  const [almacen, setAlmacen] = useState(null);

  const [error, setError] = useState();

  useEffect(() => {
    if (id !== undefined) {

      const subscription = DataStore.observeQuery(
        Almacen, (c) => c.id.eq(id)
      ).subscribe((snapshot) => {
        const { items, isSynced } = snapshot;
        setAlmacen(
          items[0]
        );
      });



      return () => {
        subscription.unsubscribe();

      };

    }
  }, [id]);



  return { loading, almacen,  error };
}


export default { useModelAlmacenes, useModelIDAlmacenes }