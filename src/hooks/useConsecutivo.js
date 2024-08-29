// useApi.js
import { DataStore } from "aws-amplify";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Consecutivo } from "../models";

const useConsecutivo = (setValue, codigo) => {

  const { enqueueSnackbar } = useSnackbar();

  const {     modulo  } = useSelector((state) => state.usuario);
  
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState();

  useEffect(() => {

 
      const sub = DataStore.observeQuery(
        Consecutivo,
        (p) =>
          p.and((p) => [
            p.codigo.eq(codigo)
          ]),

        (c) => c
      ).subscribe(({ items }) => {
        if (items.length > 0) {
          setValue('Consecutivo', items[0]);
          setLoading(false);
        } else  {

          enqueueSnackbar(
            `Sin Consecutivo.`,
            {
              variant: "warning",
            }
          );
      
          setValue('Consecutivo', null)
          setLoading(true);
        }
      });

      return () => {
        sub.unsubscribe();
      };

  }, []);

  return { loading, error };
};

export default useConsecutivo;
