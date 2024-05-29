"use client"
import apisPeticion from "@/api/apisPeticion"
import axios from "axios"
import { Chart } from "primereact/chart"
import React, { useEffect, useState } from "react"
import getConfig from "../../../utils/getConfig"
import {
  getMonthsBetweenDates,
  getUsersCreatedByMonth,
} from "../../../utils/getDates"

const Estadisticas = () => {
  const [chartData, setChartData] = useState({})
  const [dateStart, setDateStart] = useState<string>("")
  const [dateEnd, setDateEnd] = useState<string>("")
  const [months, setmonths] = useState([])
  const [dataTransform, setdataTransform] = useState()
  const { url } = apisPeticion();


  const handleSearchClick =  () => {
    setmonths(getMonthsBetweenDates(dateStart, dateEnd))

    const data = {
      labels: months,
      datasets: [
        {
          label: "Clientes",
          backgroundColor: "rgba(22, 239, 236, 0.6)",
          data: [65, 59, 80],
        },
      ],
    }

    setChartData(data)

    axios
      .get(`${url}/client`, getConfig())
      .then((res) =>setdataTransform(res?.data?.data))

      const finalData = getUsersCreatedByMonth(dataTransform)

      console.log("dataTransform",dataTransform)

      console.log("finalData",finalData)
    

  }

  

  return (
    <div className="Estadisticas">
      <div className="estadisticas-container">
        <div className="dates-container">
          <h1>Fecha de inicio</h1>
          <input
            onChange={(e: any) => setDateStart(e?.target?.value)}
            type="date"
          />
          <h1>Fecha fin</h1>
          <input
            onChange={(e: any) => setDateEnd(e?.target?.value)}
            type="date"
          />
          <button onClick={handleSearchClick}>Buscar</button>
        </div>
        <div className="card">
          <Chart type="bar" data={chartData} />
        </div>
      </div>
    </div>
  )
}

export default Estadisticas
