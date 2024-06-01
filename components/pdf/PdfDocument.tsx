// PdfDocument.js
import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
      padding: 30,
    },
    title: {
      fontSize: 30,
      padding: 5,
      fontWeight: "extrabold",
      textAlign: "center"
    },
    table: {
      display: 'flex',
      width: 'auto',
      margin: '0 auto',
      flexDirection: 'column',
    },
    tableRow: {
      flexDirection: 'row',
    },
    tableCol: {
      width: '50%',
      borderStyle: 'solid',
      borderWidth: 2,
      borderColor: '#000',
    },
    tableCell: {
      margin: 'auto',
      marginTop: 5,
      fontSize: 15,
      fontWeight:'demibold' ,
    },
    dateInfo: {
      marginBottom: 10,
      display:"flex",
      justifyContent: "center",
      alignItems: "center"
  },
  })

const PdfDocument = ({ chartData ,dateStart, dateEnd}:any) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Informe de Productos</Text>
      <View style={styles.dateInfo}>
                    <Text>Fecha de inicio: {dateStart || 'Todas'}</Text>
                    <Text>Fecha fin: {dateEnd || 'Todas'}</Text>
                </View>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={styles.title}>Producto</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.title}>Stock</Text>
          </View>
        </View>
        {chartData.labels.map((label:any, index:any) => (
          <View style={styles.tableRow} key={index}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{label}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{chartData.datasets[0].data[index]}</Text>
            </View>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default PdfDocument;
