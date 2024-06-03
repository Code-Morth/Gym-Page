"use client"
import apisPeticion from "@/api/apisPeticion"
import axios from "axios"
import { Chart } from "primereact/chart"
import React, { useEffect, useState } from "react"
import getConfig from "../../../utils/getConfig"
import dayjs from "dayjs"

// Función para generar colores aleatorios
const generateRandomColor = (opacity: any) => {
  const r = Math.floor(Math.random() * 255)
  const g = Math.floor(Math.random() * 255)
  const b = Math.floor(Math.random() * 255)
  return `rgba(${r}, ${g}, ${b}, ${opacity})`
}

// Función para generar una paleta de colores
const generateColorPalette = (numColors: any) => {
  const colors = []
  for (let i = 0; i < numColors; i++) {
    colors.push(generateRandomColor(0.3))
  }
  return colors
}

const Estadisticas = () => {
  const actualDate = dayjs().format("DD-MM-YYYY")
  const datePlusOneMonth = dayjs().add(1, "month").format("DD-MM-YYYY")
  const [chartData, setChartData] = useState({})
  const [dateStart, setdateStart] = useState<any>(actualDate)
  const [dateEnd, setdateEnd] = useState<any>(datePlusOneMonth)
  const { url } = apisPeticion()

  useEffect(() => {
    const dateStartFormat = dayjs(dateStart).format("DD-MM-YYYY")
    const dateEndFormat = dayjs(dateEnd).format("DD-MM-YYYY")

    axios
      .get(
        `${url}/order?page=0&size=999999999999999&order_date_ini=${dateStartFormat}&order_date_end=${dateEndFormat}`,
        getConfig()
      )
      .then((res) => {
        const newData1 = res.data.data.map((e: any) => ({
          date: e.order_date,
          detail: e.detail,
        }))

        const meses: any = {
          "01": "Enero",
          "02": "Febrero",
          "03": "Marzo",
          "04": "Abril",
          "05": "Mayo",
          "06": "Junio",
          "07": "Julio",
          "08": "Agosto",
          "09": "Septiembre",
          "10": "Octubre",
          "11": "Noviembre",
          "12": "Diciembre",
        }

        const groupedData = newData1.reduce((acc: any, current: any) => {
          const dateParts = current.date.split("-") // Dividir la fecha en partes (año, mes, día)
          const month = dateParts[0] + "-" + dateParts[1] // Obtener el año y el mes
          if (!acc[month]) {
            acc[month] = {
              date: meses[dateParts[1]] + " " + dateParts[0],
              detail: [],
            }
          }
          acc[month].detail = acc[month].detail.concat(current.detail)
          return acc
        }, {})

        const result = Object.values(groupedData)

        const labelsArray = result.map((e: any) => e.date)

        const sum = (x: any, y: any) => {
          return x + y
        }

        const subtotales = result.map((item: any) => {
          // Usar reduce para sumar los subtotales de cada detalle
          const subtotal = item.detail.reduce(
            (accumulator: any, detail: any) => {
              // Convertir el order_subtotal a número y sumarlo al acumulador
              return accumulator + parseFloat(detail.order_subtotal)
            },
            0
          ) // El valor inicial del acumulador es 0

          return parseFloat(subtotal.toFixed(2))
        })

        const numDataPoints = labelsArray.length // Número de puntos de datos
        const backgroundColors = generateColorPalette(numDataPoints)
        const borderColors = backgroundColors.map((color) =>
          color.replace("0.2", "1")
        )

        const data = {
          labels: labelsArray,
          datasets: [
            {
              label: "Ventas",
              data: subtotales,
              backgroundColor: backgroundColors,
              borderColor: borderColors,
              borderWidth: 1,
            },
          ],
        }

        setChartData(data)
      })
      .catch((err) => console.log(err))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateStart, dateEnd])

  return (
    <div className="Estadisticas main-page">
      <div className="estadisticas-container">
        <h1 className="tittle">Lista de Ventas</h1>
        <div className="dates-container">
          <h1>Fecha de inicio </h1>
          <input
            onChange={(e: any) => setdateStart(e.target.value)}
            type="date"
          />
          <h1>Fecha fin</h1>
          <input
            onChange={(e: any) => setdateEnd(e.target.value)}
            type="date"
          />
        </div>
        <div className="card">
          <Chart
            type="bar"
            data={chartData}
            options={{
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default Estadisticas
