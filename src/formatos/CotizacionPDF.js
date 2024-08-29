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
import React from "react";


import moment from "moment";
// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    fontFamily: "Times-Roman",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  image: {
    width: "80%",
    textAlign: "center",
  },
  image_footer: {
    position: "absolute",
    fontSize: 12,
    bottom: 0,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
  title: {

    margin: 10,
    paddingBottom: 5,
    fontSize: 14,
  },
  subtitle: {
    fontSize: 14,
    marginLeft: 20,
    marginRight: 20,
  },
  subtitle2: {
    fontSize: 16,
    marginLeft: 20,
    marginRight: 20,
    paddingBottom: 15,
  },
  data: {
    fontSize: 13,
    marginLeft: 45,
    marginRight: 20,
    marginTop: 2,
  },
  data1: {
    fontSize: 14,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 0,
  },
  table: {
    display: "table",
    fontSize: 12,
    width: "auto",
    borderStyle: "solid",

    borderRightWidth: 0,
    borderBottomWidth: 0
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row"
  },
  tableCol: {

    borderStyle: "solid",

    borderLeftWidth: 0,
    borderTopWidth: 0
  },
  tableCell: {
    whiteSpace: 'nowrap', // Evita el salto de línea
    overflow: 'hidden',
    textOverflow: 'ellipsis', // Recorta el texto que excede el ancho
    padding: 1,

  }
});

// Create Document Component

Font.register({
  family: "Oswald",
  src: "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf",
});

