"use client";
import { useEffect, useState } from "react";
import sueldos from "@/../json/sueldos.json";
import { Chart } from "primereact/chart";
import Image from "next/image";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PdfDocument from "../../../../../../components/pdf/PdfDocument";

export default function Page() {
  const [customers, setCustomers] = useState<any>([]);
  const [chartData, setChartData] = useState<any>({
    labels: [],
    datasets: [],
});
  const [chartOptions, setChartOptions] = useState({});
  const [dateStart, setDateStart] = useState<string>('');
    const [dateEnd, setDateEnd] = useState<string>('');
    const [originalData, setOriginalData] = useState<any>([]);

  useEffect(() => {
    setCustomers(sueldos);
  }, []);

 


 

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue("--text-color");
    const textColorSecondary = documentStyle.getPropertyValue(
      "--text-color-secondary"
    );
    const surfaceBorder = documentStyle.getPropertyValue("--surface-border");
    const data = {
      labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio"],
      datasets: [
        {
          label: "Ganancias",
          backgroundColor: documentStyle.getPropertyValue("--green-300"),
          borderColor: documentStyle.getPropertyValue("--green-300"),
          data: [65, 59, 80, 81, 56, 55, 40],
        },
        {
          label: "Ingresos",
          backgroundColor: documentStyle.getPropertyValue("--blue-400"),
          borderColor: documentStyle.getPropertyValue("--blue-400"),
          data: [28, 48, 40, 19, 86, 27, 90],
        },
        {
          label: "Gastos",
          backgroundColor: documentStyle.getPropertyValue("--red-500"),
          borderColor: documentStyle.getPropertyValue("--red-300"),
          data: [78, 18, 20, 29, 36, 17, 70],
        },
      ],
    };
    const options = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            fontColor: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 500,
            },
          },
          grid: {
            display: false,
            drawBorder: false,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
    };

    setChartData(data);
    setChartOptions(options);
  }, []);

  return (
    <div className="main_principal_ main-page">
      <div className="box_content_stadisticas">
        <div className="box_content_sueldos">
          <h2>Fecha Inicio</h2>
          <input type="date" />
        </div>
        <div className="box_content_sueldos">
          <h2>Fecha Final</h2>
          <input type="date" />
        </div>
      </div>
      
      <div className="box_information_stadisticas_">
      <div className="info_ganancias_stadisticas">
        <div className="conten_card_info_stadisticas ">
          <h3>$200.00</h3>
          <h2>Ganancia</h2>
        </div>
        <div className="conten-img-stadisticas">
          <Image
            src={"/ganancia.png"}
            alt="logo"
            width={1000}
            height={1000}
            className="all"
          />
        </div>
      </div>

      <div className="info_ganancias_stadisticas">
        <div className="conten_card_info_stadisticas ">
          <h3>$2500.00</h3>
          <h2>Ingresos</h2>
        </div>
        <div className="conten-img-stadisticas">
          <Image
            src={"/ingresos.png"}
            alt="logo"
            width={1000}
            height={1000}
            className="all"
          />
        </div>
      </div>


      <div className="info_ganancias_stadisticas">
        <div className="conten_card_info_stadisticas ">
          <h3>$25.00</h3>
          <h2>Gastos</h2>
        </div>
        <div className="conten-img-stadisticas">
          <Image
            src={"/gastos.png"}
            alt="logo"
            width={1000}
            height={1000}
            className="all"
          />
        </div>
      </div>


      </div>

      <Chart type="bar" data={chartData} options={chartOptions} />
      <div className="pdf-download-link">
                    <PDFDownloadLink
                        document={<PdfDocument chartData={chartData} dateStart={dateStart} dateEnd={dateEnd} />}
                        fileName="chart_data.pdf"
                    >
                        {({ loading }) =>
                            loading ? 'Cargando documento...' : 'Descargar PDF'
                        }
                    </PDFDownloadLink>
                </div>
    </div>
  );
}
