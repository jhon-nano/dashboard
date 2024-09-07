// useApi.js
import { DataStore, Predicates, SortDirection } from "aws-amplify";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Ticket } from "../../models";
import { queryTickets } from "../../store/actions/productos";

export function useModelTicketById(id) {



  const [loading, setLoading] = useState(true);  // Estado para controlar si la carga está en progreso
  const [ticket, setTicket] = useState(null);  // Estado para almacenar los datos del modelo
  const [error, setError] = useState();  // Estado para almacenar un posible error que ocurra al obtener los datos

  // Efecto secundario que se ejecuta cuando el ID cambia
  useEffect(() => {
    // Verificar si se ha proporcionado un ID válido
    if (id !== undefined) {
      // Observar los cambios en el modelo específico filtrado por su ID
      const sub = DataStore.observeQuery(Ticket, (c) => c.id.eq(id)).subscribe(
        async ({ items }) => {
          // Actualizar los datos del modelo con el primer item recibido (debe haber solo uno)


          try {


            const { Almacen, Usuario } = items[0];
 
            const almacen = await Almacen;
            const usuario = await Usuario;
    
 
            setTicket(
              {
                ...items[0],
                Almacen: almacen,
                Usuario: usuario
                //Proveedores: resultadosServicio
              });

          } catch (error) {
            console.error('Error al obtener los datos:', error);
          }




          setLoading(false);    // Finalizar la carga estableciendo loading en falso
        },
        (error) => {
          setError(error);      // Manejar cualquier error que ocurra durante la obtención de los datos
          setLoading(false);    // Finalizar la carga con error estableciendo loading en falso
        }
      );




      // Función de limpieza que se ejecuta cuando el componente se desmonta o el ID cambia
      return () => {
        sub.unsubscribe(); // Desuscribirse de las actualizaciones del modelo para evitar fugas de memoria
        setTicket(null);// Restablecer los datos almacenados para evitar cambios inesperados



      };
    }
  }, [id]);

  // Devolver los resultados del hook: loading, data y error
  return { loading, ticket, error };
}



export function useModelTickets() {

  const [tickets, setTickets] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {


    const sub_productos = DataStore.observeQuery(Ticket, Predicates.ALL, {
      sort: (s) => s.consecutivo(SortDirection.DESCENDING),
    }).subscribe((snapshot) => {
      const { items, isSynced } = snapshot;





      setTickets(items);
      setLoading(false)

    });




    return () => {
      sub_productos.unsubscribe();

    };


  }, [])


  return { tickets, loading, error };
};


