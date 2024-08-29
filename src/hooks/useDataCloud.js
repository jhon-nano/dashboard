// useApi.js
import { DataStore, Hub, I18n, syncExpression } from "aws-amplify";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  networkStatus,
  outboxStatus
} from "../store/actions/app";
import { AjusteInventario, AjusteInventarioItem, Almacen, CommentarioSolicitud, Compra, CompraItem, LevantamientoReserva, Pedido, PedidoItem, SolicitudCredito, Usuario } from "../models";
import { useAuthenticator } from "@aws-amplify/ui-react";






export default function useDataCloud() {
  const dispatch = useDispatch();
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [totalModels, setTotalModels] = useState(0);


  useEffect(() => {
    // Escuchar eventos de DataStore
    const listener = (data) => {
      const { payload } = data;

      switch (payload.event) {
        case "networkStatus":
          dispatch(networkStatus(payload.data.active));
          break;
        case "outboxStatus":
          dispatch(outboxStatus(payload.data.isEmpty));
          break;
        case "syncQueriesStarted":
          setLoading(true);
          setLoadingMessage(`Sincronizando Información...`);
          setTotalModels(payload.data.models.length);
          break;
        case "modelSynced":
          const { model, counts } = payload.data;
          console.log(`Model: ${model.name}, New: ${counts.new}, Updated: ${counts.updated}, Deleted: ${counts.deleted}`);
          setLoadingMessage(`Modelo sincronizado: ${model.name}`);
          setProgress((prevProgress) => prevProgress + 3);
          break;
        case "ready":
          setLoading(false);
          break;
        case "syncQueriesReady":
          setLoading(false);
          break;
        default:
          console.log('Evento no manejado:', payload.event, payload);
          break;
      }
    };

    Hub.listen("datastore", listener);

    // Devolver las variables de estado necesarias
    return () => {
      Hub.remove("datastore");
    };

  }, []); // Asegúrate de incluir todas las dependencias necesarias aquí

  return { progress, loading, loadingMessage, totalModels };
}