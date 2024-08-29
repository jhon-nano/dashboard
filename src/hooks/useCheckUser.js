import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ModuloService from "../services/moduloService";

import TypesModulos from "../types/typesModulos";

import { useAuthenticator } from "@aws-amplify/ui-react";
import { DataStore } from "aws-amplify";
import { Estado, Usuario } from "../models";
import {
  moduloAlmacenesUser,
  moduloPermisosUser,
  queryUsuario,
  selectModulo,
} from "../store/actions/usuario";
import AuthUtils from "../utils/authUtils";

const useCheckUser = (pathnames) => {
  //console.log('useCheckUser')
  const router = useRouter();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();


  const { user: userCognito } = useAuthenticator((context) => [context.user]);

  const userStore = useSelector((state) => state.usuario);


  const typesModulos = useMemo(() => new TypesModulos(router), [router]);

  const utilsAuth = useMemo(() => new AuthUtils(enqueueSnackbar, userStore, userCognito), [enqueueSnackbar, userStore, userCognito]);

  const serviceModulo = useMemo(() => new ModuloService(), []);

  const { usuario, modulo, almacenesAutorizados, permisosAutorizados } = userStore;


  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingAlmacenes, setLoadingAlmacenes] = useState(true);
  const [loadingModulo, setLoadingModulo] = useState(true);
  const [error, setError] = useState();



  // Función para cargar el módulo y verificar autorización
  const handleSelectModulo = (get_modulo) => {

    if (utilsAuth.isAdmin(userCognito)) {
      dispatch(selectModulo(get_modulo[0]));
    } else if (utilsAuth.isModuloAuthorized(get_modulo[0], true)) {

      const modulo_user = usuario.modulos_new.find((e) => e.path === get_modulo[0].path);


      dispatch(selectModulo(get_modulo[0]));

    } else {
      router.back()
    }
  };

  const loadModulo = async () => {

    try {
      setLoadingModulo(true);

      if (pathnames[0] === 'ventas' && pathnames[1] === 'view' || pathnames[1] === 'create' || pathnames[1] === 'update') {
        pathnames.splice(1, 1);

      }
 
      if (pathnames[0] === 'documentos' && pathnames[1] === 'view' || pathnames[1] === 'create' || pathnames[1] === 'update') {
        pathnames.splice(1, 1);
    

      }

      if (pathnames[1] === 'pedido') {
        pathnames[1] = 'pedidos';
      }
      if (pathnames[1] === 'pago') {
        pathnames[1] = 'pagos';
      }



      if (usuario && pathnames.length > 0 && usuario.modulos_new.length > 0) {

        const get_modulo = typesModulos.getModulosAppAll().filter((e) => e.path == `/${pathnames[0]}` || e.path == `/${pathnames[0]}/${pathnames[1]}`);
   
        if (get_modulo.length === 0) {
          dispatch(selectModulo({}));
        } else {
          handleSelectModulo(get_modulo);
        }
      } else {
        dispatch(selectModulo({}));
      }
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoadingModulo(false);
    }
  };

  const loadAlmacenesAndPermisos = async () => {
    if (modulo && Object.keys(modulo).length !== 0) {
      setLoadingAlmacenes(true);
      dispatch(moduloPermisosUser([]));
      dispatch(moduloAlmacenesUser([]));
      try {
        if (modulo.maneja_almacenes) {
          const model_almacenes = await serviceModulo.getModuloUserAlmacenes(usuario, modulo.path);

          if (model_almacenes.length === 0) {
            enqueueSnackbar('No tiene Almacenes Autorizados!', { variant: 'warning' });
          } else {
            const almacenes = model_almacenes.map((e) => e.Almacen);

            const data = await Promise.all(almacenes);

            dispatch(moduloAlmacenesUser(data));
          }

        }

        const model_permisos = await serviceModulo.getModuloUserPermisos(usuario);

        if (model_permisos) {
          const permisos_modulo = model_permisos.filter((e) => e.ModuloNew?.path == modulo.path).map(e => e.code);
          if (permisos_modulo.length > 0) {
            dispatch(moduloPermisosUser(permisos_modulo));
          } else if (!utilsAuth.isAdmin(userCognito)) {
            enqueueSnackbar('No tiene Permisos Autorizados!', { variant: 'warning' });
            dispatch(moduloPermisosUser([]));
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingAlmacenes(false);
      }
    }
  };

  useEffect(() => {

    if (userCognito) {
      const subscription = DataStore.observeQuery(
        Usuario,
        p => p.and(p => [
          p.username.eq(userCognito.username),
          p.sub.eq(userCognito.attributes.sub),
          p.estado.eq(Estado.ACTIVO)
        ])
      ).subscribe(snapshot => {
        const { items } = snapshot;
        if (items.length === 1) {
          //  console.log('queryUsuario')
          setLoadingUser(true);
          window.sessionStorage.setItem('SESSION', 'AUTORIZADO');
          dispatch(queryUsuario(items[0]));
        }
      });
      return () => {
        subscription.unsubscribe();
      };
    }
  }, [userCognito]);

  useEffect(() => {
    if (usuario && pathnames) {
      //  console.log('loadModulo')
      loadModulo();
    }
  }, [usuario, pathnames]);

  useEffect(() => {
    //  console.log('loadAlmacenesAndPermisos')
    loadAlmacenesAndPermisos();
  }, [usuario, modulo]);


  //console.group('useCheckUser')
  //console.log(userStore.usuario)
  //console.log(modulo)
  //console.log(almacenesAutorizados)
  //console.log(permisosAutorizados)
  //console.groupEnd();



  return { loadingUser, loadingAlmacenes, loadingModulo, error };
};

export default useCheckUser;
