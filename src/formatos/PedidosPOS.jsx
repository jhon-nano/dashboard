import {
    Document,
    Image,
    PDFViewer,
    Page,
    StyleSheet,
    Text,
    View
} from "@react-pdf/renderer";
import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import { useModelPedidosItemsByPedidos } from "../hooks/models/useModelPedido";
// Register font
// Create styles
const styles = StyleSheet.create({
    page: {
        flexDirection: "column",
        fontFamily: "Courier",
    },
    section: {

        paddingLeft: 8,
        paddingRight: 2,
        flexGrow: 1,
    },
    data: {
        fontSize: 13,
        marginLeft: 45,
        marginRight: 20,
        marginTop: 2,
    },
    table: {
        display: "table",
        fontSize: 7,
        width: "auto",
        borderStyle: "solid",

        borderRightWidth: 0,
        borderBottomWidth: 0
    },
    tableRow: {
        margin: "auto",
        flexDirection: "row"
    },

    tableCell: {
        whiteSpace: 'nowrap', // Evita el salto de línea
        overflow: 'hidden',
        textOverflow: 'ellipsis', // Recorta el texto que excede el ancho
        padding: 1,

    },

});

// Create Document Component



export default function PedidosPOS({ data, almacen, tipo_informe }) {

    const { usuario } = useSelector((state) => state.usuario);

    const { data: pedidosItems, dataLineas } = useModelPedidosItemsByPedidos({ pedidos: data })


    var numberFormat = new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0,
    });

    const totalesPorFormaPago = Object.values(data.reduce((acumulador, pedido) => {
        const { forma_pago, total } = pedido;
        // Verificar si ya existe una entrada para esta forma de pago
        if (!acumulador[forma_pago]) {
            // Si no existe, crea un nuevo objeto para la forma de pago
            acumulador[forma_pago] = {
                forma_pago: forma_pago,
                total: 0,
                elementos: [],
                cantidad: 0
            };
        }
        // Suma el total al acumulador
        acumulador[forma_pago].total += total;
        // Agrega el pedido al array de elementos
        acumulador[forma_pago].elementos.push(pedido);
        // Incrementa el contador de elementos
        acumulador[forma_pago].cantidad++;

        return acumulador;
    }, {}));


    const totalGeneral = Object.values(totalesPorFormaPago).reduce((total, formaPago) => {
        return total + formaPago.total;
    }, 0);


    const totalGeneralLineas = Object.values(dataLineas).reduce((total, valor) => total + valor, 0);


    


    return (
        <PDFViewer style={{ width: '95%', height: '100vh' }}>

            <Document  >
                <Page size={[205]}  >
                    <View style={styles.section}>
                        <View style={styles.tableRow}>

                            <View style={{
                                ...styles.tableCell,
                                width: "30%",
                            }}>
                                <Image
                                    alt="logo"
                                    src="/img/AplicLogo.png"
                                    width={30}
                                    height={30}
                                />
                            </View>
                            <View style={{
                                ...styles.tableCell,
                                width: "70%",
                                textAlign: 'center'
                            }}>

                                <Text style={{ ...styles.tableCell, padding: 2, marginBottom: 0, marginTop: 0, fontSize: 11, fontFamily: 'Courier-Bold' }}>{almacen?.tradeName?.toUpperCase()}</Text>
                                <Text style={{ ...styles.tableCell, padding: 2, marginBottom: 0, marginTop: 0, fontSize: 8 }}>{almacen?.nit}</Text>
                                <Text style={{ ...styles.tableCell, padding: 2, marginBottom: 0, marginTop: 0, fontSize: 8 }}>{almacen?.direccion}</Text>
                                <Text style={{ ...styles.tableCell, padding: 2, marginBottom: 0, marginTop: 0, fontSize: 8, borderBottom: 1 }}>{`${almacen?.telefono} - ${almacen?.ciudad}`}</Text>
                            </View>

                        </View>

                        <View style={{ ...styles.tableRow, borderBottom: 1 }}>

                            <View style={{
                                ...styles.tableCell,
                                width: "60%",
                                textAlign: 'left'
                            }}>
                                <Text style={{ ...styles.tableCell, padding: 2, marginBottom: 0, marginTop: 0, fontSize: 8 }}>
                                    {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false })}
                                </Text>
                            </View>
                            <View style={{
                                ...styles.tableCell,
                                width: "40%",
                                textAlign: 'right'
                            }}>
                                <Text style={{ ...styles.tableCell, padding: 2, marginBottom: 0, marginTop: 0, fontSize: 8, fontFamily: 'Courier-Bold' }}>
                                    {usuario.nombreUsuario}
                                </Text>
                            </View>
                        </View>
                        <Text style={{ ...styles.tableCell, borderBottom: 1, padding: 2, marginBottom: 0, marginTop: 0, fontSize: 14, fontFamily: 'Courier-Bold', textAlign: 'center' }}>
                            INFORME PEDIDOS
                        </Text>
                        <View style={{ ...styles.tableRow, borderBottom: 1 }}>
                            <View style={{

                                width: "100%",
                                textAlign: 'right',
                                fontSize: 14,
                                height: 15
                            }}>
                                <Text style={{ ...styles.tableCell, padding: 2, marginBottom: 0, marginTop: 0, fontSize: 8 }}>

                                </Text>
                            </View>

                        </View>
                        <View style={{ ...styles.tableRow, borderBottom: 1 }}>
                            <View style={{
                                ...styles.tableCell,
                                width: "60%",
                                textAlign: 'left'
                            }}>
                                <Text style={{ ...styles.tableCell, padding: 2, marginBottom: 0, marginTop: 0, fontSize: 8 }}>
                                    TIPO DE INFORME     :
                                </Text>
                            </View>
                            <View style={{
                                ...styles.tableCell,
                                width: "40%",
                                textAlign: 'right'
                            }}>
                                <Text style={{ ...styles.tableCell, padding: 2, marginBottom: 0, marginTop: 0, fontSize: 8, fontFamily: 'Courier-Bold' }}>
                                    {tipo_informe.filterType.toUpperCase()}
                                </Text>
                            </View>
                        </View>
                        <View style={{ ...styles.tableRow, borderBottom: 1 }}>
                            <View style={{
                                ...styles.tableCell,
                                width: "30%",
                                textAlign: 'left'
                            }}>
                                <Text style={{ ...styles.tableCell, padding: 2, marginBottom: 0, marginTop: 0, fontSize: 8 }}>
                                    RANGO
                                </Text>
                            </View>
                            <View style={{
                                ...styles.tableCell,
                                width: "70%",
                                textAlign: 'right'
                            }}>
                                <Text style={{ ...styles.tableCell, padding: 2, marginBottom: 0, marginTop: 0, fontSize: 8, fontFamily: 'Courier-Bold' }}>
                                    {tipo_informe.filterType == 'fecha' ? `${moment(tipo_informe.startDate).format('L')} al ${moment(tipo_informe.endDate).format('L')}` : `${tipo_informe.consecutivoInicial} al ${tipo_informe.consecutivoFinal}`}
                                </Text>
                            </View>
                        </View>
                        <View style={{ ...styles.tableRow, borderBottom: 1 }}>
                            <View style={{

                                width: "100%",
                                textAlign: 'right',
                                fontSize: 14,
                                height: 15
                            }}>
                                <Text style={{ ...styles.tableCell, padding: 2, marginBottom: 0, marginTop: 0, fontSize: 8 }}>

                                </Text>
                            </View>

                        </View>
                        {totalesPorFormaPago.map((element, i) =>
                            <View key={i}>
                                <View style={{ ...styles.tableRow, borderBottom: 1 }}>
                                    <View style={{
                                        ...styles.tableCell,
                                        width: "60%",
                                        textAlign: 'left'
                                    }}>
                                        <Text style={{ ...styles.tableCell, padding: 2, marginBottom: 0, marginTop: 0, fontSize: 8 }}>
                                            FORMA DE PAGO       :
                                        </Text>
                                    </View>
                                    <View style={{
                                        ...styles.tableCell,
                                        width: "40%",
                                        textAlign: 'right'
                                    }}>
                                        <Text style={{ ...styles.tableCell, padding: 2, marginBottom: 0, marginTop: 0, fontSize: 8, fontFamily: 'Courier-Bold' }}>
                                            {element.forma_pago}
                                        </Text>
                                    </View>
                                </View>

                                <View style={{ ...styles.tableRow, borderBottom: 1 }}>
                                    <View style={{
                                        ...styles.tableCell,
                                        width: "60%",
                                        textAlign: 'left'
                                    }}>
                                        <Text style={{ ...styles.tableCell, padding: 2, marginBottom: 0, marginTop: 0, fontSize: 8 }}>
                                            TOTAL PEDIDOS         :
                                        </Text>
                                    </View>
                                    <View style={{
                                        ...styles.tableCell,
                                        width: "40%",
                                        textAlign: 'right'
                                    }}>
                                        <Text style={{ ...styles.tableCell, padding: 2, marginBottom: 0, marginTop: 0, fontSize: 8, fontFamily: 'Courier-Bold' }}>
                                            $ {element.total.toLocaleString()}
                                        </Text>
                                    </View>
                                </View>
                                <View style={{ ...styles.tableRow, borderBottom: 1 }}>
                                    <View style={{
                                        ...styles.tableCell,
                                        width: "60%",
                                        textAlign: 'left'
                                    }}>
                                        <Text style={{ ...styles.tableCell, padding: 2, marginBottom: 0, marginTop: 0, fontSize: 8 }}>
                                            CANTIDAD PEDIDOS  :
                                        </Text>
                                    </View>
                                    <View style={{
                                        ...styles.tableCell,
                                        width: "40%",
                                        textAlign: 'right'
                                    }}>
                                        <Text style={{ ...styles.tableCell, padding: 2, marginBottom: 0, marginTop: 0, fontSize: 8, fontFamily: 'Courier-Bold' }}>
                                            {element.cantidad}
                                        </Text>
                                    </View>
                                </View>
                                <View style={{ ...styles.tableRow, borderBottom: 1 }}>
                                    <View style={{

                                        width: "100%",
                                        textAlign: 'right',
                                        fontSize: 14,
                                        height: 15
                                    }}>
                                        <Text style={{ ...styles.tableCell, padding: 2, marginBottom: 0, marginTop: 0, fontSize: 8 }}>

                                        </Text>
                                    </View>

                                </View>
                            </View>

                        )}
                        <View style={styles.footer}>

                            <View style={{ ...styles.tableRow, borderBottom: 1 }}>

                                <View style={{

                                    width: "100%",
                                    textAlign: 'right',
                                    fontSize: 14,
                                    height: 15
                                }}>
                                    <Text style={{ ...styles.tableCell, padding: 2, marginBottom: 0, marginTop: 0, fontSize: 8 }}>

                                    </Text>
                                </View>


                            </View>
                            <View style={{ ...styles.tableRow, borderBottom: 1 }}>

                                <View style={{

                                    width: "55%",
                                    textAlign: 'right',
                                    fontSize: 8
                                }}>
                                    <Text style={{ ...styles.tableCell, padding: 2, marginBottom: 0, marginTop: 0, fontSize: 10, fontFamily: 'Courier-Bold' }}>
                                        TOTAL GENERAL:
                                    </Text>
                                </View>
                                <View style={{

                                    width: "45%",
                                    textAlign: 'left',
                                    fontSize: 8
                                }}>
                                    <Text style={{ ...styles.tableCell, padding: 2, marginBottom: 0, marginTop: 0, fontSize: 10, fontFamily: 'Courier-Bold' }}>
                                        $ {totalGeneral.toLocaleString()}
                                    </Text>
                                </View>

                            </View>
                            <View style={{ ...styles.tableRow, borderBottom: 1 }}>

                                <View style={{

                                    width: "55%",
                                    textAlign: 'right',
                                    fontSize: 8
                                }}>
                                    <Text style={{ ...styles.tableCell, padding: 2, marginBottom: 0, marginTop: 0, fontSize: 10, fontFamily: 'Courier-Bold' }}>
                                        CANTIDAD GENERAL:
                                    </Text>
                                </View>
                                <View style={{

                                    width: "45%",
                                    textAlign: 'left',
                                    fontSize: 8
                                }}>
                                    <Text style={{ ...styles.tableCell, padding: 2, marginBottom: 0, marginTop: 0, fontSize: 10, fontFamily: 'Courier-Bold' }}>
                                        $ {data.length}
                                    </Text>
                                </View>

                            </View>
                            <View style={{ ...styles.tableRow, borderBottom: 1 }}>
                                <View style={{

                                    width: "100%",
                                    textAlign: 'right',
                                    fontSize: 14,
                                    height: 15
                                }}>
                                    <Text style={{ ...styles.tableCell, padding: 2, marginBottom: 0, marginTop: 0, fontSize: 8 }}>

                                    </Text>
                                </View>

                            </View>

                            <View style={{ ...styles.tableRow, borderBottom: 1 }}>

                                <View style={{

                                    width: "100%",
                                    textAlign: 'right',
                                    fontSize: 14,
                                    height: 15
                                }}>
                                    <Text style={{ ...styles.tableCell, padding: 2, marginBottom: 0, marginTop: 0, fontSize: 8 }}>

                                    </Text>
                                </View>


                            </View>

                        </View>


                        {tipo_informe.checkedLineas &&
                            <>
                                <Text style={{ ...styles.tableCell, borderBottom: 1, padding: 2, marginBottom: 0, marginTop: 0, fontSize: 14, fontFamily: 'Courier-Bold', textAlign: 'center' }}>
                                    INFORME LINEAS
                                </Text>
                                <View style={{

                                    width: "100%",
                                    textAlign: 'right',
                                    fontSize: 14,
                                    height: 15,
                                    borderBottom: 1
                                }}>
                                    <Text style={{ ...styles.tableCell, padding: 2, marginBottom: 0, marginTop: 0, fontSize: 8 }}>

                                    </Text>
                                </View>
                                {Object.entries(dataLineas).map(([nombreLinea, total], i) => {

                                    return (<View key={i}>
                                        <View style={{ ...styles.tableRow, borderBottom: 1 }}>
                                            <View style={{
                                                ...styles.tableCell,
                                                width: "60%",
                                                textAlign: 'left'
                                            }}>
                                                <Text style={{ ...styles.tableCell, padding: 2, marginBottom: 0, marginTop: 0, fontSize: 8 }}>
                                                    {nombreLinea}
                                                </Text>
                                            </View>
                                            <View style={{
                                                ...styles.tableCell,
                                                width: "40%",
                                                textAlign: 'right'
                                            }}>
                                                <Text style={{ ...styles.tableCell, padding: 2, marginBottom: 0, marginTop: 0, fontSize: 8, fontFamily: 'Courier-Bold' }}>
                                                    {numberFormat.format(total)}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>)
                                }

                                )}
                                <View style={{

                                    width: "100%",
                                    textAlign: 'right',
                                    fontSize: 14,
                                    height: 15,
                                    borderBottom: 1
                                }}>
                                    <Text style={{ ...styles.tableCell, padding: 2, marginBottom: 0, marginTop: 0, fontSize: 8 }}>

                                    </Text>
                                </View>
                                <View >
                                    <View style={{ ...styles.tableRow, borderBottom: 1 }}>
                                        <View style={{
                                            ...styles.tableCell,
                                            width: "60%",
                                            textAlign: 'left'
                                        }}>
                                            <Text style={{ ...styles.tableCell, padding: 2, marginBottom: 0, marginTop: 0, fontSize: 8 }}>
                                                TOTAL LINEAS :
                                            </Text>
                                        </View>
                                        <View style={{
                                            ...styles.tableCell,
                                            width: "40%",
                                            textAlign: 'right'
                                        }}>
                                            <Text style={{ ...styles.tableCell, padding: 2, marginBottom: 0, marginTop: 0, fontSize: 8, fontFamily: 'Courier-Bold' }}>
                                                {numberFormat.format(totalGeneralLineas)}
                                            </Text>
                                        </View>
                                    </View>

                                    {totalGeneralLineas}
                                </View>
                                <View style={{

                                    width: "100%",
                                    textAlign: 'right',
                                    fontSize: 14,
                                    height: 15,
                                    borderBottom: 1
                                }}>
                                    <Text style={{ ...styles.tableCell, padding: 2, marginBottom: 0, marginTop: 0, fontSize: 8 }}>

                                    </Text>
                                </View>

                            </>

                        }

                    </View>



                </Page>
            </Document>

        </PDFViewer>
    );
}