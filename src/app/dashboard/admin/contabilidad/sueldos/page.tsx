"use client";
import { useEffect, useState } from "react";
import { Chart } from "primereact/chart";
import Image from "next/image";
import { PDFDownloadLink } from "@react-pdf/renderer";
import axios from "axios";
import apisPeticion from "@/api/apisPeticion";
import getConfig from "../../../../../../utils/getConfig";
import dayjs from "dayjs";
import PdfContabilidad from "../../../../../../components/pdf/PdfContabilidad";

export default function Page() {
  const [posData, setposData] = useState({
    ingreso : [] ,
    gastos : [] ,
    ganacias : []

  })
  const [ConfirPost, setConfirPost] = useState<any>(false);
  let mesfinal = dayjs().format(" YYYY-MM-DD ").split(" ")[1];
  const [startDate, setStartDate] = useState("2024-04-01");
  const [endDate, setEndDate] = useState(mesfinal);
  const { url } = apisPeticion();
  const [chartData, setChartData] = useState<any>({
    labels: [],
    datasets: [],
  });

  const sumarTotal = (numeros: any) => {
    return numeros.reduce(
      (acumulador: any, numeroActual: any) =>
        acumulador + Math.abs(parseFloat(numeroActual)),
      0
    );
  };

  const transformarDatosPositivos = (numeros: any) => {
    return numeros.map((numero: any) => Math.abs(Number(numero)));
  };

  const fetchData = async () => {
    try {
      const res = await axios.post(
        `${url}/account`,
        { start_date: startDate, end_date: endDate },
        getConfig()
      );

      let mese = res.data.data[0];

      const chartData = {
        labels: mese.dateLiteralRanges,
        datasets: [
          {
            label: "Ingresos",
            backgroundColor: "rgb(59,130,246)",
            borderColor: "rgb(59,130,246)",
            data: mese.incomeRanges,
          },
          {
            label: "Gastos",
            backgroundColor: "rgb(255,61,90)",
            borderColor: "rgb(255,61,50)",
            data: mese.expenseRanges,
          },
          {
            label: "Ganancias",
            backgroundColor: "rgb(34,197,94)",
            borderColor: "rgb(34,197,40)",
            data: transformarDatosPositivos(mese.resultRanges),
          },
        ],
      };
      setChartData(chartData);
      
      setposData( (data:any) => ({...data, ingreso : [sumarTotal(mese.incomeRanges)],gastos : [sumarTotal(mese.expenseRanges)],ganacias : [sumarTotal(mese.resultRanges)]}))
    } catch (err) {
      console.log(err);
    }
  };

  const handleFecha = async (event: any) => {
    event.preventDefault();
    fetchData();
  };

  useEffect(() => {
    setConfirPost(true);
  }, []);

  useEffect(() => {
    if (ConfirPost) {
      fetchData();
    }
  }, [ConfirPost]);

  return (
    <div className="main_principal_ main-page">
      <form onSubmit={handleFecha} className="box_content_stadisticas">
        <div className="box_content_sueldos">
          <h2>Fecha Inicio</h2>
          <input
            value={startDate}
            type="date"
            name="start_date"
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="box_content_sueldos">
          <h2>Fecha Final</h2>
          <input
            value={endDate}
            type="date"
            name="end_date"
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div>
          <button className="button-default">Buscar</button>
        </div>
      </form>

      <div className="box_information_stadisticas_">
        <div className="info_ganancias_stadisticas">
          <div className="conten_card_info_stadisticas ">
            <h3>{posData?.ganacias} </h3>
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
            <h3> {posData?.ingreso}</h3>
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
            <h3>{posData?.gastos}</h3>
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

      <Chart type="bar" data={chartData} />
      <div className="pdf-download-link">
        <PDFDownloadLink
          document={<PdfContabilidad chartData={chartData} dateStart={startDate} dateEnd={endDate} />}
          fileName="chart_data.pdf"
        >
          {({ loading }) => loading ? 'Cargando documento...' : 'Descargar PDF'}
        </PDFDownloadLink>
      </div>
    </div>
  );
}
