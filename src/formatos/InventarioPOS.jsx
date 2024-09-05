import { useAuthenticator } from "@aws-amplify/ui-react";
import {
    Document,
    Font,
    Image,
    PDFViewer,
    Page,
    StyleSheet,
    Text,
    View,
} from "@react-pdf/renderer";
import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import { getVisibleInventarios } from "../store/selectors/inventarios";
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



export default function InventarioPOS({ almacen }) {

    const { usuario } = useSelector((state) => state.usuario);

    var numberFormat = new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0,
    });



    const inventarios = useSelector((state) => state.inventarios);
    const data = getVisibleInventarios(inventarios);




    console.log(data)

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
                            INFORME INVENTARIOS
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
                                DDD
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
                                    SSS
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
                                        $ 0.000.000
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
                    </View>



                </Page>
            </Document>

        </PDFViewer>
    );
}