import { DataStore, Predicates, SortDirection } from "aws-amplify";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ModuloUserAlmacenes, ModuloUserPermiso, Tercero, Usuario } from "../../models";
import { queryTerceros } from "../../store/actions/terceros";


export function useModelUsuarios() {

  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState();

  useEffect(() => {
    setLoading(true);
    const sub = DataStore.observeQuery(Tercero, Predicates.ALL, {
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


export function useModelIDUsuario(id) {



  const [loading, setLoading] = useState(true);

  const [usuario, setUsuario] = useState(null);
  const [almacenes_usuario, setAlmacenesUsuario] = useState([]);
  const [permisos_usuario, setPermisosUsuario] = useState([]);

  const [error, setError] = useState();

  useEffect(() => {
    if (id !== undefined) {

      const subscription_terceros = DataStore.observeQuery(
        Usuario, (c) => c.id.eq(id)
      ).subscribe((snapshot) => {
        const { items, isSynced } = snapshot;
        setUsuario(
          items[0]
        );
      });



      return () => {
        subscription_terceros.unsubscribe();

      };

    }
  }, [id]);


  useEffect(() => {
    if (usuario !== null) {




      const subscription_almacenes = DataStore.observeQuery(
        ModuloUserAlmacenes,
        (p) => p.and((p) => [p.moduloUserAlmacenesUsuarioId.eq(usuario.id)])
      ).subscribe((snapshot) => {
        const { items, isSynced } = snapshot;

        setAlmacenesUsuario(items);
      });

      const subscription_permisos = DataStore.observeQuery(
        ModuloUserPermiso,
        (p) => p.and((p) => [p.moduloUserPermisoUsuarioId.eq(usuario.id)])
      ).subscribe((snapshot) => {
        const { items, isSynced } = snapshot;
        setPermisosUsuario(items);
      });

      return () => {
        subscription_almacenes.unsubscribe();
        subscription_permisos.unsubscribe();
      };
    }
  }, [usuario]);


  return { loading, usuario, almacenes_usuario, permisos_usuario, error };
}


export default { useModelUsuarios, useModelIDUsuario }