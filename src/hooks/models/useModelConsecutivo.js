// useApi.js
import { DataStore } from "aws-amplify";
import { useEffect, useState } from "react";
import { Compra, Consecutivo } from "../../models";


export function useModelConsecutivosByAlmacenId(id) {
    const [loading, setLoading] = useState(true);
  
    const [data, setData] = useState([]);
    const [error, setError] = useState();
  
    useEffect(() => {
      if (id !== undefined) {
        const sub = DataStore.observeQuery(Consecutivo, (c) => c.consecutivoAlmacenId.eq(id)).subscribe(
          ({ items }) => {
       
            setData(items);

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
  
  
  export default { useModelConsecutivosByAlmacenId }