export default function CotizacionPDF({ data, items }) {


  var numberFormat = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  });


  //const chunkArray = (arr, chunkSize) => {
  //  let result = [];
  //  for (let i = 0; i < arr.length; i += chunkSize) {
  //    result.push(arr.slice(i, i + chunkSize));
  //  }
  //  console.log(result)
  //  return result;
  //};
  const chunkArray = (arr, firstChunkSize, otherChunkSize) => {
    if (arr.length <= firstChunkSize) {
      // Si el arreglo es más pequeño o igual al primer tamaño de fragmento, devuelve el arreglo completo
      return [arr];
    }

    // Iniciar el resultado con el primer fragmento
    let result = [arr.slice(0, firstChunkSize)];

    // Iterar sobre el resto del arreglo para crear los demás fragmentos
    for (let i = firstChunkSize; i < arr.length; i += otherChunkSize) {
      result.push(arr.slice(i, i + otherChunkSize));
    }

    console.log(result);
    return result;
  };

  // Suponiendo que `items` es tu array de elementos
  const itemsPorPagina = 13;
  const lastChunkMaxSize = 13;

  const myArray = Array.from({ length: 35 }, (_, index) => index + 1); // Un arreglo de 35 elementos numéricos, por ejemplo



  const paginasDeItems = chunkArray(items, lastChunkMaxSize, itemsPorPagina);
  console.log(paginasDeItems)
  let count = 0
  return (
    <PDFViewer style={{ width: '100%', height: '85vh' }}>
      <Document >
        {paginasDeItems.map((itemsDePagina, pageIndex) => {


          return (
            <Page size="A4" style={styles.page} >
              <Image src="/img/EmcabezadoLevantamientos.png" />
              <View style={styles.section}>


                <Text style={styles.title}>{`Supia Caldas, ${moment(data?.fecha_cotizacion).format(
                  "LL"
                )}`}</Text>
                <Text style={styles.subtitle}>Estimado/a:</Text>
                <Text style={styles.subtitle2}>{data?.Tercero?.nombre_completo || data?.cliente?.nombre_completo}</Text>

                <Text style={styles.subtitle}>
                  En
                  <Text style={{ fontWeight: "bold", color: "#ff7300" }}>
                    {" "}
                    FERRETERIA GIRALDO
                  </Text>
                  <Text> nos complace ofrecerle nuestros productos de ferretería de alta calidad.


                  </Text>


                </Text>
                <Text style={styles.subtitle}>
                  A continuación, detallamos los productos solicitados y sus precios correspondientes:
                </Text>

                <View style={styles.section}>

                  <View style={styles.table}>
                    <View style={styles.tableRow}>
                      <View style={{
                        ...styles.tableCell,
                        width: "5%",
                        textAlign: 'left',
                        borderBottom: 1,
                      }}>
                        <Text style={styles.tableCell}>#</Text>
                      </View>
                      <View style={{
                        ...styles.tableCell,
                        width: "45%",
                        textAlign: 'left',
                        borderBottom: 1,
                      }}>
                        <Text style={styles.tableCell}>Producto</Text>
                      </View>
                      <View style={{
                        ...styles.tableCell,
                        width: "10%",
                        borderBottom: 1,
                        textAlign: 'center'
                      }}>
                        <Text style={styles.tableCell}>Cantidad</Text>
                      </View>
                      <View style={{
                        ...styles.tableCell,
                        width: "20%",
                        borderBottom: 1,
                        textAlign: 'right'
                      }}>
                        <Text style={styles.tableCell}>Precio Unitario</Text>
                      </View>
                      <View style={{
                        ...styles.tableCell,
                        width: "20%",
                        borderBottom: 1,
                        textAlign: 'right'
                      }}>
                        <Text style={styles.tableCell}>Total</Text>
                      </View>
                    </View>
                    {itemsDePagina.map((item, itemIndex) => {
                      count++
                      return (
                        <View key={itemIndex} style={styles.tableRow}>
                          <View style={{
                            ...styles.tableCell,
                            width: "5%",
                            textAlign: 'left',
                            borderBottom: 1,
                          }}>
                            <Text style={styles.tableCell}>{count}</Text>
                          </View>
                          <View style={{
                            ...styles.tableCell,
                            width: "45%",
                            textAlign: 'left',
                            borderBottom: 1,
                            height: 20

                          }}>
                            <Text style={styles.tableCell}>{item.nombre_item?.toUpperCase()}</Text>
                          </View>
                          <View style={{
                            ...styles.tableCell,
                            width: "10%",
                            borderBottom: 1,
                            textAlign: 'center'
                          }}>
                            <Text style={styles.tableCell}>{item.cantidad}</Text>
                          </View>
                          <View style={{
                            ...styles.tableCell,
                            width: "20%",
                            borderBottom: 1,
                            textAlign: 'right'
                          }}>
                            <Text style={styles.tableCell}>{numberFormat.format(item.subtotal_item + item.iva_item)}</Text>
                          </View>
                          <View style={{
                            ...styles.tableCell,
                            width: "20%",
                            borderBottom: 1,
                            textAlign: 'right'
                          }}>
                            <Text style={styles.tableCell}>{numberFormat.format(item.total_item)}</Text>
                          </View>
                        </View>
                      )
                    }
                    )}
                  </View>

                </View>
                {paginasDeItems.length === pageIndex + 1 ?
                  <>
                    <Text
                      style={{ ...styles.data1, marginBottom: 5, textAlign: 'right' }}
                    >{paginasDeItems.length === pageIndex + 1 ? `Total de la Cotización: ${numberFormat.format(data.total)}` : `Continuara...`}</Text>
                    <Text
                      style={{ ...styles.data1, textAlign: 'left' }}
                    >{`Formas de Pago`}</Text>
                    <Text
                      style={{ ...styles.data1, textAlign: 'left' }}
                    >{`Pago Efectivo, Transferencia Bancaria, Tarjetas Debito y Credito.`}</Text>
                    <Text
                      style={{ ...styles.data1, marginBottom: 30, textAlign: 'left' }}
                    >{`Cuenta de Ahorros Davivienda: 000-0000-0000-000`}</Text>

                    <Text
                      style={{ ...styles.data1, marginBottom: 40 }}
                    >{`Cordialmente`}</Text>

                    <Text style={{ ...styles.data, marginBottom: 25, width: 200, borderTop: 1 }}>{`Ferreteria y Deposito GIRALDO`}</Text>
                  </>
                  : <>
                    <Text
                      style={{ ...styles.data1, marginBottom: 10, textAlign: 'right' }}
                    >{`Continua...`}</Text>

                    <Text
                      style={{ ...styles.data1, marginBottom: 10, textAlign: 'right' }}
                    >{`Pagina ${pageIndex + 1} de ${paginasDeItems.length}`}</Text>
                  </>
                }
                <Image src="/img/FooterMembrete.png" style={{ borderBottom: 10 }} />
              </View>

            </Page>

          )
        })}

      </Document>
    </PDFViewer>
  );
}
