"use client"
import apisPeticion from "@/api/apisPeticion"
import axios from "axios"
import { Chart } from "primereact/chart"
import React, { useEffect, useState } from "react"
import getConfig from "../../../utils/getConfig"
import { getMonthsBetweenDates } from "../../../utils/getDates"

const Estadisticas = () => {
  const [chartData, setChartData] = useState({})
  const [dateStart, setDateStart] = useState<string>(new Date().toISOString())
  const [dateEnd, setDateEnd] = useState<string>(new Date().toISOString())
  const { url } = apisPeticion()

  const handleSearchClick = () => {
    axios.get(`${url}/client`, getConfig()).then((res) => {
      const dataMonthUsers = getMonthsBetweenDates(dateStart, dateEnd, res?.data?.data)

      console.log("dataMonthUsers",dataMonthUsers)

      const data = {
        labels: dataMonthUsers?.months,
        datasets: [
          {
            label: "Clientes",
            backgroundColor: "rgba(22, 239, 236, 0.6)",
            data: dataMonthUsers?.userCounts,
          },
        ],
      }

      setChartData(data)
    })
  }

  useEffect(() => {
    handleSearchClick();
  }, [])
  

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
