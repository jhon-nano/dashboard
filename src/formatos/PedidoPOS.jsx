import {
    Document,
    Image,
    PDFViewer,
    Page,
    StyleSheet,
    Text,
    View
} from "@react-pdf/renderer";
import React from "react";
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



export default function PedidoPOS({ data, items }) {


    var numberFormat = new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0,
    });

    function formatCedula(cedula) {
        // Verificar si la cédula es suficientemente larga
        if (cedula.length <= 3) {
            return cedula; // Devuelve la cédula tal como está si es muy corta
        }

        // Coger los últimos tres caracteres
        const lastThree = cedula.slice(-3);
        // Crear una cadena de asteriscos para los caracteres restantes
        const maskedPart = '*'.repeat(cedula.length - 3);

        return maskedPart + lastThree;
    }

    let count = 0
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

                                <Text style={{ ...styles.tableCell, padding: 2, marginBottom: 0, marginTop: 0, fontSize: 11, fontFamily: 'Courier-Bold' }}>{data.Almacen.tradeName.toUpperCase()}</Text>
                                <Text style={{ ...styles.tableCell, padding: 2, marginBottom: 0, marginTop: 0, fontSize: 8 }}>{data.Almacen.nit}</Text>
                                <Text style={{ ...styles.tableCell, padding: 2, marginBottom: 0, marginTop: 0, fontSize: 8 }}>{data.Almacen.direccion}</Text>
                                <Text style={{ ...styles.tableCell, padding: 2, marginBottom: 0, marginTop: 0, fontSize: 8, borderBottom: 1 }}>{`${data.Almacen.telefono} - ${data.Almacen.ciudad}`}</Text>
                            </View>

                        </View>
                        <View style={{ ...styles.tableRow }}>

                            <View style={{
                                ...styles.tableCell,
                                width: "60%",
                                textAlign: 'left'
                            }}>
                                <Text style={{ ...styles.tableCell, padding: 2, marginBottom: 0, marginTop: 0, fontSize: 8 }}>
                                    {new Date(data.createdAt).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false })}
                                </Text>
                            </View>
                            <View style={{
                                ...styles.tableCell,
                                width: "40%",
                                textAlign: 'right'
                            }}>
                                <Text style={{ ...styles.tableCell, padding: 2, marginBottom: 0, marginTop: 0, fontSize: 9, fontFamily: 'Courier-Bold' }}>
                                    PEDIDO # {data.consecutivo}
                                </Text>
                            </View>
                        </View>
                        <View style={{ ...styles.tableRow, borderLeft: 1, borderRight: 1, borderTop: 1 }}>

                            <View style={{
                                ...styles.tableCell,
                                width: "35%",
                            }}>
                                <Text style={{ ...styles.tableCell, padding: 2, marginBottom: 0, marginTop: 0, fontSize: 8 }}>
                                    Identificacion:
                                </Text>
                            </View>
                            <View style={{
                                ...styles.tableCell,
                                width: "65%",
                                textAlign: 'center'
                            }}>

                                <Text style={{ ...styles.tableCell, padding: 2, marginBottom: 0, marginTop: 0, fontSize: 8, textAlign: 'left' }}>
                                    {formatCedula(data.Tercero?.identificacion)}
                                </Text>
                            </View>

                        </View>
                        <View style={{ ...styles.tableRow, borderLeft: 1, borderRight: 1, borderBottom: 1 }}>

                            <View style={{
                                ...styles.tableCell,
                                width: "35%",
                            }}>
                                <Text style={{ ...styles.tableCell, padding: 2, marginBottom: 0, marginTop: 0, fontSize: 8 }}>
                                    Nombre:
                                </Text>
                            </View>
                            <View style={{
                                ...styles.tableCell,
                                width: "65%",
                                textAlign: 'center'
                            }}>

                                <Text style={{ ...styles.tableCell, padding: 2, marginBottom: 0, marginTop: 0, fontSize: 8, textAlign: 'left' }}>
                                    {data.Tercero?.nombre_completo}
                                </Text>
                            </View>

                        </View>
                        <View style={styles.table}>
                            <View style={{ ...styles.tableRow, borderBottom: 1, borderTop: 1, marginTop: 5 }}>

                                <View style={{
                                    ...styles.tableCell,
                                    width: "10%",
                                    textAlign: 'left',

                                    textAlign: 'center'
                                }}>
                                    <Text style={styles.tableCell}>COD</Text>
                                </View>
                                <View style={{
                                    ...styles.tableCell,
                                    width: "35%",
                                    textAlign: 'left',

                                    textAlign: 'center'
                                }}>
                                    <Text style={styles.tableCell}>PRODUCTO</Text>
                                </View>
                                <View style={{
                                    ...styles.tableCell,
                                    width: "10%",

                                    textAlign: 'center'
                                }}>
                                    <Text style={styles.tableCell}>UND</Text>
                                </View>
                                <View style={{
                                    ...styles.tableCell,
                                    width: "20%",

                                    textAlign: 'center'
                                }}>
                                    <Text style={styles.tableCell}>PRECIO</Text>
                                </View>
                                <View style={{
                                    ...styles.tableCell,
                                    width: "20%",

                                    textAlign: 'center'
                                }}>
                                    <Text style={styles.tableCell}>TOTAL</Text>
                                </View>
                            </View>
                            {items.map((item, itemIndex) => {



                                count++
                                return (
                                    <View key={itemIndex} style={styles.tableRow}>

                                        <View style={{
                                            height: 12,
                                            width: "10%",
                                            textAlign: 'left',
                                            borderBottom: 1,
                                            textAlign: 'center'
                                        }}>
                                            <Text style={styles.tableCell}>{item.Producto?.codigo?.substring(item.Producto.codigo?.length - 4)}</Text>
                                        </View>
                                        <View style={{
                                            height: 12,
                                            width: "35%",
                                            textAlign: 'left',
                                            borderBottom: 1,
                                            paddingLeft: 2,

                                        }}>
                                            <Text style={styles.tableCell}>{item.Producto?.nombreProducto?.toUpperCase()}</Text>
                                        </View>
                                        <View style={{
                                            height: 12,
                                            width: "10%",
                                            borderBottom: 1,
                                            textAlign: 'center'
                                        }}>
                                            <Text style={styles.tableCell}>{item.cantidad}</Text>
                                        </View>
                                        <View style={{
                                            height: 12,
                                            width: "17%",
                                            borderBottom: 1,
                                            textAlign: 'right'
                                        }}>
                                            <Text style={styles.tableCell}>{numberFormat.format(item.subtotal_item + item.iva_item)}</Text>
                                        </View>
                                        <View style={{

                                            height: 12,
                                            width: "23%",
                                            borderBottom: 1,
                                            textAlign: 'right',
                                        }}>
                                            <Text style={styles.tableCell}>{numberFormat.format(item.total_item)}</Text>
                                        </View>
                                    </View>
                                )
                            }
                            )}

                        </View>
                        <View style={styles.footer}>
                            <View style={{ ...styles.tableRow, borderBottom: 1 }}>
                                <View style={{

                                    width: "100%",
                                    textAlign: 'right',
                                    fontSize: 14,
                                    height: 5
                                }}>
                                    <Text style={{ ...styles.tableCell, padding: 2, marginBottom: 0, marginTop: 0, fontSize: 8 }}>

                                    </Text>
                                </View>

                            </View>
                            <View style={{ ...styles.tableRow, borderBottom: 1 }}>

                                <View style={{

                                    width: "100%",
                                    textAlign: 'right'
                                }}>
                                    <Text style={{ ...styles.tableCell, padding: 2, marginBottom: 0, marginTop: 0, fontSize: 10, fontFamily: 'Courier-Bold' }}>
                                        TOTAL: $ {numberFormat.format(data.total)}
                                    </Text>
                                </View>



                            </View>
                            {data.cambio && <>
                                <View style={{ ...styles.tableRow, borderBottom: 1 }}>
                                    <View style={{

                                        width: "100%",
                                        textAlign: 'right'
                                    }}>
                                        <Text style={{ ...styles.tableCell, padding: 2, marginBottom: 0, marginTop: 0, fontSize: 8 }}>
                                            EFECTIVO: $ {numberFormat.format(data.total + data.cambio)}
                                        </Text>
                                    </View>
                                </View>
                                <View style={{ ...styles.tableRow, borderBottom: 1 }}>
                                    <View style={{

                                        width: "100%",
                                        textAlign: 'right'
                                    }}>
                                        <Text style={{ ...styles.tableCell, padding: 2, marginBottom: 0, marginTop: 0, fontSize: 8 }}>
                                            CAMBIO: $ {numberFormat.format(data.cambio)}
                                        </Text>
                                    </View>
                                </View>
                            </>}


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
                                    fontSize: 14
                                }}>
                                    <Text style={{ padding: 2, marginBottom: 0, marginTop: 0, fontSize: 8, textAlign: 'center' }}>
                                        {data.observaciones}
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
                            <Text style={{ ...styles.tableCell, padding: 2, marginBottom: 0, marginTop: 0, fontSize: 12, textAlign: 'center', fontFamily: 'Courier-Bold' }}>
                                GRACIAS POR SU CONFIANZA
                            </Text>
                        </View>
                    </View>
                </Page>
            </Document>
        </PDFViewer>
    );
}
