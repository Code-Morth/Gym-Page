"use client"
import { Chart } from "primereact/chart"
import React, { useEffect, useState } from "react"

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
  const [chartData, setChartData] = useState({})

  useEffect(() => {
    const numDataPoints = 14 // Número de puntos de datos
    const backgroundColors = generateColorPalette(numDataPoints)
    const borderColors = backgroundColors.map((color) =>
      color.replace("0.2", "1")
    )

    const data = {
      labels: [
        "Q1",
        "Q2",
        "Q3",
        "Q4",
        "Q5",
        "Q6",
        "Q7",
        "Q8",
        "Q9",
        "Q10",
        "Q11",
        "Q12",
        "Q13",
        "Q14",
      ],
      datasets: [
        {
          label: "Clientes",
          data: [
            540, 325, 702, 620, 200, 160, 900, 540, 325, 702, 620, 200, 160,
            900,
          ],
          backgroundColor: backgroundColors,
          borderColor: borderColors,
          borderWidth: 1,
        },
      ],
    }

    setChartData(data)
  }, [])

  return (
    <div className="Estadisticas">
      <div className="estadisticas-container">
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
