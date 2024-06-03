import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

function PdfContabilidad({ chartData, dateStart, dateEnd }:any) {
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
      width : "25%"
    },
    tableCol: {
      width: '100%',
      borderStyle: 'solid',
      borderWidth: 2,
      borderColor: '#000',
    },
    tableCell: {
      margin: 'auto',
      marginTop: 2,
      fontSize: 10,
      fontWeight: 'demibold',
    },
    dateInfo: {
      marginBottom: 10,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Informe de Contabilidad</Text>
        <View style={styles.dateInfo}>
          <Text>Fecha de inicio: {dateStart || 'Todas'}</Text>
          <Text>Fecha fin: {dateEnd || 'Todas'}</Text>
        </View>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Periodo</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Ingresos</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Gastos</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Ganancias</Text>
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
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{chartData.datasets[1].data[index]}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{chartData.datasets[2].data[index]}</Text>
              </View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
}

export default PdfContabilidad;
