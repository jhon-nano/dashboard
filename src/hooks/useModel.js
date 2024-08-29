// useApi.js
import { DataStore, Predicates, SortDirection } from "aws-amplify";
import { useEffect, useState } from "react";


export function useModel(model) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    if (!loading && data.length == 0){
      setLoading(true)
    }
      const sub = DataStore.observeQuery(model, Predicates.ALL, {
        sort: (s) => s.createdAt(SortDirection.DESCENDING),
      }).subscribe((snapshot) => {
        const { items, isSynced } = snapshot;
      
        setData(items);
        setLoading(false);
      });

    return () => {
      setData([]);
      sub.unsubscribe();
      setLoading(false);
    };
  }, []);

  return { loading, data, error };
};

export function useModelID(model, id) {

  const [loading, setLoading] = useState(true);  // Estado para controlar si la carga está en progreso
  const [data, setData] = useState(null);  // Estado para almacenar los datos del modelo
  const [error, setError] = useState();  // Estado para almacenar un posible error que ocurra al obtener los datos

  // Efecto secundario que se ejecuta cuando el ID cambia
  useEffect(() => {
    // Verificar si se ha proporcionado un ID válido
    if (id !== undefined) {
      // Observar los cambios en el modelo específico filtrado por su ID
      const sub = DataStore.observeQuery(model, (c) => c.id.eq(id)).subscribe(
        ({ items }) => {
          setData(items[0]);    // Actualizar los datos del modelo con el primer item recibido (debe haber solo uno)
          setLoading(false);    // Finalizar la carga estableciendo loading en falso
        },
        (error) => {
          setError(error);      // Manejar cualquier error que ocurra durante la obtención de los datos
          setLoading(false);    // Finalizar la carga con error estableciendo loading en falso
        }
      );
      // Función de limpieza que se ejecuta cuando el componente se desmonta o el ID cambia
      return () => {
        setData(null);// Restablecer los datos almacenados para evitar cambios inesperados
        sub.unsubscribe(); // Desuscribirse de las actualizaciones del modelo para evitar fugas de memoria
      };
    }
  }, [id]);

  // Devolver los resultados del hook: loading, data y error
  return { loading, data, error };
}




export default { useModel, useModelID };
