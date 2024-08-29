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


// Register font
Font.register({ family: 'Helvetica' });
// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    fontFamily: "Times-Roman",
  },
  section: {
    margin: 2,
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
    paddingBottom: 0,
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
  table1: {
    display: "table",
    fontSize: 14,
    width: "auto",
    borderStyle: "solid",


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

export default function PedidoPDF({ data, items }) {


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
  const itemsPorPagina = 15;
  const lastChunkMaxSize = 15;

  //const myArray = Array.from({ length: 35 }, (_, index) => index + 1); // Un arreglo de 35 elementos numéricos, por ejemplo



  const paginasDeItems = chunkArray(items, lastChunkMaxSize, itemsPorPagina);


  function numeroALetras(numero) {
    const unidades = ['', 'Uno', 'Dos', 'Tres', 'Cuatro', 'Cinco', 'Seis', 'Siete', 'Ocho', 'Nueve'];
    const especiales = ['', 'Once', 'Doce', 'Trece', 'Catorce', 'Quince', 'Dieciséis', 'Diecisiete', 'Dieciocho', 'Diecinueve'];
    const decenas = ['', 'Diez', 'Veinte', 'Treinta', 'Cuarenta', 'Cincuenta', 'Sesenta', 'Setenta', 'Ochenta', 'Noventa'];
    const centenas = ['', 'Ciento', 'Doscientos', 'Trescientos', 'Cuatrocientos', 'Quinientos', 'Seiscientos', 'Setecientos', 'Ochocientos', 'Novecientos'];

    if (numero === 0) return 'cero';
    if (numero < 0) return 'menos ' + numeroALetras(Math.abs(numero));

    if (numero < 10) return unidades[numero];
    if (numero < 20) return especiales[numero - 10];

    if (numero < 100) return decenas[Math.floor(numero / 10)] + (numero % 10 !== 0 ? ' y ' + unidades[numero % 10] : '');

    if (numero < 1000) return centenas[Math.floor(numero / 100)] + (numero % 100 !== 0 ? ' ' + numeroALetras(numero % 100) : '');

    if (numero < 1000000) return numeroALetras(Math.floor(numero / 1000)) + ' mil' + (numero % 1000 !== 0 ? ' ' + numeroALetras(numero % 1000) : '');

    return numeroALetras(Math.floor(numero / 1000000)) + ' millones' + (numero % 1000000 !== 0 ? ' ' + numeroALetras(numero % 1000000) : '');
  }


  let count = 0
  return (
    <PDFViewer style={{ width: '95%', height: '100vh' }}>
      <Document >
        {paginasDeItems.map((itemsDePagina, pageIndex) => {



          const paddedItems = [...itemsDePagina, ...Array(Math.max(0, itemsPorPagina - itemsDePagina.length)).fill({
            Producto: { codigo: '', nombreProducto: '' },
            cantidad: null,
            precio: null,
            subtotal_item: null,
            iva_item: null,
            total_item: null,

          })];



          return (
            <Page size="A4" style={styles.page} >
              <Image src="/img/EmcabezadoLevantamientos.png" />
              <View style={styles.section}>



                <View style={styles.table1}>
                  <View style={{ ...styles.tableRow, height: 100 }}>
                    <View style={{
                      ...styles.tableCell,
                      width: "70%",
                      textAlign: 'left',
                      border: 1, marginRight: 4
                    }}>

                      <Text style={{ ...styles.tableCell, padding: 2, marginBottom: 0, marginTop: 0 }}>{`Cliente/a:`}</Text>
                      <Text style={{ ...styles.tableCell, padding: 2, marginBottom: 0, marginTop: 0 }}>{`${data.Tercero.identificacion} / ${data.Tercero.nombre_completo}`}</Text>
                      <Text style={{ ...styles.tableCell, padding: 2, marginBottom: 0, marginTop: 0, fontSize: 14, border:1 }}>{`Dirección: ${data.Tercero.direccion}`}</Text>
                      <Text style={{ ...styles.tableCell, padding: 2, marginBottom: 0, marginTop: 0, fontSize: 14, border:1 }}>{`Telefono: ${data.Tercero.telefono} - Ciudad: ${data.Tercero.ciudad}`}</Text>
                      <Text style={{ ...styles.tableCell, padding: 2, marginBottom: 0, marginTop: 0, fontSize: 14, border:1 }}>{`Correo: ${data.Tercero.correo}`}</Text>
                    </View>
                    <View style={{
                      ...styles.tableCell,
                      width: "30%",
                      border: 1

                    }}>
                      <Text style={{
                        ...styles.tableCell, padding: 2, marginBottom: 0, marginTop: 0,
                        textAlign: 'center',
                        borderBottom: 1,
                        height:'25%'
                      }}>
                        {`${data?.Almacen.nombreAlmacen.toUpperCase()}`}
                      </Text>
                      <Text style={{
                        ...styles.tableCell, padding: 2, marginBottom: 0, marginTop: 0,
                        textAlign: 'center',
                        borderBottom: 1,
                        height:'25%'
                      }}>
                        {`${moment(data?.fecha_cotizacion).format(
                          "LL"
                        )}`}
                      </Text>
                      <Text style={{
                        ...styles.tableCell, padding: 2, marginBottom: 0, marginTop: 0,
                        textAlign: 'center',
                        borderBottom: 1,
                        height:'25%'
                      }}>
                        {`PEDIDO # ${data?.consecutivo}`}
                      </Text>


                      <Text style={{
                        ...styles.tableCell, padding: 2, marginBottom: 0, marginTop: 0,
                        textAlign: 'center',
                        height:'25%'
                      }}>
                        {`${data?.forma_pago}`}
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={styles.section}>

                  <View style={styles.table}>
                    <View style={styles.tableRow}>
                      <View style={{
                        ...styles.tableCell,
                        width: "5%",
                        textAlign: 'left',
                        border: 1,
                        textAlign: 'center'
                      }}>
                        <Text style={styles.tableCell}>#</Text>
                      </View>
                      <View style={{
                        ...styles.tableCell,
                        width: "8%",
                        textAlign: 'left',
                        border: 1,
                        textAlign: 'center'
                      }}>
                        <Text style={styles.tableCell}>Codigo</Text>
                      </View>
                      <View style={{
                        ...styles.tableCell,
                        width: "37%",
                        textAlign: 'left',
                        border: 1,
                        textAlign: 'center'
                      }}>
                        <Text style={styles.tableCell}>Producto</Text>
                      </View>
                      <View style={{
                        ...styles.tableCell,
                        width: "10%",
                        border: 1,
                        textAlign: 'center'
                      }}>
                        <Text style={styles.tableCell}>Cantidad</Text>
                      </View>
                      <View style={{
                        ...styles.tableCell,
                        width: "20%",
                        border: 1,
                        textAlign: 'center'
                      }}>
                        <Text style={styles.tableCell}>Precio Unitario</Text>
                      </View>
                      <View style={{
                        ...styles.tableCell,
                        width: "20%",
                        border: 1,
                        textAlign: 'center'
                      }}>
                        <Text style={styles.tableCell}>Total</Text>
                      </View>
                    </View>
                    {paddedItems.map((item, itemIndex) => {



                      count++
                      return (
                        <View key={itemIndex} style={styles.tableRow}>
                          <View style={{

                            width: "5%",
                            height: 20,
                            textAlign: 'left',
                            border: 1,
                            textAlign: 'center'
                          }}>
                            <Text style={styles.tableCell}>{count}</Text>
                          </View>
                          <View style={{

                            width: "8%",
                            height: 20,
                            textAlign: 'left',
                            border: 1,
                            textAlign: 'center'
                          }}>
                            <Text style={styles.tableCell}>{item.Producto?.codigo}</Text>
                          </View>
                          <View style={{

                            width: "37%",
                            height: 20,
                            textAlign: 'left',
                            border: 1,
                            paddingLeft: 2
                          }}>
                            <Text style={styles.tableCell}>{item.Producto?.nombreProducto?.toUpperCase()}</Text>
                          </View>
                          <View style={{

                            width: "10%",
                            height: 20,
                            border: 1,
                            textAlign: 'center'
                          }}>
                            <Text style={styles.tableCell}>{item.cantidad}</Text>
                          </View>
                          <View style={{

                            width: "20%",
                            height: 20,
                            border: 1,
                            textAlign: 'center'
                          }}>
                            <Text style={styles.tableCell}>{numberFormat.format(item.subtotal_item + item.iva_item)}</Text>
                          </View>
                          <View style={{

                            width: "20%",
                            height: 20,
                            border: 1,
                            textAlign: 'right',
                            paddingRight: 2
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
                  <View style={{ ...styles.table, height: 120 }}>
                    <View style={{ ...styles.tableRow }}>
                      <View style={{
                        ...styles.tableCell,
                        width: "63%",
                        textAlign: 'left'

                      }}>
                        <Text
                          style={{ ...styles.data1, textAlign: 'left', border: 1, padding: 3 }}
                        >{`Son: ${numeroALetras(data.total)}`}</Text>
                        <Text
                          style={{ ...styles.data1, textAlign: 'left', border: 1, padding: 3 }}
                        >{`Observaciones: ${data.observaciones}`}</Text>


                      </View>
                      <View style={{
                        ...styles.tableCell,
                        width: "20%",
                        textAlign: 'right',
                        fontSize: 14
                      }}>
                        <Text style={{
                          ...styles.tableCell, height: '20%',
                          border: 1,
                          margin: 0
                        }}>{paginasDeItems.length === pageIndex + 1 ? `SUBTOTAL:` : ``}</Text>
                        <Text style={{
                          ...styles.tableCell, height: '20%',
                          border: 1,
                          margin: 0
                        }}>{paginasDeItems.length === pageIndex + 1 ? `IVA:` : ``}</Text>
                        <Text style={{
                          ...styles.tableCell, height: '20%',
                          border: 1,
                          margin: 0
                        }}>{paginasDeItems.length === pageIndex + 1 ? `DESCUENTOS:` : ``}</Text>
                        <Text style={{
                          ...styles.tableCell, height: '20%',
                          border: 1,
                          margin: 0
                        }}>{paginasDeItems.length === pageIndex + 1 ? `TOTAL:` : `Continuara...`}</Text>
                      </View>
                      <View style={{
                        ...styles.tableCell,
                        width: "17%",
                        textAlign: 'right',
                        fontSize: 14
                      }}>
                        <Text style={{
                          ...styles.tableCell, height: '20%',
                          border: 1,
                          margin: 0
                        }}>{paginasDeItems.length === pageIndex + 1 ? `${numberFormat.format(data.subtotal)}` : ``}</Text>
                        <Text style={{
                          ...styles.tableCell, height: '20%',
                          border: 1,
                          margin: 0
                        }}>{paginasDeItems.length === pageIndex + 1 ? `${numberFormat.format(data.iva)}` : ``}</Text>
                        <Text style={{
                          ...styles.tableCell, height: '20%',
                          border: 1,
                          margin: 0
                        }}>{paginasDeItems.length === pageIndex + 1 ? `${numberFormat.format(0)}` : ``}</Text>
                        <Text style={{
                          ...styles.tableCell, height: '20%',
                          border: 1,
                          margin: 0
                        }}>{paginasDeItems.length === pageIndex + 1 ? `${numberFormat.format(data.total)}` : `Continuara...`}</Text>
                      </View>
                    </View>
                  </View>
                  :
                  <View style={{ ...styles.table, height: 120 }}>
                    <View style={{ ...styles.tableRow }}>
                      <View style={{
                        ...styles.tableCell,
                        width: "70%",
                        textAlign: 'left'

                      }}>
                        <Text
                          style={{ ...styles.data1, textAlign: 'left', border: 1, padding: 3 }}
                        >{`Son: ${numeroALetras(data.total)}`}</Text>
                        <Text
                          style={{ ...styles.data1, textAlign: 'left', border: 1, padding: 3 }}
                        >{`Observaciones: ${data.observaciones}`}</Text>


                      </View>
                      <View style={{
                        ...styles.tableCell,
                        width: "30%",
                        textAlign: 'right',

                      }}>
                        <Text style={{ ...styles.tableCell, fontSize: 20, marginRight: 15 }}>{`Continua...`}</Text>
                        <Text style={{ ...styles.tableCell, fontSize: 20, marginRight: 15 }}>{`Pagina ${pageIndex + 1} de ${paginasDeItems.length}`}</Text>
                      </View>
                    </View>
                  </View>



                }


                <View style={{ ...styles.table }}>
                  <View style={styles.tableRow}>
                    <View style={{
                      ...styles.tableCell,
                      width: "50%",
                      textAlign: 'left',

                    }}>
                      <Text
                        style={{ ...styles.data1, marginBottom: 40 }}
                      >{`Comprador`}</Text>

                      <Text style={{ ...styles.data, marginBottom: 25, width: 200, borderTop: 1 }}>{`Recibido y Aceptado`}</Text>
                    </View>
                    <View style={{
                      ...styles.tableCell,
                      width: "50%",
                      textAlign: 'right',

                    }}>
                      <Text
                        style={{ ...styles.data1, marginBottom: 40 }}
                      >{`Cordialmente`}</Text>

                      <Text style={{ ...styles.data, marginBottom: 25, width: 200, borderTop: 1 }}>{data.Almacen.nombreAlmacen}</Text>
                    </View>
                  </View>
                </View>

                <Image src="/img/FooterMembrete.png" />
              </View>

            </Page>

          )
        })}

      </Document>
    </PDFViewer>
  );
}
