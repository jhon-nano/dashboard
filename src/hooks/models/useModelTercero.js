import { DataStore, Predicates, SortDirection } from "aws-amplify";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Compra, Pedido, SolicitudCredito, Tercero } from "../../models";
import { queryTerceros } from "../../store/actions/terceros";


export function useModelTerceros() {

    const dispatch = useDispatch()

    const { terceros } = useSelector((state) => state.terceros)

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState();

    useEffect(() => {

        if (terceros.length == 0) {
            setLoading(true);
        }
        const sub = DataStore.observeQuery(Tercero, Predicates.ALL, {
            sort: (s) => s.createdAt(SortDirection.DESCENDING),
        }).subscribe((snapshot) => {
            const { items, isSynced } = snapshot;

            dispatch(queryTerceros(items))

            setLoading(false);
        });

        return () => {

            sub.unsubscribe();
            setLoading(false);
        };
    }, []);

    return { loading, error };
};


export function useModelIDTercero(id) {



    const [loading, setLoading] = useState(true);

    const [tercero, setTercero] = useState(null);
    const [compras, setCompras] = useState([]);
    const [pedidos, setPedidos] = useState([]);
    const [creditos, setCreditos] = useState([]);
    const [ajustes, setAjustes] = useState([]);
    const [casos, setCasos] = useState([]);
    const [error, setError] = useState();

    useEffect(() => {
        if (id !== undefined) {

            const subscription_terceros = DataStore.observeQuery(
                Tercero, (c) => c.id.eq(id)
            ).subscribe((snapshot) => {
                const { items, isSynced } = snapshot;
                setTercero(
                    items[0]
                );
            });



            return () => {
                subscription_terceros.unsubscribe();

            };

        }
    }, [id]);


    useEffect(() => {
        if (tercero) {
            const subscription_compras = DataStore.observeQuery(
                Compra,
                (p) => p.and((p) => [p.compraTerceroId.eq(tercero.id)]),
                {
                    sort: (s) => s.fecha_compra(SortDirection.ASCENDING),
                }
            ).subscribe((snapshot) => {
                const { items, isSynced } = snapshot;
                setCompras(
                    items.map((e) => {
                        return { ...e, fecha: e.fecha_compra };
                    })
                );
            });

            const subscription_creditos = DataStore.observeQuery(
                SolicitudCredito,
                (p) =>
                    p.or((p) => [
                        p.solicitudCreditoClienteId.eq(tercero.id),
                        p.solicitudCreditoCodeudorId.eq(tercero.id),
                        p.solicitudCreditoSegundoCodeudorId.eq(tercero.id),
                    ]),
                {
                    sort: (s) => s.fecha(SortDirection.ASCENDING),
                }
            ).subscribe((snapshot) => {
                const { items, isSynced } = snapshot;
                setCreditos(items);
            });
            const subscription_pedidos = DataStore.observeQuery(
                Pedido,
                (p) => p.and((p) => [p.pedidoTerceroId.eq(tercero.id)]),
                {
                    sort: (s) => s.fecha_pedido(SortDirection.ASCENDING),
                }
            ).subscribe((snapshot) => {
                const { items, isSynced } = snapshot;
                setPedidos(
                    items.map((e) => {
                        return { ...e, fecha: e.fecha_pedido };
                    })
                );
            });
            return () => {
                subscription_compras.unsubscribe();
                subscription_creditos.unsubscribe();
                subscription_pedidos.unsubscribe();
            };
        }
    }, [tercero]);


    return { loading, tercero, compras, pedidos, creditos, ajustes, casos, error };
}


export default { useModelIDTercero }