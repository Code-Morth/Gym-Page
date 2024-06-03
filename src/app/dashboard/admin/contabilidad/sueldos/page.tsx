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
  const [totalIngresos, setTotalIngresos] = useState(0);
  const [totalGastos, setTotalGastos] = useState(0);
  const [totalGanancias, setTotalGanancias] = useState(0);

  let mesfinal = dayjs().format(" YYYY-MM-DD ").split(" ")[1]
  const [startDate, setStartDate] = useState("2024-04-01");
  const [endDate, setEndDate] = useState(mesfinal);
  const { url } = apisPeticion();
  const [chartData, setChartData] = useState<any>({
    labels: [],
    datasets: [],
  });



  const sumarTotal = (numeros:any) => {
    return numeros.reduce((acumulador:any, numeroActual:any) => acumulador + parseFloat(numeroActual), 0);
  }



  
  useEffect(() => {
    axios.post(`${url}/account`, { start_date: startDate, end_date: endDate }, getConfig()).then(res => {
      const mese = res.data.data;
      const data = {
        labels: mese[0]?.dateLiteralRanges,
        datasets: [
          {
            label: "Ingresos",
            backgroundColor: "rgb(59,130,246)",
            borderColor: "rgb(59,130,246)",
            data: mese[0]?.incomeRanges,
          },
          {
            label: "Gastos",
            backgroundColor: "rgb(255,61,90)",
            borderColor: "rgb(255,61,50)",
            data: mese[0]?.expenseRanges,
          },
          {
            label: "Ganancias",
            backgroundColor: "rgb(34,197,94)",
            borderColor: "rgb(34,197,40)",
            data: mese[0]?.resultRanges,
          },
        ],
      };
      setChartData(data);
      setTotalIngresos(sumarTotal(mese[0]?.incomeRanges));
      setTotalGastos(sumarTotal(mese[0]?.expenseRanges));
      setTotalGanancias(sumarTotal(mese[0]?.resultRanges));
    }).catch(err => console.log(err));
  }, [startDate, endDate]);

  const handleFecha = (event:any) => {
    event.preventDefault();
    const dataForm = Object.fromEntries(new FormData(event.target));
    axios.post(`${url}/account`, dataForm, getConfig()).then(res => {
      const mese = res.data.data;
      const data = {
        labels: mese[0]?.dateLiteralRanges,
        datasets: [
          {
            label: "Ingresos",
            backgroundColor: "rgb(59,130,246)",
            borderColor: "rgb(59,130,246)",
            data: mese[0]?.incomeRanges,
          },
          {
            label: "Gastos",
            backgroundColor: "rgb(255,61,90)",
            borderColor: "rgb(255,61,50)",
            data: mese[0]?.expenseRanges,
          },
          {
            label: "Ganancias",
            backgroundColor: "rgb(34,197,94)",
            borderColor: "rgb(34,197,40)",
            data: mese[0]?.resultRanges,
          },
        ],
      };
      setChartData(data);
     
    
    }).catch(err => console.log(err));
  };


 

  return (
    <div className="main_principal_ main-page">
      <form onSubmit={handleFecha} className="box_content_stadisticas">
        <div className="box_content_sueldos">
          <h2>Fecha Inicio</h2>
          <input value={startDate} type="date" name="start_date" onChange={(e) => setStartDate(e.target.value)} />
        </div>
        <div className="box_content_sueldos">
          <h2>Fecha Final</h2>
          <input value={endDate} type="date" name="end_date" onChange={(e) => setEndDate(e.target.value)} />
        </div>
        <div>
          <button className="button-default">Buscar</button>
        </div>
      </form>

      <div className="box_information_stadisticas_">
        <div className="info_ganancias_stadisticas">
          <div className="conten_card_info_stadisticas ">
            <h3>{totalGanancias.toFixed()} </h3>
            <h2>Ganancia</h2>
          </div>
          <div className="conten-img-stadisticas">
            <Image src={"/ganancia.png"} alt="logo" width={1000} height={1000} className="all" />
          </div>
        </div>
        <div className="info_ganancias_stadisticas">
          <div className="conten_card_info_stadisticas ">
            <h3> {totalIngresos.toFixed()}</h3>
            <h2>Ingresos</h2>
          </div>
          <div className="conten-img-stadisticas">
            <Image src={"/ingresos.png"} alt="logo" width={1000} height={1000} className="all" />
          </div>
        </div>
        <div className="info_ganancias_stadisticas">
          <div className="conten_card_info_stadisticas ">
            <h3>{totalGastos.toFixed()}</h3>
            <h2>Gastos</h2>
          </div>
          <div className="conten-img-stadisticas">
            <Image src={"/gastos.png"} alt="logo" width={1000} height={1000} className="all" />
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
